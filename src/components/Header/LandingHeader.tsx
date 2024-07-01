import Image from 'next/image';
import Link from 'next/link';

export default function LandingHeader() {
  return (
    <header className='flex h-[60px] w-full items-center justify-between bg-dark-500 px-[24px] md:h-[70px]'>
      <Link href='/'>
        <Image className='md:hidden' src='/icons/logo-white-s.svg' alt='로고' width={24} height={27} priority />
        <Image className='hidden md:block' src='/icons/logo-white.svg' alt='로고' width={121} height={39} priority />
      </Link>
      <div className='flex gap-5 text-sm text-white md:gap-9 md:text-base'>
        <Link href='/signin'>로그인</Link>
        <Link href='/signup'>회원가입</Link>
      </div>
    </header>
  );
}
