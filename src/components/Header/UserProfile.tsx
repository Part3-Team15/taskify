import ProfileIcon from '../ProfileIcon';

import { User } from '@/types/User.interface';

// NOTE: 유저 프로필 아이콘과 닉네임을 표시하는 컴포넌트
export default function UserProfile({ user }: { user: User }) {
  return (
    <div className='flex items-center gap-3'>
      <ProfileIcon
        user={user}
        userId={user.id}
        imgClassName='size-[34px] md:size-[38px]'
        fontClassName='md:text-base text-sm'
      />
      <p className='hidden text-base font-medium md:block'>{user.nickname}</p>
    </div>
  );
}
