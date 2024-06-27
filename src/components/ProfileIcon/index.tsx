import Image from 'next/image';

import { User } from '@/types/User.interface';

interface ProfileIconProps {
  user: User;
  imgClassName: string;
  fontClassName: string;
}

export default function ProfileIcon({ user, imgClassName, fontClassName }: ProfileIconProps) {
  return (
    // TODO: 컬러 지정. 현재는 임의로 회색을 지정함
    <div className={`align-center relative rounded-full border-2 border-solid border-white bg-gray-9f ${imgClassName}`}>
      {user.profileImageUrl ? (
        <Image src={user.profileImageUrl} alt='프로필' fill style={{ objectFit: 'cover' }} className='rounded-full' />
      ) : (
        <p className={`font-montserrat font-semibold text-white ${fontClassName}`}>{user.nickname.substring(0, 1)}</p>
      )}
    </div>
  );
}
