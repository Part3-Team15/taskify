import Image from 'next/image';
import Link from 'next/link';

import Footer from '@/components/Footer';

const Home: React.FC = () => {
  return (
    <main className='h-dvh max-h-[calc(100dvh-70px)] overflow-y-scroll bg-dark-500 text-white'>
      <div className='flex flex-col items-center'>
        <div className='flex max-w-[1200px] flex-col items-center pb-[180px] pt-24'>
          <div className='relative h-[422px] w-[722px] pb-12'>
            <Image src={'/images/landing0.svg'} alt='invitations' fill priority />
          </div>
          <p className='pb-6 text-[76px] font-bold'>
            새로운 일정 관리 <span className='text-violet'>Taskify</span>
          </p>
          <p className='pb-16'>서비스의 메인 설명 들어갑니다.</p>
          <Link href='/signin' className='btn-violet h-14 w-72'>
            로그인하기
          </Link>
        </div>

        <div className='mb-[90px] flex h-min w-[1200px] max-w-[1200px] justify-between rounded-lg bg-dark-400 pt-[100px]'>
          <div className='flex flex-col gap-[100px] pl-[60px]'>
            <p className='pt-6 text-[22px] font-medium'>Point 1</p>
            <p className='text-5xl font-bold'>
              일의 우선순위를
              <br /> 관리하세요
            </p>
          </div>

          <div className='relative row-span-2 h-[460px] w-[550px]'>
            <Image src={'/images/landing1.svg'} alt='priority' fill />
          </div>
        </div>

        <div className='mb-[90px] flex h-min w-[1200px] max-w-[1200px] rounded-lg bg-dark-400 pt-[100px]'>
          <div className='relative row-span-2 mx-[100px] h-[460px] w-[400px]'>
            <Image src={'/images/landing2.svg'} alt='priority' fill />
          </div>

          <div className='flex flex-col gap-[100px]'>
            <p className='pt-6 text-[22px] font-medium'>Point 1</p>
            <p className='text-5xl font-bold'>
              일의 우선순위를
              <br /> 관리하세요
            </p>
          </div>
        </div>

        <div className='mb-40 flex max-w-[1200px] flex-col gap-9'>
          <p className='text-[28px] font-bold'>생산성을 높이는 다양한 설정 ⚡</p>
          <div className='flex justify-between gap-8'>
            <div className='max-h-96 max-w-[380px]'>
              <div className='flex h-[260px] w-[380px] items-center justify-center rounded-t-lg bg-black-4b'>
                <div className='relative h-[120px] w-[300px]'>
                  <Image src={'/images/landing3.svg'} alt='settings' fill />
                </div>
              </div>

              <div className='flex flex-col gap-4 rounded-b-lg bg-dark-400 p-8'>
                <p className='text-lg font-bold'>대시보드 설정</p>
                <p className='font-medium'>대시보드 사진과 이름을 변경할 수 있어요.</p>
              </div>
            </div>

            <div className='max-h-96 max-w-[380px]'>
              <div className='flex h-[260px] w-[380px] items-center justify-center rounded-t-lg bg-black-4b'>
                <div className='relative h-[230px] w-[300px]'>
                  <Image src={'/images/landing4.svg'} alt='settings' fill />
                </div>
              </div>

              <div className='flex flex-col gap-4 rounded-b-lg bg-dark-400 p-8'>
                <p className='text-lg font-bold'>대시보드 설정</p>
                <p className='font-medium'>대시보드 사진과 이름을 변경할 수 있어요.</p>
              </div>
            </div>

            <div className='max-h-96 max-w-[380px]'>
              <div className='flex h-[260px] w-[380px] items-center justify-center rounded-t-lg bg-black-4b'>
                <div className='relative h-[195px] w-[300px]'>
                  <Image src={'/images/landing5.svg'} alt='settings' fill />
                </div>
              </div>

              <div className='flex flex-col gap-4 rounded-b-lg bg-dark-400 p-8'>
                <p className='text-lg font-bold'>대시보드 설정</p>
                <p className='font-medium'>대시보드 사진과 이름을 변경할 수 있어요.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default Home;
