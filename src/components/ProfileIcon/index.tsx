import Image from 'next/image';

import { User } from '@/types/User.interface';
import getProfileColorStyle from '@/utils/getProfileColorStyle';

interface ProfileIconProps {
  user: User;
  userId: number;
  imgClassName: string;
  fontClassName: string;
}

export default function ProfileIcon({ user, userId, imgClassName, fontClassName }: ProfileIconProps) {
  const colorStyle = getProfileColorStyle(userId);

  return (
    <div
      className={`align-center relative rounded-full border-2 border-solid border-white dark:border-dark-200 ${imgClassName}`}
      style={colorStyle}
    >
      {user.profileImageUrl ? (
        <Image src={user.profileImageUrl} alt='프로필' fill style={{ objectFit: 'cover' }} className='rounded-full' />
      ) : (
        <p className={`font-nanumgothic font-semibold text-white ${fontClassName}`}>{user.nickname.substring(0, 1)}</p>
      )}
    </div>
  );
}
