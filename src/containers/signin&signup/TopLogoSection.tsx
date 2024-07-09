import Image from 'next/image';
import Link from 'next/link';

import LOGO_SIGN from '@/../public/images/logo_sign.svg';

export default function TopLogoSection({ text }: { text: string }) {
  return (
    <div className='mb-[30px] mt-[50px] flex items-center justify-center'>
      <Link href='/'>
        <div className='flex flex-col items-center justify-center'>
          <div className='relative h-[195px] w-[140px] md:h-[279px] md:w-[200px]'>
            <Image src={LOGO_SIGN} alt='로고 이미지' className='dark:hidden' fill priority />
            <Image src={'/images/logo_sign-white.svg'} alt='로고 이미지' className='hidden dark:block' fill priority />
          </div>
          <p className='text-[20px] text-black-33 dark:text-dark-10'>{text}</p>
        </div>
      </Link>
    </div>
  );
}
