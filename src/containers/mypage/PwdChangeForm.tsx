import { AxiosError } from 'axios';
import { ChangeEvent, FormEventHandler, useState } from 'react';

import ActionButton from '@/components/Button/ActionButton';
import PwdInput from '@/components/Input/PwdInput';
import useModal from '@/hooks/useModal';
import { putPassword } from '@/services/putService';
import hashPassword from '@/utils/hashPassword';

interface PasswordChangeForm {
  password: string;
  newPassword: string;
  newPasswordCheck: string;
}

interface InputError {
  password?: string;
  newPassword?: string;
  newPasswordCheck?: string;
}

const INITIAL_INPUT_DATA = {
  password: '',
  newPassword: '',
  newPasswordCheck: '',
};

const checkValid = (inputData: PasswordChangeForm, lt8Error: InputError, sameError: InputError) =>
  inputData.password &&
  inputData.newPassword &&
  inputData.newPasswordCheck &&
  !(lt8Error.password || lt8Error.newPassword) &&
  !(sameError.newPassword || sameError.newPasswordCheck);

export default function PwdChangeForm() {
  const [inputData, setInputData] = useState<PasswordChangeForm>(INITIAL_INPUT_DATA);
  const [lt8Error, setLt8Error] = useState<InputError>({});
  const [sameError, setSameError] = useState<InputError>({});
  const { openNotificationModal } = useModal();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setInputData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleInputBlur = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    // NOTE: 비밀번호 8자 이상인지 확인합니다.
    setLt8Error((prevError) => ({
      ...prevError,
      [id]: value.length < 8 ? '8자 이상 입력해주세요.' : '',
    }));

    if (id === 'newPassword' || id === 'newPasswordCheck') {
      // NOTE: 새 비밀번호끼리 일치여부 확인합니다.
      const missMatched =
        (id === 'newPassword' && inputData.newPasswordCheck && value !== inputData.newPasswordCheck) ||
        (id === 'newPasswordCheck' && value !== inputData.newPassword);
      setSameError((prevError) => ({
        ...prevError,
        newPasswordCheck: missMatched ? '비밀번호가 일치하지 않습니다.' : '',
      }));
    }

    if (id === 'newPassword' || id === 'password') {
      // NOTE: 새 비밀번호가 현재 비밀번호와 같은지 확인합니다.
      const matched =
        (id === 'password' && inputData.newPassword && value === inputData.newPassword) ||
        (id === 'newPassword' && inputData.password && value === inputData.password);
      setSameError((prevError) => ({
        ...prevError,
        newPassword: matched ? '새 비밀번호가 기존 비밀번호와 같습니다.' : '',
      }));
    }
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    const putData = async () => {
      const { password, newPassword } = inputData;
      try {
        await putPassword({ password: hashPassword(password), newPassword: hashPassword(newPassword) });
        // NOTE: 전체 페이지 리로드보다 시간이 훨씬 적게 걸려서 값만 비우도록 했습니다.
        setInputData(INITIAL_INPUT_DATA);
        openNotificationModal({ text: '비밀번호가 변경되었습니다.' });
      } catch (error) {
        const message = '알 수 없는 오류가 발생했습니다!';
        if (error instanceof AxiosError) {
          openNotificationModal({ text: error.response?.data.message || message });
        } else {
          openNotificationModal({ text: message });
          console.log(error);
        }
      }
    };

    e.preventDefault();
    putData();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className='flex flex-col gap-4 md:grow md:gap-5'>
        <div className='relative flex flex-col gap-2.5'>
          <label htmlFor='password' className='label'>
            현재 비밀번호
          </label>
          <PwdInput
            id='password'
            placeholder='현재 비밀번호 입력'
            value={inputData.password}
            error={lt8Error.password}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
          />
        </div>

        <div className='relative flex flex-col gap-2.5'>
          <label htmlFor='newPassword' className='label'>
            새 비밀번호
          </label>
          <PwdInput
            id='newPassword'
            placeholder='새 비밀번호 입력'
            value={inputData.newPassword}
            error={lt8Error.newPassword || sameError.newPassword}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
          />
        </div>

        <div className='relative flex flex-col gap-2.5'>
          <label htmlFor='NewPasswordCheck' className='label'>
            새 비밀번호 확인
          </label>
          <PwdInput
            id='newPasswordCheck'
            placeholder='새 비밀번호 입력'
            value={inputData.newPasswordCheck}
            error={sameError.newPasswordCheck}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
          />
        </div>
      </div>
      <ActionButton
        type='submit'
        className='ml-auto mt-4 md:mt-6'
        disabled={!checkValid(inputData, lt8Error, sameError)}
      >
        변경
      </ActionButton>
    </form>
  );
}
