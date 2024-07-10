import { AxiosError } from 'axios';
import { ChangeEvent, FormEventHandler, useState } from 'react';
import { useSelector } from 'react-redux';

import ActionButton from '@/components/Button/ActionButton';
import ImageInput from '@/components/Input/ImageInput';
import useModal from '@/hooks/useModal';
import { useUpdateProfile } from '@/hooks/useUpdateProfile';
import { postImage } from '@/services/postService';
import { RootState } from '@/store/store';
import { UpdateProfileForm } from '@/types/post/UpdateProfileForm.interface';

// NOTE: 프로필 변경 폼 컴포넌트 (프로필 이미지, 닉네임 변경 가능)
export default function EditProfileForm() {
  const { openNotificationModal } = useModal();
  const { mutate, isPending, isError, error } = useUpdateProfile();

  const { user } = useSelector((state: RootState) => state.user);
  const [nickname, setNickname] = useState(user?.nickname ?? '');
  const [profileImageFile, setProfileImageFile] = useState<File | null>(null);
  const [isImageChanged, setIsImageChanged] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  if (isError) {
    const message = '알 수 없는 오류가 발생했습니다!';
    if (error instanceof AxiosError) {
      openNotificationModal({ text: error.response?.data.message || message });
    } else {
      openNotificationModal({ text: message });
      console.log(error);
    }
  }

  const handleNicknameChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newNickname = e.target.value;
    setNickname(newNickname);
    if (newNickname.length === 0) {
      setErrorMessage('닉네임을 입력해주세요');
    } else if (newNickname.length >= 10) {
      setErrorMessage('닉네임을 10자 이내로 입력해주세요');
    } else {
      setErrorMessage('');
    }
  };

  const handleImageChange = (image: File) => {
    setIsImageChanged(true);
    setProfileImageFile(image);
  };

  const handleImageDelete = () => {
    setIsImageChanged(true);
    setProfileImageFile(null);
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    const formProfileData = async () => {
      const formData: UpdateProfileForm = {};

      if (nickname !== user?.nickname) {
        formData['nickname'] = nickname;
      }
      if (!profileImageFile && user?.profileImageUrl) {
        formData['profileImageUrl'] = null;
      }
      if (profileImageFile) {
        const { profileImageUrl } = await postImage({ image: profileImageFile });
        formData['profileImageUrl'] = profileImageUrl;
      }

      return formData;
    };

    const postData = async () => {
      const formData = await formProfileData();

      if (Object.keys(formData).length !== 0) {
        await mutate(formData);
        setIsImageChanged(false);
      }
    };

    e.preventDefault();
    postData();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className='flex flex-col gap-6 md:flex-row md:gap-4'>
        {/* 프로필 이미지 설정 */}
        <div className='size-[100px] md:size-[180px]'>
          <ImageInput
            name='user-profile'
            value={user?.profileImageUrl || null}
            onChange={handleImageChange}
            onDeleteClick={handleImageDelete}
          />
        </div>

        <div className='flex flex-col gap-4 md:grow md:gap-5'>
          {/* 이메일 */}
          <div className='flex flex-col gap-2.5'>
            <label className='label'>이메일</label>
            <p className='input text-gray-9f dark:bg-dark-300 dark:text-dark-10'>{user?.email}</p>
          </div>

          {/* 닉네임 변경 */}
          <div className='relative flex flex-col gap-2.5'>
            <label htmlFor='nickname' className='label'>
              닉네임
            </label>
            <input
              className={`input ${errorMessage ? 'border-2 border-red hover:border-red' : ''} dark:bg-dark-300`}
              id='nickname'
              value={nickname}
              placeholder='닉네임을 입력해주세요'
              type='text'
              onChange={handleNicknameChange}
            />
            {errorMessage && <p className='absolute top-20 text-sm text-red md:top-[88px]'>{errorMessage}</p>}
          </div>
        </div>
      </div>

      <ActionButton
        type='submit'
        disabled={isPending || !!errorMessage || (nickname === user?.nickname && !isImageChanged)}
        className='ml-auto mt-4 md:mt-6'
      >
        {isPending ? '저장중..' : '저장'}
      </ActionButton>
    </form>
  );
}
