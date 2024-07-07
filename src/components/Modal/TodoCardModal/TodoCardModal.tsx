import { useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { FormEvent, useEffect, useState } from 'react';

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
  const { data, refetch } = useFetchData<CommentsResponse>(['comments', card.id], () => getComments(card.id));
  const [newComment, setNewComment] = useState('');
  const [isCommentEmpty, setIsCommentEmpty] = useState(true);
  const comments = data?.comments;
  const { closeModal } = useModal();
  const router = useRouter();
  const { id: dashboardId } = router.query;
  const queryClient = useQueryClient();

  useEffect(() => {
    refetch();
  }, [refetch]);

  useEffect(() => {
    setIsCommentEmpty(newComment.trim().length === 0);
  }, [newComment]);

  const handleModalClose = () => {
    if (onClick) onClick();
    closeModal();
  };

  const handleSubmitComment = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const commentData: CommentForm = {
      content: newComment,
      cardId: card.id,
      columnId: column.id,
      dashboardId: Number(dashboardId),
    };

    try {
      await postComment(commentData);
      queryClient.invalidateQueries({ queryKey: ['comments', card.id] });
      setNewComment('');
      setIsCommentEmpty(true); // 성공 시 에러 메시지 초기화
    } catch (error) {
      setIsCommentEmpty(true);
      console.error(error);
    }
  };

  return (
    <div className='modal flex h-[730px] w-[328px] flex-col gap-[24px] md:h-[770px] md:w-[680px] lg:h-[760px] lg:w-[730px]'>
      {/* Title Section */}
      <section className='flex flex-row items-start justify-between'>
        <div className='max-w-[220px] break-words text-[18px] font-[700] text-black-33 hover:cursor-default md:max-w-full md:text-[24px] dark:text-dark-10'>
          {card.title}
        </div>
        <div className='flex'>
          <div className='relative'>
            <EditDropdown card={card} column={column} />
          </div>
          <button onClick={handleModalClose} className='transition-all duration-200 hover:opacity-50'>
            <Image src='/icons/x.svg' alt='X 아이콘' width={32} height={32} className='dark:hidden' />
            <Image src='/icons/x-white.svg' alt='X 아이콘' width={32} height={32} className='hidden dark:block' />
          </button>
        </div>
      </section>

      <section className='flex flex-col md:flex-row md:justify-between'>
        {/* Tags Section */}
        <section className='order-2 flex flex-col gap-[16px] md:order-1'>
          <div className='flex gap-[10px]'>
            <div className='flex h-[22px] items-center gap-[6px] rounded-[12px] bg-violet-f1 p-[8px] text-[12px] text-violet hover:cursor-default dark:bg-dark-purple-hover dark:text-dark-10'>
              <p className='text-[10px]'>●</p>
              <p className='w-max'>{column.title}</p>
            </div>
            {card.tags && card.tags.length > 0 && (
              <div className='text-[20px] font-[100] text-gray-d9 hover:cursor-default dark:text-dark-200'>|</div>
            )}
            <Tags tags={card.tags} customClass='overflow-x-auto whitespace-nowrap md:max-w-[300px] lg:max-w-[330px]' />
          </div>

          {/* Card Description & Comment Section */}
          <div className='flex h-[484px] w-[288px] flex-col gap-[16px] overflow-y-auto pr-3 md:h-[608px] md:w-[420px] lg:w-[450px]'>
            <p className='whitespace-pre-wrap break-words text-[14px] leading-6'>{card.description}</p>
            {card.imageUrl && (
              <Image className='rounded-[6px]' src={card.imageUrl} width={450} height={262} alt='카드 이미지' />
            )}

            {/* Comment Post Form */}
            <form className='relative' onSubmit={handleSubmitComment}>
              <div className='flex justify-between'>
                <p className='mb-[8px] text-[14px] font-[500] hover:cursor-default md:mb-[10px] md:text-[16px] lg:text-[18px]'>
                  댓글
                </p>
              </div>
              <div className='relative mb-[40px]'>
                <textarea
                  className='h-[70px] w-full resize-none rounded-[6px] border border-gray-d9 p-[12px] px-[20px] text-[12px] focus:outline-none md:h-[110px] md:text-[14px] dark:bg-dark-300'
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder='댓글을 입력하세요.'
                />

                <button
                  className='btn-violet-light dark:btn-white absolute right-1 h-[28px] w-[60px] rounded-[4px] text-[12px] text-violet md:h-[32px] md:w-[78px] lg:w-[84px] dark:rounded-[4px]'
                  type='submit'
                  disabled={isCommentEmpty}
                >
                  입력
                </button>
              </div>
            </form>

            {comments && comments.length > 0 ? (
              comments.map((comment) => (
                <Comment key={comment.id} comment={comment} columnId={column.id} cardId={card.id} />
              ))
            ) : (
              <div className='flex flex-col items-center text-[14px] text-gray-9f hover:cursor-default'>
                <Image src='/icons/comment-empty.svg' width={150} height={150} alt='빈 댓글창' />
                작성된 댓글이 없습니다.
              </div>
            )}
          </div>
        </section>

        {/* Assignee Section */}
        <section className='order-1 mb-[20px] flex h-[74px] w-full flex-row items-center gap-[32px] rounded-[8px] border border-gray-d9 px-[16px] py-[6px] text-[12px] md:order-2 md:mb-0 md:h-[156px] md:w-[180px] md:flex-col md:items-start md:gap-[10px] md:p-[16px] lg:w-[200px]'>
          <div>
            <p className='font-[600] hover:cursor-default'>담당자</p>
            {card.assignee ? (
              <div className='flex items-center gap-[8px] hover:cursor-default'>
                <ProfileIcon
                  user={card.assignee}
                  userId={card.assignee.id}
                  imgClassName={`size-[34px] md:size-[38px]`}
                  fontClassName='md:font-base text-[14px]'
                />
                <p className='text-[12px] md:text-[14px]'>{card.assignee.nickname}</p>
              </div>
            ) : (
              <>없음</>
            )}
          </div>

          <div>
            <p className='font-[600] hover:cursor-default'>마감일</p>
            <div className='mt-[4px] text-[12px] md:mt-0'>{card.dueDate ? formatDate(card.dueDate, true) : '미정'}</div>
          </div>
        </section>
      </section>
    </div>
  );
}
