import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState } from 'react';

import InvitedMemberList from './InvitedMemberList';

import Pagination from '@/components/Pagination';
import useFetchData from '@/hooks/useFetchData';
import { getDashboardInvitations } from '@/services/getService';
import { DashboardInvitationsResponse } from '@/types/Invitation.interface';

export default function InvitedMembersSection() {
  const router = useRouter();
  const { id } = router.query;
  const [currentChunk, setCurrentChunk] = useState(1);

  const { data, error } = useFetchData<DashboardInvitationsResponse>(['invitations', id, currentChunk], () =>
    getDashboardInvitations(Number(id), currentChunk, 5),
  );
  const totalPage = data ? Math.max(1, Math.ceil(data.totalCount / 5)) : 1;

  const handleNext = () => {
    if (currentChunk < totalPage) {
      setCurrentChunk((prev) => prev + 1);
    }
  };
  const handlePrev = () => {
    if (currentChunk > 1) {
      setCurrentChunk((prev) => prev - 1);
    }
  };

  const handleInviteClick = () => {
    // TODO: 모달 연결
    alert('초대 모달');
  };

  return (
    <section className='section h-[395px] pb-4 md:h-[477px] md:pb-5'>
      <header className='mb-4 mt-6 flex items-center justify-between md:my-7'>
        <h2 className='section-title'>초대 내역</h2>
        <nav className='align-center relative gap-3'>
          <Pagination
            currentChunk={currentChunk}
            totalPage={totalPage}
            onNextClick={handleNext}
            onPrevClick={handlePrev}
          />
          <button
            className='btn-violet absolute right-0 top-12 flex gap-1.5 rounded-md px-3 text-xs md:static md:px-4'
            type='button'
            onClick={handleInviteClick}
          >
            <div className='relative my-[7px] size-[14px] md:my-2 md:size-4'>
              <Image src='/icons/plusbox-white.svg' alt='초대 아이콘' fill priority />
            </div>
            <p className='mb-1.5 mt-[7px] md:mb-[7px] md:mt-2'>초대하기</p>
          </button>
        </nav>
      </header>
      <main className='text-sm md:text-base'>
        <h3 className='mb-[29px] text-gray-9f md:mb-6'>이메일</h3>
        {data ? (
          <InvitedMemberList invitations={data.invitations} />
        ) : error ? (
          <p>{`에러가 발생했습니다. \n${error.message}`}</p>
        ) : (
          <p>로딩중...</p>
        )}
      </main>
    </section>
  );
}
