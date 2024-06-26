import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

import ActionButton from '@/components/Button/ActionButton';
import ImageInput from '@/components/Input/ImageInput';
import { RootState } from '@/store/store';

export default function EditProfileForm() {
  const { user } = useSelector((state: RootState) => state.user);
  const router = useRouter();

  if (!user) {
    router.replace('/signin');
  }

  return (
    <form>
      <div className='flex flex-col gap-6 md:flex-row md:gap-4'>
        <div className='size-[100px] md:size-[180px]'>{/* <ImageInput /> */}</div>
        <div className='flex flex-col gap-4 md:grow md:gap-5'>
          <div className='flex flex-col gap-2.5'>
            <label className='label'>이메일</label>
            <input className='input' disabled />
          </div>
          <div className='flex flex-col gap-2.5'>
            <label className='label'>닉네임</label>
            <input className='input' />
          </div>
        </div>
      </div>
      <ActionButton className='ml-auto mt-4 md:mt-6'>저장</ActionButton>
    </form>
  );
}
