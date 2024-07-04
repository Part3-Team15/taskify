import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useSelector } from 'react-redux';

import { RootState } from '@/store/store';

export default function NotFound() {
  const { user } = useSelector((state: RootState) => state.user);

  return (
    <div className='flex grow items-center justify-center'>
      <Head>
        <title>Taskify | 404</title>
      </Head>
      <div className='mb-24 w-[350px] items-center justify-center md:w-[520px]'>
        <div className='relative h-[180px] w-[350px] md:h-[380px] md:w-[520px]'>
          <Image src='/images/not-found.svg' fill alt='404' priority />
        </div>
        <p className='my-[80px] text-center text-xl font-black text-black-33 md:text-2xl'>
          요청하신 페이지를 찾을 수 없습니다.
        </p>
        <Link href={user ? '/mydashboard' : '/'} className='btn-violet w-full py-5 text-xl font-bold'>
          홈으로 돌아가기
        </Link>
      </div>
    </div>
  );
}
