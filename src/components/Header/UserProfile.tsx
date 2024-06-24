import Image from 'next/image';
import { useSelector } from 'react-redux';

import { RootState } from '@/store/store';

export default function UserProfile() {
  const { user, error } = useSelector((state: RootState) => state.user);

  if (error) {
    return <p>{error}</p>;
  }

  if (!user) {
    /* NOTE: 유저 정보가 있는 페이지에서만 사용할 것이므로 이 코드는 접근 불가능해야 옳다.
     * 만약 유저 정보가 없다면 페이지에서 리다이렉트할 것이므로 여기서 따로 리다이렉트 하지 않았다.
     */
    return <p>유저 정보가 없습니다</p>;
  }

  return (
    <div className='flex items-center gap-3'>
      {/* TODO: 컬러 지정. 현재는 임의로 회색을 지정함 */}
      <div className='relative flex size-[34px] items-center justify-center rounded-full border-2 border-solid border-white bg-gray_9f md:size-[38px]'>
        {user.profileImageUrl ? (
          <Image src={user.profileImageUrl} alt='내 프로필' fill />
        ) : (
          <p className='md:font-base font-sm font-semibold text-white'>{user.nickname.substring(0, 1)}</p>
        )}
      </div>
      <p className='font-base hidden font-medium md:block'>{user.nickname}</p>
    </div>
  );
}
