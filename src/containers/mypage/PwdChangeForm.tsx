import { AxiosError } from 'axios';
import { ChangeEvent, FormEventHandler, useState } from 'react';

import ActionButton from '@/components/Button/ActionButton';
import PwdInput from '@/components/Input/PwdInput';
import { putPassword } from '@/services/putService';

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

const checkValid = (inputData: PasswordChangeForm, inputError: InputError) =>
  inputData.password &&
  inputData.newPassword &&
  inputData.newPasswordCheck &&
  !(inputError.password || inputError.newPassword || inputError.newPasswordCheck);

export default function PwdChangeForm() {
  const [inputData, setInputData] = useState<PasswordChangeForm>(INITIAL_INPUT_DATA);
  const [inputError, setInputError] = useState<InputError>({});

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
    setInputError((prevError) => ({
      ...prevError,
      [id]: value.length < 8 ? '8자 이상 입력해주세요.' : '',
    }));

    if (id === 'newPassword' || id === 'newPasswordCheck') {
      // NOTE: 새 비밀번호끼리 일치여부 확인합니다.
      const missMatched =
        (id === 'newPassword' && inputData.newPasswordCheck && value !== inputData.newPasswordCheck) ||
        (id === 'newPasswordCheck' && value !== inputData.newPassword);
      setInputError((prevError) => ({
        ...prevError,
        newPasswordCheck: missMatched ? '비밀번호가 일치하지 않습니다.' : '',
      }));
    }

    if (id === 'newPassword' || id === 'password') {
      // NOTE: 새 비밀번호가 현재 비밀번호와 같은지 확인합니다.
      const matched =
        (id === 'password' && inputData.newPassword && value === inputData.newPassword) ||
        (id === 'newPassword' && inputData.password && value === inputData.password);
      setInputError((prevError) => ({
        ...prevError,
        newPassword: matched ? '새 비밀번호가 기존 비밀번호와 같습니다.' : '',
      }));
    }
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    const putData = async () => {
      const { password, newPassword } = inputData;
      try {
        await putPassword({ password, newPassword });
        // NOTE: 전체 페이지 리로드보다 시간이 훨씬 적게 걸려서 값만 비우도록 했습니다.
        setInputData(INITIAL_INPUT_DATA);
        alert('비밀번호가 변경되었습니다.');
      } catch (error) {
        if (error instanceof AxiosError) {
          alert(error.response?.data.message);
        } else if (error instanceof Error) {
          alert(error.message);
        } else {
          alert('알 수 없는 오류가 발생했습니다!');
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
            error={inputError.password}
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
            error={inputError.newPassword}
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
            error={inputError.newPasswordCheck}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
          />
        </div>
      </div>
      <ActionButton type='submit' className='ml-auto mt-4 md:mt-6' disabled={!checkValid(inputData, inputError)}>
        변경
      </ActionButton>
    </form>
  );
}
