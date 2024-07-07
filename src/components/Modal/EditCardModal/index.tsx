import { useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState, useRef, useCallback } from 'react';

import ColumnsDropDown from './ColumnsDropDown';
import MemberProfile from './MemberProfile';
import MembersDropDown from './MembersDropDown';

import CARROT_DOWN from '@/../public/icons/carrot-down.svg';
import SPINNER from '@/../public/icons/spinner.svg';
import ModalActionButton from '@/components/Button/ModalActionButton';
import ModalCancelButton from '@/components/Button/ModalCancelButton';
import ImageInput from '@/components/Input/ImageInput';
import Tags from '@/components/Tags';
import useModal from '@/hooks/useModal';
import { getColumnsList, getMembersList } from '@/services/getService';
import { postImageForCard, postCard } from '@/services/postService';
import { putCard } from '@/services/putService';
import { Column } from '@/types/Column.interface';
import { Member } from '@/types/Member.interface';
import { EditCardModalProps } from '@/types/Modal.interface';
import { PostCardData } from '@/types/post/EditModalPostData.interface';
import { formatDateTime, revertFormattedDateTime } from '@/utils/formatDateTime';

const formInitialState: PostCardData = {
  assigneeUserId: 0,
  dashboardId: 0,
  columnId: 0,
  title: '',
  description: '',
  dueDate: '',
  tags: [],
  imageUrl: '',
};

