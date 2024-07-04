import Head from 'next/head';

import EditProfileForm from '@/containers/mypage/EditProfileForm';
import PwdChangeForm from '@/containers/mypage/PwdChangeForm';

export default function MyPage() {
  return (
    <div className='flex h-full flex-col gap-3 px-3 py-4 text-black-33 md:p-5'>
      <Head>
        <title>Taskify | 내 계정</title>
      </Head>
      <section className='w-full max-w-[620px] rounded-lg bg-white p-5 pt-0 md:p-7 md:pt-0'>
        <h2 className='section-title mb-6 mt-7 md:my-8'>프로필</h2>
        <EditProfileForm />
      </section>
      <section className='w-full max-w-[620px] rounded-lg bg-white p-5 pt-0 md:p-7 md:pt-0'>
        <h2 className='section-title mb-6 mt-7 md:my-8'>비밀번호 변경</h2>
        <PwdChangeForm />
      </section>
    </div>
  );
}
