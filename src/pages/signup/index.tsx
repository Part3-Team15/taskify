import Link from 'next/link';

import SignUpForm from '@/containers/signin&signup/SignUpForm';
import TopLogoSection from '@/containers/signin&signup/TopLogoSection';
import useRedirectIfAuthenticated from '@/hooks/useRedirectIfAuthenticated';

export default function SignUp() {
  const isRedirecting = useRedirectIfAuthenticated();

  if (isRedirecting) {
    return <></>;
  }

  return (
    <div className='flex items-center justify-center'>
      <div className='w-[350px] items-center justify-center md:w-[520px]'>
        <TopLogoSection text='첫 방문을 환영합니다!' />
        <SignUpForm />
        <p className='my-[50px] text-center text-black-33'>
          이미 가입하셨나요?{' '}
          <Link href='/signin' className='text-violet underline'>
            로그인하기
          </Link>
        </p>
      </div>
    </div>
  );
}
