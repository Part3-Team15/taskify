import Link from 'next/link';

import SignUpForm from '@/containers/signup/SignUpForm';
import TopLogoSection from '@/containers/signup/TopLogoSection';

export default function SignUp() {
  return (
    <div className='flex items-center justify-center'>
      <div className='w-[350px] items-center justify-center md:w-[520px]'>
        <TopLogoSection />
        <SignUpForm />
        <p className='mt-[20px] text-center text-black_33'>
          이미 가입하셨나요?{' '}
          <Link href='/signin' className='text-violet underline'>
            로그인하기
          </Link>
        </p>
      </div>
    </div>
  );
}
