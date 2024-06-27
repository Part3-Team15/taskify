import { AxiosError } from 'axios';
import { useRouter } from 'next/router';
import { ChangeEvent, FormEventHandler, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ActionButton from '@/components/Button/ActionButton';
import ImageInput from '@/components/Input/ImageInput';
import { useUpdateProfile } from '@/hooks/useUpdateProfile';
import { postImage } from '@/services/postService';
import { putProfile } from '@/services/putService';
import { setUser } from '@/store/reducers/userSlice';
import { RootState } from '@/store/store';

export default function EditProfileForm() {
  const router = useRouter();
  const { mutate, isLoading, isError, error } = useUpdateProfile();

  const { user } = useSelector((state: RootState) => state.user);
  const [nickname, setNickname] = useState(user?.nickname ?? '');
  const [profileImageUrl, setProfileImageUrl] = useState(user?.profileImageUrl ?? null);
  const [profileImageFile, setProfileImageFile] = useState<File>();

  if (!user) {
    router.replace('/signin');
  }

  if (isError) {
    if (error instanceof AxiosError) {
      alert(error.response?.data.message);
    } else if (error instanceof Error) {
      alert(error.message);
    } else {
      alert('알 수 없는 오류가 발생했습니다!');
      console.log(error);
    }
  }

  const handleNicknameChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newNickname = e.target.value;
    setNickname(newNickname);
  };

  const handleImageChange = (image: File) => {
    setProfileImageFile(image);
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    const formProfileData = async () => {
      if (!profileImageFile) {
        return { nickname, profileImageUrl };
      }

      const { profileImageUrl: newProfileImageUrl } = await postImage({ image: profileImageFile });
      return {
        nickname,
        profileImageUrl: newProfileImageUrl,
      };
    };

    const postData = async () => {
      const formData = await formProfileData();
      mutate(formData);
    };

    e.preventDefault();
    postData();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className='flex flex-col gap-6 md:flex-row md:gap-4'>
        <div className='size-[100px] md:size-[180px]'>
          <ImageInput name='user-profile' value={profileImageUrl} onChange={handleImageChange} />
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
              value={nickname}
              placeholder='닉네임을 입력해주세요'
              type='text'
              onChange={handleNicknameChange}
            />
          </div>
        </div>
      </div>
      <ActionButton type='submit' disabled={isLoading} className='ml-auto mt-4 md:mt-6'>
        {isLoading ? '저장중..' : '저장'}
      </ActionButton>
    </form>
  );
}