export default function EditCardModal({ column, isEdit = false, card }: EditCardModalProps) {
  const router = useRouter();
  const { id } = router.query;
  const queryClient = useQueryClient();

  const { closeModal, openTodoCardModal, openNotificationModal } = useModal();

  const [membersIsOpen, setMembersIsOpen] = useState(false);
  const [columnsIsOpen, setColumnsIsOpen] = useState(false);

  const [members, setMembers] = useState<Member[]>([]);
  const [columns, setColumns] = useState<Column[]>([]);

  const initializeFormValues = useCallback((): PostCardData => {
    if (card) {
      return {
        assigneeUserId: card.assignee?.id || 0,
        dashboardId: Number(id),
        columnId: card.columnId,
        title: card.title,
        description: card.description,
        dueDate: card.dueDate ? revertFormattedDateTime(card.dueDate) : '',
        tags: card.tags,
        imageUrl: card.imageUrl || '',
      };
    } else {
      return {
        ...formInitialState,
        dashboardId: Number(id),
        columnId: column ? column.id : 0,
      };
    }
  }, [card, column, id]);

  const [formValues, setFormValues] = useState<PostCardData>(initializeFormValues);
  const [profileImageFile, setProfileImageFile] = useState<File | null>(null);
  const [initialFormValues, setInitialFormValues] = useState<PostCardData>(initializeFormValues);
  const [isFormChanged, setIsFormChanged] = useState(false);

  const [titleError, setTitleError] = useState<boolean>(false);

  const [loading, setLoading] = useState(false);

  const membersDropdownRef = useRef<HTMLDivElement>(null);
  const membersToggleRef = useRef<HTMLDivElement>(null);
  const columnsDropdownRef = useRef<HTMLDivElement>(null);
  const columnsToggleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const getMembers = async () => {
      try {
        const response = await getMembersList(Number(id), 1, 10);
        const filteredMembers = response.data.members.map((member: Member) => ({
          userId: member.userId,
          nickname: member.nickname,
          profileImageUrl: member.profileImageUrl,
        }));
        setMembers(filteredMembers);
      } catch (error) {
        console.error('Error fetching members:', error);
      }
    };

    const getColumns = async () => {
      try {
        const response = await getColumnsList(Number(id));
        const filteredColumns = response.data.data.map((column: Column) => ({
          id: column.id,
          title: column.title,
        }));
        setColumns(filteredColumns);
      } catch {}
    };

    if (id) {
      getMembers();
      getColumns();
      setFormValues(initializeFormValues());
      setInitialFormValues(initializeFormValues());
    }
  }, [id, initializeFormValues]);

  const getTitleLength = (title: string) => {
    let length = 0;
    for (let i = 0; i < title.length; i++) {
      if (escape(title.charAt(i)).length > 4) {
        length += 2;
      } else {
        length += 1;
      }
    }
    return length;
  };

  const checkFormChanged = (newFormValues: PostCardData) => {
    const initialImageUrl = initialFormValues.imageUrl || '';
    const currentImageUrl = profileImageFile ? 'new_image' : newFormValues.imageUrl || '';
    const currentFormValues = { ...newFormValues, imageUrl: currentImageUrl };
    const initialFormValuesForComparison = { ...initialFormValues, imageUrl: initialImageUrl };
    setIsFormChanged(JSON.stringify(currentFormValues) !== JSON.stringify(initialFormValuesForComparison));
  };

  useEffect(() => {
    checkFormChanged(formValues);
  }, [formValues, profileImageFile]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        membersDropdownRef.current &&
        !membersDropdownRef.current.contains(event.target as Node) &&
        membersToggleRef.current &&
        !membersToggleRef.current.contains(event.target as Node)
      ) {
        setMembersIsOpen(false);
      }
    };
    if (membersIsOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [membersIsOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        columnsDropdownRef.current &&
        !columnsDropdownRef.current.contains(event.target as Node) &&
        columnsToggleRef.current &&
        !columnsToggleRef.current.contains(event.target as Node)
      ) {
        setColumnsIsOpen(false);
      }
    };
    if (columnsIsOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [columnsIsOpen]);

  const handleSelectMember = (userId: number) => {
    const newFormValues = { ...formValues, assigneeUserId: userId };
    setFormValues(newFormValues);
    setMembersIsOpen(false);
  };

  const handleSelectColumn = (columnId: number) => {
    const newFormValues = { ...formValues, columnId: columnId };
    setFormValues(newFormValues);
    setColumnsIsOpen(false);
  };

  const handleTagsEnterKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      const value = event.currentTarget.value.trim();
      if (value && !formValues.tags.includes(value) && event.nativeEvent.isComposing === false) {
        const newFormValues = { ...formValues, tags: [...formValues.tags, value] };
        setFormValues(newFormValues);
        event.currentTarget.value = '';
      }
    }
  };

  const handleTagClick = (tag: string) => {
    const newFormValues = { ...formValues, tags: formValues.tags.filter((t) => t !== tag) };
    setFormValues(newFormValues);
  };

  const handleImageChange = (image: File) => {
    setProfileImageFile(image);
    checkFormChanged({ ...formValues, imageUrl: 'new_image' });
  };

  const handleImageDelete = () => {
    setProfileImageFile(null);
    const newFormValues = { ...formValues, imageUrl: null };
    setFormValues(newFormValues);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    const titleLength = getTitleLength(newTitle);
    setTitleError(titleLength > 50);
    const newFormValues = { ...formValues, title: newTitle };
    setFormValues(newFormValues);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    try {
      let imgUrl = formValues.imageUrl;
      if (profileImageFile) {
        const response = await postImageForCard(formValues.columnId, { image: profileImageFile });
        imgUrl = response.imageUrl;
      }

      const formValuesToSend = {
        ...formValues,
        dueDate: formValues.dueDate ? formatDateTime(formValues.dueDate) : '',
        imageUrl: imgUrl,
      };

      const filteredFormValues: Partial<PostCardData> = {
        ...formValuesToSend,
        assigneeUserId: formValuesToSend.assigneeUserId || (isEdit ? null : undefined),
        imageUrl: formValuesToSend.imageUrl !== '' ? formValuesToSend.imageUrl : isEdit ? null : undefined,
        dueDate: formValuesToSend.dueDate !== '' ? formValuesToSend.dueDate : isEdit ? null : undefined,
      };

      let responseCard;
      if (isEdit && card) {
        responseCard = await putCard(card.id, filteredFormValues as PostCardData);
      } else {
        responseCard = await postCard(filteredFormValues as PostCardData);
      }

      if (responseCard && isEdit) {
        const columnToOpen = columns.find((col) => col.id === responseCard.columnId);
        const cardToOpen = responseCard;
        openTodoCardModal({ card: cardToOpen, column: columnToOpen as Column });
      } else {
        openNotificationModal({ text: '할 일 카드가 생성되었습니다!' });
      }

      queryClient.resetQueries({ queryKey: ['columns', id] });
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setLoading(false);
    }
  };

  const selectedMember = members.find((member) => member.userId === formValues.assigneeUserId);
  const selectedColumns = columns.find((column) => column.id === formValues.columnId);

  return (
    <div className='modal h-[90vh] w-[327px] md:h-[90vh] md:w-[506px]'>
      <div className='flex h-full flex-col'>
        <h2 className='section-title border-b-2 border-gray-d9 pb-4 text-[20px] md:text-[24px] dark:border-dark-200'>
          {isEdit ? '할일 수정' : '할일 생성'}
        </h2>
        <form className='flex h-full flex-col overflow-y-auto pr-5' onSubmit={handleSubmit}>
          <div className='my-[20px] flex flex-col gap-[15px] md:flex-row'>
            <div className='flex-1'>
              <label htmlFor='memberSelect' className='label mb-[15px] block text-[16px] md:text-[18px]'>
                컬럼
              </label>
              <div className='relative'>
                <div
                  className='input cursor-pointer text-[14px] md:text-[16px]'
                  onClick={() => {
                    setColumnsIsOpen(!columnsIsOpen);
                  }}
                  ref={columnsToggleRef}
                >
                  {selectedColumns ? (
                    <div className='flex h-[22px] items-center gap-[6px] rounded-[12px] bg-violet-f1 p-[8px] text-[12px] text-violet dark:bg-dark-purple-hover dark:text-dark-10'>
                      <p className='text-[10px]'>●</p>
                      <p className='w-max'>{selectedColumns.title}</p>
                    </div>
                  ) : (
                    <div className='flex h-[22px] items-center gap-[6px] rounded-[12px] bg-violet-f1 p-[8px] text-[12px] text-violet dark:bg-dark-purple-hover dark:text-dark-10'>
                      <p className='text-[10px]'>●</p>
                      <p className='w-max'>{'temp'}</p>
                    </div>
                  )}
                  <Image
                    className={`absolute right-[20px] top-[18px] md:top-[24px] ${columnsIsOpen ? 'rotate-180' : ''}`}
                    src={CARROT_DOWN}
                    alt='메뉴 내리기 버튼'
                  />
                </div>
                {columnsIsOpen && (
                  <div ref={columnsDropdownRef}>
                    <ColumnsDropDown columns={columns} onSelectColumn={handleSelectColumn} />
                  </div>
                )}
              </div>
            </div>
            <div className='flex-1'>
              <label htmlFor='memberSelect' className='label mb-[15px] block text-[16px] md:text-[18px]'>
                담당자
              </label>
              <div className='relative'>
                <div
                  className='input cursor-pointer text-[14px] md:text-[16px]'
                  onClick={() => {
                    setMembersIsOpen(!membersIsOpen);
                  }}
                  ref={membersToggleRef}
                >
                  {selectedMember ? (
                    <MemberProfile
                      userId={selectedMember.userId}
                      nickname={selectedMember.nickname}
                      profileImageUrl={selectedMember.profileImageUrl}
                    />
                  ) : (
                    <p className='text-gray-9f'>담당자를 선택해 주세요</p>
                  )}
                  <Image
                    className={`absolute right-[20px] top-[18px] md:top-[24px] ${membersIsOpen ? 'rotate-180' : ''}`}
                    src={CARROT_DOWN}
                    alt='메뉴 내리기 버튼'
                  />
                </div>
                {membersIsOpen && (
                  <div ref={membersDropdownRef}>
                    <MembersDropDown members={members} onSelectMember={handleSelectMember} />
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className='mb-[20px]'>
            <label htmlFor='title' className='label mb-[15px] block text-[16px] md:text-[18px]'>
              제목 <span className='text-violet'>(필수)*</span>
            </label>
            <input
              className={`input text-[14px] md:text-[16px] ${titleError ? 'border-red' : ''}`}
              id='title'
              type='text'
              placeholder='제목을 입력해 주세요'
              value={formValues.title}
              onChange={handleTitleChange}
            />
            {titleError && (
              <p className='mt-1 text-[14px] text-red'>제목은 한글 25자 이상, 영어 50자 이상 입력할 수 없습니다.</p>
            )}
          </div>
          <div className='mb-[20px]'>
            <label htmlFor='description' className='label mb-[15px] block text-[16px] md:text-[18px]'>
              설명 <span className='text-violet'>(필수)*</span>
            </label>
            <textarea
              className='input h-[84px] resize-none py-3 text-[14px] md:h-[96px] md:text-[16px]'
              id='description'
              placeholder='설명을 입력해 주세요'
              value={formValues.description}
              onChange={(e) => {
                const newFormValues = { ...formValues, description: e.target.value };
                setFormValues(newFormValues);
              }}
            ></textarea>
          </div>
          <div className='mb-[20px]'>
            <label htmlFor='dueDate' className='label mb-[15px] block text-[16px] md:text-[18px]'>
              마감일
            </label>
            <input
              className='input text-[14px] md:text-[16px]'
              id='dueDate'
              type='datetime-local'
              placeholder='날짜를 입력해 주세요'
              value={formValues.dueDate ? formValues.dueDate : ''}
              onChange={(e) => {
                const newFormValues = { ...formValues, dueDate: e.target.value ? formatDateTime(e.target.value) : '' };
                setFormValues(newFormValues);
              }}
            />
          </div>
          <div className='mb-[20px]'>
            <label htmlFor='tags' className='label mb-[15px] block text-[16px] md:text-[18px]'>
              태그
            </label>
            <input
              className='input text-[14px] md:text-[16px]'
              id='tags'
              type='text'
              placeholder='입력 후 Enter'
              onKeyDown={handleTagsEnterKeyDown}
            />
            <Tags tags={formValues.tags} customClass='mt-[10px]' onClick={handleTagClick} />
          </div>
          <div className='mb-[20px]'>
            <label htmlFor='card-profile' className='label mb-[15px] block text-[16px] md:text-[18px]'>
              이미지
            </label>
            <div className='h-[130px] w-full md:h-[210px]'>
              <ImageInput
                name='card-profile'
                value={formValues.imageUrl || null}
                onChange={handleImageChange}
                onDeleteClick={handleImageDelete}
              />
            </div>
          </div>
        </form>
        <div className='flex justify-end gap-[10px] border-t-2 border-gray-d9 pt-[20px] dark:border-dark-200'>
          <ModalCancelButton
            type='button'
            onClick={() => {
              if (isEdit && card) {
                openTodoCardModal({ card: card, column: column });
              } else {
                closeModal();
              }
            }}
          >
            취소
          </ModalCancelButton>
          <ModalActionButton
            type='submit'
            onClick={handleSubmit}
            disabled={
              loading ||
              !(formValues.title.length > 0 && formValues.description.length > 0) ||
              !isFormChanged ||
              titleError
            }
          >
            {loading ? <Image src={SPINNER} alt='로딩 중' /> : <>{isEdit ? '수정' : '생성'}</>}
          </ModalActionButton>
        </div>
      </div>
    </div>
  );
}
