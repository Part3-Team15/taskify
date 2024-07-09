import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

import ProfileIcon from '@/components/ProfileIcon';
import { deleteComment } from '@/services/deleteService';
import { putComment } from '@/services/putService';
import { store } from '@/store/store';
import { Comment as CommentType } from '@/types/post/CommentForm.interface';
import formatDate from '@/utils/formatDate';

interface CommentProps {
  comment: CommentType;
  columnId: number;
  cardId: number;
}

export default function Comment({ comment }: CommentProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedComment, setEditedComment] = useState(comment.content);
  const queryClient = useQueryClient();
  const state = store.getState();
  const { user } = state.user; // 전역 상태에 저장된 user 데이터를 가져옴

  const handleToggleEdit = () => {
    setIsEditing(!isEditing);
    setEditedComment(comment.content);
  };

  const handleDeleteComment = async (commentId: number) => {
    try {
      await deleteComment(commentId);
      queryClient.invalidateQueries({ queryKey: ['comments'] });
    } catch (error) {
      // console.log(error);
    }
  };

  const handleSaveEdit = async () => {
    try {
      await putComment(comment.id, { content: editedComment });
      queryClient.invalidateQueries({ queryKey: ['comments'] });
      setIsEditing(false);
    } catch (error) {
      // console.error(error);
    }
  };

  return (
    <div>
      {/* 댓글 목록 조회 */}
      <div key={comment.id}>
        <section className='flex gap-[10px]'>
          <ProfileIcon
            user={comment.author}
            userId={comment.author.id}
            imgClassName={`w-[44px] h-[36px] md:h-[40px]`}
            fontClassName='md:font-base font-sm text-[14px]'
          />
          {/* Comment Edit Section */}
          <div className='w-full pr-[20px]'>
            <div className='flex gap-[8px] hover:cursor-default'>
              <p className='text-[12px] font-[600] text-black-33 md:text-[14px] dark:text-dark-10'>
                {comment.author.nickname}
              </p>
              <p className='text-[10px] text-gray-9f md:text-[12px]'>{formatDate(comment.createdAt, true, true)}</p>
            </div>
            {isEditing ? (
              <textarea
                className='w-full resize-none rounded-[6px] border border-gray-d9 px-[16px] py-[12px] text-[12px] text-black-33 focus:outline-none md:text-[14px] dark:border-dark-200 dark:bg-dark-300 dark:text-dark-10'
                value={editedComment}
                onChange={(e) => setEditedComment(e.target.value)}
              />
            ) : (
              <p className='max-w-[200px] whitespace-pre-wrap break-words text-[12px] text-black-33 hover:cursor-default md:max-w-[300px] md:text-[14px] dark:text-dark-10'>
                {comment.content}
              </p>
            )}

            {/* Button Section */}
            {user?.id === comment.author.id && (
              <div className='flex gap-[12px] text-[12px] text-gray-9f dark:text-dark-10'>
                {!isEditing ? (
                  <>
                    <button
                      className='transition-all duration-100 hover:text-black hover:underline dark:hover:text-violet-light-hover'
                      onClick={handleToggleEdit}
                    >
                      수정
                    </button>
                    <button
                      className='transition-all duration-100 hover:text-red-hover hover:underline'
                      onClick={() => handleDeleteComment(comment.id)}
                    >
                      삭제
                    </button>
                  </>
                ) : (
                  <div className='flex gap-[12px] text-[12px] text-gray-9f'>
                    <button
                      className='transition-all duration-100 hover:text-black hover:underline dark:hover:text-violet-light-hover'
                      onClick={handleToggleEdit}
                    >
                      취소
                    </button>
                    <button
                      className='text-black-33 transition-all duration-100 hover:text-violet hover:underline disabled:text-gray-9f dark:text-dark-10 dark:hover:text-violet-light-hover dark:disabled:text-gray-9f'
                      disabled={editedComment === comment.content}
                      onClick={handleSaveEdit}
                    >
                      저장
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
