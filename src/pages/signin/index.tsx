import Head from 'next/head';
import Link from 'next/link';

import SignInForm from '@/containers/signin&signup/SignInForm';
import TopLogoSection from '@/containers/signin&signup/TopLogoSection';

export default function SignInPage() {
  return (
    <div className='flex max-h-dvh items-center justify-center py-[120px] md:py-[240px] lg:py-[223px]'>
      <Head>
        <title>Taskify | 로그인</title>
      </Head>
      <div className='w-[350px] items-center justify-center md:w-[520px]'>
        <TopLogoSection text='오늘도 만나서 반가워요!' />
        <SignInForm />
        <p className='mt-[20px] text-center text-black-33'>
          회원이 아니신가요?{' '}
          <Link href='/signup' className='text-violet underline'>
            회원가입하기
          </Link>
        </p>
      </div>
    </div>
  );
}
