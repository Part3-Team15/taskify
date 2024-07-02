import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

import Footer from '@/components/Footer';

function Home() {
  return (
    <main className='h-dvh max-h-[calc(100dvh-70px)] overflow-y-scroll bg-dark-500 text-white'>
      <Head>
        <title>Taskify</title>
      </Head>
      <div className='flex flex-col items-center'>
        <section className='flex max-w-[1200px] flex-col items-center pb-[180px] pt-24 md:pb-[180px]'>
          <div className='relative h-[168px] w-[287px] md:h-[314px] md:w-[537px] lg:h-[422px] lg:w-[722px]'>
            <Image src={'/images/landing0.svg'} alt='invitations' fill priority />
          </div>

          <p className='pb-6 pt-7 text-center text-[40px] font-bold leading-[64px] tracking-[-4px] md:pt-12 md:text-[56px] lg:text-[76px]'>
            새로운 일정 관리 <br className='md:hidden' />
            <span className='text-[42px] tracking-normal text-violet md:text-[70px] lg:text-[90px]'>Taskify</span>
          </p>
          <p className='pb-16 text-sm tracking-[-1px] md:text-base'>서비스의 메인 설명 들어갑니다.</p>
          <Link href='/signin' className='btn-violet h-14 w-72'>
            로그인하기
          </Link>
        </section>

        <section className='mb-[90px] flex h-min w-[343px] flex-col justify-between gap-48 rounded-lg bg-dark-400 md:w-[664px] md:gap-[220px] md:pt-[63px] lg:w-[1200px] lg:max-w-[1200px] lg:flex-row lg:pt-[100px]'>
          <div className='flex flex-col gap-[60px] md:gap-[100px] md:pl-[60px]'>
            <p className='pt-[60px] text-center text-[22px] font-medium text-gray-9f md:pt-6 md:text-start'>Point 1</p>
            <p className='text-center text-4xl font-bold leading-[64px] md:text-start md:text-5xl'>
              일의 우선순위를
              <br /> 관리하세요
            </p>
          </div>

          <div className='flex justify-end'>
            <div className='relative row-span-2 h-[248px] w-[296px] md:h-[435px] md:w-[520px] lg:h-[500px] lg:w-[594px]'>
              <Image src={'/images/landing1.svg'} alt='priority' fill />
            </div>
          </div>
        </section>

        <section className='mb-[90px] flex h-min w-[343px] max-w-[1200px] flex-col gap-[190px] rounded-lg bg-dark-400 pt-[60px] md:w-[664px] md:gap-[240px] md:pt-[63px] lg:w-[1200px] lg:flex-row-reverse lg:justify-end lg:gap-[100px] lg:pl-[100px]'>
          <div className='flex flex-col gap-[60px] md:gap-[100px] md:pl-[60px] lg:p-0'>
            <p className='text-center text-[22px] font-medium text-gray-9f md:pt-6 md:text-start'>Point 2</p>
            <p className='text-center text-4xl font-bold leading-[50px] md:text-start md:text-5xl'>
              해야 할 일을
              <br /> 등록하세요
            </p>
          </div>

          <div className='flex justify-center'>
            <div className='relative row-span-2 h-[250px] w-[217px] md:h-[360px] md:w-[415px] lg:h-[500px] lg:w-[436px]'>
              <Image src={'/images/landing2.svg'} alt='priority' fill />
            </div>
          </div>
        </section>

        <section className='mb-40 flex max-w-[1200px] flex-col gap-9'>
          <p className='text-center text-[22px] font-bold md:text-[28px] lg:text-start'>
            생산성을 높이는 다양한 설정 ⚡
          </p>

          <div className='flex flex-col justify-between gap-8 lg:flex-row'>
            <div className='max-h-96 max-w-min'>
              <div className='flex h-[235px] w-[343px] items-center justify-center rounded-t-lg bg-black-4b md:h-[260px] md:w-[380px]'>
                <div className='relative h-[120px] w-[300px]'>
                  <Image src={'/images/landing3.svg'} alt='settings' fill />
                </div>
              </div>

              <div className='flex flex-col gap-4 rounded-b-lg bg-dark-400 p-4 py-8 md:p-8'>
                <p className='text-lg font-bold'>대시보드 설정</p>
                <p className='font-medium'>대시보드 사진과 이름을 변경할 수 있어요.</p>
              </div>
            </div>

            <div className='max-h-96 max-w-min'>
              <div className='flex h-[235px] w-[343px] items-center justify-center rounded-t-lg bg-black-4b md:h-[260px] md:w-[380px]'>
                <div className='relative h-[230px] w-[300px]'>
                  <Image src={'/images/landing4.svg'} alt='settings' fill />
                </div>
              </div>

              <div className='flex flex-col gap-4 rounded-b-lg bg-dark-400 p-8'>
                <p className='text-lg font-bold'>초대</p>
                <p className='font-medium'>새로운 팀원을 초대할 수 있어요.</p>
              </div>
            </div>

            <div className='max-h-96 max-w-min'>
              <div className='flex h-[235px] w-[343px] items-center justify-center rounded-t-lg bg-black-4b md:h-[260px] md:w-[380px]'>
                <div className='relative h-[195px] w-[300px]'>
                  <Image src={'/images/landing5.svg'} alt='settings' fill />
                </div>
              </div>

              <div className='flex flex-col gap-4 rounded-b-lg bg-dark-400 p-8'>
                <p className='text-lg font-bold'>구성원</p>
                <p className='font-medium'>구성원을 초대하고 내보낼 수 있어요.</p>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </main>
  );
}

export default Home;
