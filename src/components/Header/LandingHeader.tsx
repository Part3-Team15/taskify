import Image from 'next/image';
import Link from 'next/link';

export default function LandingHeader() {
  return (
    <header className='flex h-[70px] w-full items-center justify-between bg-black px-[24px]'>
      <Link href='/'>
        <Image src='/icons/logo-white.svg' alt='로고' width={121} height={39} />
      </Link>
      <div className='flex gap-5 text-sm text-white md:gap-9 md:text-base'>
        <Link href='/signin'>로그인</Link>
        <Link href='/signup'>회원가입</Link>
      </div>
    </header>
  );
}
