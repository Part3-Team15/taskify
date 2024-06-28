import Image from 'next/image';

import InvitedMemberItem from './InvitedMemberItem';

import Pagination from '@/components/Pagination';

// TODO: 기능구현 (실제 정보 로드)
const testData = ['1', '2', '3', '4', '5'];

export default function InvitedMembersSection() {
  const lastItem = testData.at(-1);

  return (
    <section className='section pb-4 md:pb-5'>
      <header className='mb-4 mt-6 flex items-center justify-between md:my-7'>
        <h2 className='section-title'>초대 내역</h2>
        <nav className='align-center relative gap-3'>
          <Pagination />
          <button className='btn-violet absolute right-0 top-12 flex gap-1.5 rounded-md px-3 text-xs md:static md:px-4'>
            <div className='relative my-[7px] size-[14px] md:my-2 md:size-4'>
              <Image src='/icons/plusbox-white.svg' alt='초대 아이콘' fill priority />
            </div>
            <p className='mb-1.5 mt-[7px] md:mb-[7px] md:mt-2'>초대하기</p>
          </button>
        </nav>
      </header>
      <main className='text-sm md:text-base'>
        <h3 className='text-gray-9f'>이메일</h3>
        <ol className='mt-[29px] flex flex-col gap-3 md:mt-6 md:gap-4'>
          {testData.slice(0, testData.length - 1).map((val) => (
            <>
              <InvitedMemberItem key={val} email={val} />
              <div className='h-0 w-full border border-gray-ee' />
            </>
          ))}
          {lastItem && <InvitedMemberItem key={lastItem} email={lastItem} />}
        </ol>
      </main>
    </section>
  );
}
