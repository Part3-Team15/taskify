import Image from 'next/image';
import Link from 'next/link';

import LOGO_SIGN from '../../../public/images/logo_sign.svg';

export default function TopLogoSection({ text }: { text: string }) {
  return (
    <div className='flex items-center justify-center'>
      <Link href='/'>
        <div className='flex flex-col items-center justify-center'>
          <Image src={LOGO_SIGN} alt='로고 이미지' />
          <p className='text-[20px] text-black_33'>{text}</p>
        </div>
      </Link>
    </div>
  );
}
