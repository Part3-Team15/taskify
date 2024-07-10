import { useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState } from 'react';

import InvitedMemberList from './InvitedMemberList';

import Pagination from '@/components/Pagination';
import useDeleteData from '@/hooks/useDeleteData';
import useFetchData from '@/hooks/useFetchData';
import useModal from '@/hooks/useModal';
import { deleteInvitation } from '@/services/deleteService';
import { getDashboardInvitations } from '@/services/getService';
import { CancelInvitationInput } from '@/types/delete/CancelInvitation.interface';
import { DashboardInvitationsResponse } from '@/types/Invitation.interface';

export default function InvitedMembersSection() {
  const { openInviteMemberModal } = useModal();
  const queryClient = useQueryClient();
  const router = useRouter();
  const { id } = router.query;
  const [currentChunk, setCurrentChunk] = useState(1);

  const { data, isLoading, error } = useFetchData<DashboardInvitationsResponse>(['invitations', id, currentChunk], () =>
    getDashboardInvitations(Number(id), currentChunk, 5),
  );
  const totalPage = data ? Math.max(1, Math.ceil(data.totalCount / 5)) : 1;

  // NOTE: 페이지네이션
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

  // NOTE: 초대 취소
  const handleSuccess = () => {
    if (data?.invitations.length === 1 && currentChunk > 1) {
      setCurrentChunk((prev) => prev - 1);
    }
    queryClient.invalidateQueries({ queryKey: ['invitations', id] });
  };
  const { mutate } = useDeleteData<CancelInvitationInput>({ mutationFn: deleteInvitation, handleSuccess });

  const handleCancelInvitation = (invitationId: number) => {
    const handleDelete = async () => {
      if (!id) return;
      await mutate({ dashboardId: String(id), invitationId });
    };

    handleDelete();
  };

  if (isLoading) {
    return <section className='section align-center h-[395px] animate-pulse bg-gray-f5 md:h-[477px]'></section>;
  }

  if (error || !data) {
    return (
      <section className='section align-center h-[395px] md:h-[477px]'>
        <p role='alert' className='text-[22px] font-bold text-black-33'>
          초대내역 정보가 없습니다!
        </p>
      </section>
    );
  }

  return (
    <section className='section h-[395px] pb-4 transition-colors md:h-[477px] md:pb-5 dark:bg-dark'>
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
            onClick={() => openInviteMemberModal()}
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
        <InvitedMemberList invitations={data.invitations} onCancelClick={handleCancelInvitation} />
      </main>
    </section>
  );
}
