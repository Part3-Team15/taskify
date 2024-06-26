import { useSelector } from 'react-redux';

import { ProfileIcon } from '../ProfileIcon';

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
      <ProfileIcon user={user} imgClassName='size-[34px] md:size-[38px]' fontClassName='md:font-base font-sm' />
      <p className='font-base hidden font-medium md:block'>{user.nickname}</p>
    </div>
  );
}
