import { useRouter } from 'next/router';
import { ChangeEvent, useState } from 'react';
import { useSelector } from 'react-redux';

import ActionButton from '@/components/Button/ActionButton';
import ImageInput from '@/components/Input/ImageInput';
import { RootState } from '@/store/store';

export default function EditProfileForm() {
  const { user } = useSelector((state: RootState) => state.user);

  const [formData, setFormData] = useState<UpdateProfileForm>({
    nickname: user?.nickname ?? '',
    profileImageUrl: user?.profileImageUrl ?? null,
  });
  const [profileImageFile, setProfileImageFile] = useState<File>();

  const router = useRouter();

  if (!user) {
    router.replace('/signin');
  }

  const handleNicknameChange = (e: ChangeEvent<HTMLInputElement>) => {
    const nickname = e.target.value;
    setFormData((prevData) => ({
      ...prevData,
      nickname,
    }));
  };

  const handleImageChange = (image: File) => {
    setProfileImageFile(image);
  };

  return (
    <form>
      <div className='flex flex-col gap-6 md:flex-row md:gap-4'>
        <div className='size-[100px] md:size-[180px]'>
          <ImageInput name='user-profile' value={formData.profileImageUrl} onChange={handleImageChange} />
        </div>

        <div className='flex flex-col gap-4 md:grow md:gap-5'>
          <div className='flex flex-col gap-2.5'>
            <label className='label'>이메일</label>
            <p className='input text-gray-9f'>{user?.email}</p>
          </div>

          <div className='flex flex-col gap-2.5'>
            <label htmlFor='nickname' className='label'>
              닉네임
            </label>
            <input
              className='input'
              id='nickname'
              value={formData.nickname}
              placeholder='닉네임을 입력해주세요'
              type='text'
              onChange={handleNicknameChange}
            />
          </div>
        </div>
      </div>
      <ActionButton className='ml-auto mt-4 md:mt-6'>저장</ActionButton>
    </form>
  );
}
