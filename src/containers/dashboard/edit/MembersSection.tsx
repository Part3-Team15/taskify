import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useState } from 'react';

import MemberList from './MemberList';

import Pagination from '@/components/Pagination';
import useDeleteData from '@/hooks/useDeleteData';
import useFetchData from '@/hooks/useFetchData';
import useModal from '@/hooks/useModal';
import { deleteMember } from '@/services/deleteService';
import { getMembersList } from '@/services/getService';
import { DeleteMemberInput } from '@/types/delete/DeleteMemberInput.interface';
import { MembersResponse } from '@/types/Member.interface';

export default function MembersSection() {
  const { openConfirmModal } = useModal();
  const router = useRouter();
  const { id } = router.query;
  const [currentChunk, setCurrentChunk] = useState(1);

  const { data, error } = useFetchData<MembersResponse>(['members', id, currentChunk], () =>
    getMembersList(Number(id), currentChunk, 4),
  );
  const totalPage = data ? Math.max(1, Math.ceil(data.totalCount / 4)) : 1;

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

  const handleSuccess = () => {
    if (data?.members.length === 1 && currentChunk > 1) {
      setCurrentChunk((prev) => prev - 1);
    }
    queryClient.invalidateQueries({ queryKey: ['members', id] });
  };

  const { mutate } = useDeleteData<DeleteMemberInput>({ mutationFn: deleteMember, handleSuccess });
  const queryClient = useQueryClient();

  const handleDeleteMember = (memberId: number) => {
    const handleDelete = async () => {
      if (!id) return;
      await mutate({ memberId });
    };

    openConfirmModal({ text: '정말 구성원을 삭제하시겠습니까?', onActionClick: handleDelete });
  };

  return (
    <section className='section h-[341px] pb-4 md:h-[408px] md:pb-5'>
      <header className='mb-[18px] mt-[22px] flex items-center justify-between md:mb-[27px] md:mt-[26px]'>
        <h2 className='section-title'>구성원</h2>
        <Pagination
          currentChunk={currentChunk}
          totalPage={totalPage}
          onNextClick={handleNext}
          onPrevClick={handlePrev}
        />
      </header>
      <main className='text-sm md:text-base'>
        <h3 className='mb-5 h-[17px] text-gray-9f md:mb-6 md:h-[19px]'>이름</h3>
        {data ? (
          <MemberList members={data.members} onDeleteClick={handleDeleteMember} />
        ) : error ? (
          <p>{`에러가 발생했습니다. \n${error.message}`}</p>
        ) : (
          <p>로딩중...</p>
        )}
      </main>
    </section>
  );
}
