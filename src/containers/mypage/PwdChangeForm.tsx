import { ChangeEvent, useState } from 'react';

import ActionButton from '@/components/Button/ActionButton';
import PwdInput from '@/components/Input/PwdInput';

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

const checkPasswordMatch = (id: string, value: string, inputData: PasswordChangeForm) =>
  (id === 'newPassword' && inputData.newPasswordCheck && value !== inputData.newPasswordCheck) ||
  (id === 'newPasswordCheck' && value !== inputData.newPassword);

export default function PwdChangeForm() {
  const [inputData, setInputData] = useState<PasswordChangeForm>({
    password: '',
    newPassword: '',
    newPasswordCheck: '',
  });
  const [inputError, setInputError] = useState<InputError>({});

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setInputData((prevData) => ({
      ...prevData,
      [id]: value,
    }));

    if (id === 'newPassword' || id === 'newPasswordCheck') {
      // NOTE: 비밀번호 일치여부는 즉각적으로 알려주는 게 좋을 것 같아 값이 변할때마다 체크합니다.
      const missMatched = checkPasswordMatch(id, value, inputData);
      setInputError((prevError) => ({
        ...prevError,
        newPasswordCheck: missMatched ? '비밀번호가 일치하지 않습니다.' : '',
      }));
    }
  };

  const handleInputBlur = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    // NOTE: 글자수 제한은 포커스 벗어날 때 체크합니다.
    setInputError((prevError) => ({
      ...prevError,
      [id]: value.length < 8 ? '8자 이상 입력해주세요.' : '',
    }));
  };

  return (
    <form>
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
      <ActionButton
        type='submit'
        className='ml-auto mt-4 md:mt-6'
        disabled={!!(inputError.password || inputError.newPassword || inputError.newPasswordCheck)}
      >
        변경
      </ActionButton>
    </form>
  );
}
