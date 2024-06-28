import { AxiosError } from 'axios';
import { useRouter } from 'next/router';
import { ChangeEvent, FormEventHandler, useState } from 'react';
import { useSelector } from 'react-redux';

import ActionButton from '@/components/Button/ActionButton';
import ImageInput from '@/components/Input/ImageInput';
import { useUpdateProfile } from '@/hooks/useUpdateProfile';
import { postImage } from '@/services/postService';
import { RootState } from '@/store/store';

export default function EditProfileForm() {
  const router = useRouter();
  const { mutate, isPending, isError, error } = useUpdateProfile();

  const { user } = useSelector((state: RootState) => state.user);
  const [nickname, setNickname] = useState(user?.nickname ?? '');
  const [profileImageFile, setProfileImageFile] = useState<File | null>(null);
  const [isNicknameValid, setIsNicknameValid] = useState({
    gtZero: true,
    lteTen: true,
  });

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
    if (newNickname.length === 0) {
      setIsNicknameValid({ gtZero: false, lteTen: true });
    } else if (newNickname.length >= 10) {
      setIsNicknameValid({ gtZero: true, lteTen: false });
    } else {
      setIsNicknameValid({ gtZero: true, lteTen: true });
    }
  };

  const handleImageChange = (image: File) => {
    setProfileImageFile(image);
  };

  const handleImageDelete = () => {
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
        mutate(formData);
      }
    };

    e.preventDefault();
    postData();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className='flex flex-col gap-6 md:flex-row md:gap-4'>
        <div className='size-[100px] md:size-[180px]'>
          <ImageInput
            name='user-profile'
            value={user?.profileImageUrl || null}
            onChange={handleImageChange}
            onDeleteClick={handleImageDelete}
          />
        </div>

        <div className='flex flex-col gap-4 md:grow md:gap-5'>
          <div className='flex flex-col gap-2.5'>
            <label className='label'>이메일</label>
            <p className='input text-gray-9f'>{user?.email}</p>
          </div>

          <div className='relative flex flex-col gap-2.5'>
            <label htmlFor='nickname' className='label'>
              닉네임
            </label>
            <input
              className={`input ${!(isNicknameValid.gtZero && isNicknameValid.lteTen) ? 'border-2 border-red hover:border-red' : ''}`}
              id='nickname'
              value={nickname}
              placeholder='닉네임을 입력해주세요'
              type='text'
              onChange={handleNicknameChange}
            />
            {!isNicknameValid.gtZero && (
              <p className='absolute top-20 text-sm text-red md:top-[88px]'>닉네임을 입력해주세요</p>
            )}
            {!isNicknameValid.lteTen && (
              <p className='absolute top-20 text-sm text-red md:top-[88px]'>닉네임을 10자 이내로 입력해주세요</p>
            )}
          </div>
        </div>
      </div>
      <ActionButton
        type='submit'
        disabled={isPending || !(isNicknameValid.gtZero && isNicknameValid.lteTen)}
        className='ml-auto mt-4 md:mt-6'
      >
        {isPending ? '저장중..' : '저장'}
      </ActionButton>
    </form>
  );
}
