import { ChangeEvent, useState } from 'react';

import ActionButton from '@/components/Button/ActionButton';
import PwdInput from '@/components/Input/PwdInput';

interface PasswordChangeForm {
  password: string;
  newPassword: string;
  newPasswordCheck: string;
}

export default function PwdChangeForm() {
  const [inputData, setInputData] = useState<PasswordChangeForm>({
    password: '',
    newPassword: '',
    newPasswordCheck: '',
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setInputData((prevData) => ({
      ...prevData,
      [id]: value,
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
            onChange={handleInputChange}
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
            onChange={handleInputChange}
          />
        </div>

        <div className='relative flex flex-col gap-2.5'>
          <label htmlFor='NewPasswordCheck' className='label'>
            새 비밀번호 확인
          </label>
          <PwdInput
            id='NewPasswordCheck'
            placeholder='새 비밀번호 입력'
            value={inputData.newPasswordCheck}
            onChange={handleInputChange}
          />
        </div>
      </div>
      <ActionButton type='submit' className='ml-auto mt-4 md:mt-6'>
        변경
      </ActionButton>
    </form>
  );
}
