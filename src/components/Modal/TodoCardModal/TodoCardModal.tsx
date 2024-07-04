import { useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState } from 'react';

import Comment from './Comment';
import EditDropdown from './EditDropdown';

import ProfileIcon from '@/components/ProfileIcon';
import Tags from '@/components/Tags';
import useFetchData from '@/hooks/useFetchData';
import useModal from '@/hooks/useModal';
import { getComments } from '@/services/getService';
import { postComment } from '@/services/postService';
import { TodoCardModalProps } from '@/types/Modal.interface';
import { CommentsResponse, CommentForm } from '@/types/post/CommentForm.interface';
import formatDate from '@/utils/formatDate';

export default function TodoCardModal({ card, column, onClick }: TodoCardModalProps) {
  const { data } = useFetchData<CommentsResponse>(['comments'], () => getComments(card.id));
  const [newComment, setNewComment] = useState('');
  const comments = data?.comments;
  const { closeModal } = useModal();
  const router = useRouter();
  const { id: dashboardId } = router.query;
  const queryClient = useQueryClient();

  const handleModalClose = () => {
    if (onClick) onClick();
    closeModal();
  };

  const handleSubmitComment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const commentData: CommentForm = {
      content: newComment,
      cardId: card.id,
      columnId: column.id,
      dashboardId: Number(dashboardId),
    };

    try {
      await postComment(commentData);
      queryClient.invalidateQueries({ queryKey: ['comments'] });
      setNewComment('');
    } catch (error) {
      console.error('댓글 추가 중 에러 발생:', error);
      // 에러 처리
    }
  };

  return (
    <div className='modal flex h-[716px] w-[328px] flex-col gap-[24px] md:h-[770px] md:w-[680px] lg:h-[762px] lg:w-[730px]'>
      {/* Title Section */}
      <section className='flex flex-row items-center justify-between'>
        <div className='text-[20px] font-[700] text-black-33 hover:cursor-default md:text-[24px]'>{card.title}</div>
        <div className='flex'>
          <div className='relative'>
            <EditDropdown card={card} />
          </div>
          <button onClick={handleModalClose}>
            <Image src='/icons/x.svg' alt='X 아이콘' width={32} height={32} />
          </button>
        </div>
      </section>

      <section className='flex flex-col md:flex-row md:justify-between'>
        {/* Tags Section */}
        <section className='order-2 flex flex-col gap-[16px] md:order-1'>
          <div className='flex gap-[10px]'>
            <div className='flex h-[22px] items-center gap-[6px] rounded-[12px] bg-violet-f1 p-[8px] text-[12px] text-violet hover:cursor-default'>
              <p className='text-[10px]'>●</p>
              <p className='w-max'>{column.title}</p>
            </div>
            {card.tags && card.tags.length > 0 && (
              <div className='text-[20px] font-[100] text-gray-d9 hover:cursor-default'>|</div>
            )}
            <Tags tags={card.tags} customClass='overflow-x-auto whitespace-nowrap' />
          </div>

          {/* Card Description & Comment Section */}
          <div className='flex h-[484px] w-[288px] flex-col gap-[16px] overflow-y-auto pr-3 md:h-[608px] md:w-[420px] lg:w-[450px]'>
            <p className='break-words text-[14px] leading-6'>{card.description}</p>
            {card.imageUrl && (
              <Image className='rounded-[6px]' src={card.imageUrl} width={450} height={262} alt='카드 이미지' />
            )}

            <form className='relative' onSubmit={handleSubmitComment}>
              <div className='flex justify-between'>
                <p className='mb-[8px] text-[14px] font-[500] hover:cursor-default md:mb-[10px] md:text-[16px] lg:text-[18px]'>
                  댓글
                </p>
              </div>

              <textarea
                className='h-[70px] w-full resize-none rounded-[6px] border border-gray-d9 p-[12px] px-[20px] text-[12px] focus:outline-none md:h-[110px] md:text-[14px]'
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder='댓글 작성하기'
              />

              <button
                className='btn-white bottom-5 right-3 h-[28px] w-[60px] rounded-[4px] text-[12px] text-violet md:h-[32px] md:w-[78px] lg:w-[84px]'
                type='submit'
              >
                입력
              </button>
            </form>

            {comments ? (
              comments.map((comment) => (
                <Comment key={comment.id} comment={comment} columnId={column.id} cardId={card.id} />
              ))
            ) : (
              <>아직 댓글이 없습니다.</>
            )}
          </div>
        </section>

        {/* Assignee Section */}
        <section className='order-1 mb-[20px] flex h-[74px] w-full flex-row items-center gap-[62px] rounded-[8px] border border-gray-d9 px-[16px] py-[6px] text-[12px] md:order-2 md:mb-0 md:h-[156px] md:w-[180px] md:flex-col md:items-start md:gap-[10px] md:p-[16px] lg:w-[200px]'>
          <div>
            <p className='font-[600] hover:cursor-default'>담당자</p>
            {card.assignee ? (
              <div className='flex items-center gap-[8px]'>
                <ProfileIcon
                  user={card.assignee}
                  userId={card.assignee.id}
                  imgClassName={`size-[34px] md:size-[38px]`}
                  fontClassName='md:font-base font-sm'
                />
                <p className='text-[12px] md:text-[14px]'>{card.assignee.nickname}</p>
              </div>
            ) : (
              <>없음</>
            )}
          </div>

          <div>
            <p className='font-[600] hover:cursor-default'>마감일</p>
            <div className='mt-[4px] text-[12px] md:mt-0'>{card.dueDate ? formatDate(card.dueDate) : '미정'}</div>
          </div>
        </section>
      </section>
    </div>
  );
}
