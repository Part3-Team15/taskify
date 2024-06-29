import MemberList from './MemberList';

import Pagination from '@/components/Pagination';
import { Member } from '@/types/Member.interface';

const TEST_MEMBERS = [
  { id: 1, nickname: '테스트' },
  { id: 2, nickname: '테스트2' },
  { id: 3, nickname: '테스트3' },
  { id: 4, nickname: '테스트4' },
];

export default function MembersSection() {
  return (
    <section className='section h-[341px] pb-4 md:h-[408px] md:pb-5'>
      <header className='mb-[18px] mt-[22px] flex items-center justify-between md:mb-[27px] md:mt-[26px]'>
        <h2 className='section-title'>구성원</h2>
        <Pagination currentChunk={1} totalPage={1} onNextClick={() => {}} onPrevClick={() => {}} />
      </header>
      <main className='text-sm md:text-base'>
        <h3 className='mb-5 h-[17px] text-gray-9f md:mb-6 md:h-[19px]'>이름</h3>
        <MemberList members={TEST_MEMBERS as Member[]} />
      </main>
    </section>
  );
}
