import Head from 'next/head';
import Link from 'next/link';

import SignUpForm from '@/containers/signin&signup/SignUpForm';
import TopLogoSection from '@/containers/signin&signup/TopLogoSection';

export default function SignUp() {
  return (
    <div className='flex max-h-dvh items-center justify-center py-[20px] md:py-[189px] lg:py-[140px]'>
      <Head>
        <title>Taskify | 회원가입</title>
      </Head>
      <div className='w-[350px] items-center justify-center md:w-[520px]'>
        <TopLogoSection text='첫 방문을 환영합니다!' />
        <SignUpForm />
        <p className='my-[26px] text-center text-black-33'>
          이미 가입하셨나요?{' '}
          <Link href='/signin' className='text-violet underline'>
            로그인하기
          </Link>
        </p>
      </div>
    </div>
  );
}
