import Image from 'next/image';

import getProfileColorStyle from '@/utils/getProfileColorStyle';

export default function MemberProfile({
  userId,
  nickname,
  profileImageUrl,
}: {
  userId: number;
  nickname: string;
  profileImageUrl: string | null;
}) {
  return (
    <div className='flex items-center'>
      <div
        className='align-center relative mr-[10px] flex size-[26px] items-center justify-center rounded-full border-solid border-white'
        style={profileImageUrl ? {} : getProfileColorStyle(userId)}
      >
        {profileImageUrl ? (
          <Image src={profileImageUrl} alt='프로필' fill style={{ objectFit: 'cover' }} className='rounded-full' />
        ) : (
          <p className={`font-montserrat font-semibold leading-6 text-white`}>{nickname.substring(0, 1)}</p>
        )}
      </div>
      <p>{nickname}</p>
    </div>
  );
}
