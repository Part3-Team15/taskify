import EditProfileForm from '@/containers/mypage/EditProfileForm';

export default function MyPage() {
  return (
    <div className='flex flex-col px-3 py-4 text-black-33 md:p-5'>
      <section className='h-[422px] w-full max-w-[620px] rounded-lg bg-white px-5 md:h-[355px] md:px-7'>
        <h2 className='section-title mb-6 mt-7 md:my-8'>프로필</h2>
        <EditProfileForm />
      </section>
    </div>
  );
}
