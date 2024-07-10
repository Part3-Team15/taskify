import Image from 'next/image';

import { User } from '@/types/User.interface';
import getProfileColorStyle from '@/utils/getProfileColorStyle';

interface ProfileIconProps {
  user: User;
  userId: number;
  imgClassName: string;
  fontClassName: string;
}

// NOTE: 사용자 프로필 아이콘 컴포넌트
export default function ProfileIcon({ user, userId, imgClassName, fontClassName }: ProfileIconProps) {
  const colorStyle = getProfileColorStyle(userId);

  return (
    <div
      className={`align-center relative rounded-full border-2 border-solid border-white dark:border-dark-200 ${imgClassName}`}
      style={colorStyle}
    >
      {/* 프로필 이미지가 있으면 이미지를, 없으면 닉네임 첫글자를 보여줌 */}
      {user.profileImageUrl ? (
        <Image src={user.profileImageUrl} alt='프로필' fill style={{ objectFit: 'cover' }} className='rounded-full' />
      ) : (
        <p className={`font-nanumgothic font-semibold text-white ${fontClassName}`}>{user.nickname.substring(0, 1)}</p>
      )}
    </div>
  );
}
