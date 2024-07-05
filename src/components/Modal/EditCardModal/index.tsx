import { useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState, useRef } from 'react';

import MemberProfile from './MemberProfile';
import MembersDropDown from './MembersDropDown';

import CARROT_DOWN from '@/../public/icons/carrot-down.svg';
import ModalActionButton from '@/components/Button/ModalActionButton';
import ModalCancelButton from '@/components/Button/ModalCancelButton';
import ImageInput from '@/components/Input/ImageInput';
import Tags from '@/components/Tags';
import useModal from '@/hooks/useModal';
import { getMembersList } from '@/services/getService';
import { postImageForCard, postCard } from '@/services/postService';
import { Member } from '@/types/Member.interface';
import { EditCardModalProps } from '@/types/Modal.interface';
import { formatDateTime } from '@/utils/formatDateTime';

export interface postCardData {
  assigneeUserId: number;
  dashboardId: number;
  columnId: number;
  title: string;
  description: string;
  dueDate: string;
  tags: string[];
  imageUrl: string;
}

const formInitialState = {
  assigneeUserId: 0,
  dashboardId: 0,
  columnId: 0,
  title: '',
  description: '',
  dueDate: '',
  tags: [],
  imageUrl: '',
};

export default function EditCardModal({ columnId, isEdit }: EditCardModalProps) {
  const router = useRouter();
  const { id } = router.query;
  const queryClient = useQueryClient();

  const { openNotificationModal, closeModal } = useModal();

  const [isOpen, setIsOpen] = useState(false);
  const [members, setMembers] = useState<Member[]>([]);
  const [formValues, setFormValues] = useState<postCardData>(formInitialState);
  const [profileImageFile, setProfileImageFile] = useState<File | null>(null);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 현재 대시보드에 해당하는 멤버들 GET
    const getMembers = async () => {
      try {
        const response = await getMembersList(Number(id), 1, 10);
        // 필요한 데이터만 정제
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
    if (id) {
      getMembers();
      // router query와 전달받은 columnId, state에 할당
      setFormValues((prevValues) => ({
        ...prevValues,
        dashboardId: Number(id),
        columnId: Number(columnId),
      }));
    }
  }, [id]);

  // Members Dropdown 바깥 및 input 눌렀을 때 isOpen = false
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        toggleRef.current &&
        !toggleRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // 멤버 선택 핸들러
  const handleSelectMember = (userId: number) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      assigneeUserId: userId,
    }));
    setIsOpen(false);
  };

  // 태그 입력 핸들러
  const handleTagsEnterKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      const value = event.currentTarget.value.trim();
      if (value && !formValues.tags.includes(value) && event.nativeEvent.isComposing === false) {
        setFormValues((prevValues) => ({
          ...prevValues,
          tags: [...prevValues.tags, value],
        }));
        event.currentTarget.value = ''; // 입력 필드를 초기화합니다.
      }
    }
  };

  // 태그 클릭 시 삭제 핸들러
  const handleTagClick = (tag: string) => {
    setFormValues((prevValue) => ({ ...prevValue, tags: prevValue.tags.filter((t) => t !== tag) }));
  };

  // 이미지 수정 핸들러
  const handleImageChange = (image: File) => {
    setProfileImageFile(image);
  };

  // 이미지 삭제 핸들러
  const handleImageDelete = () => {
    setProfileImageFile(null);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      let imgUrl = '';
      // 이미지 존재 시 이미지 POST 요청하여 URL 값 받음
      if (profileImageFile) {
        const response = await postImageForCard((columnId = columnId), { image: profileImageFile });
        imgUrl = response.imageUrl;
      }

      const formValuesToSend = {
        ...formValues,
        imageUrl: imgUrl,
      };

      // 데이터가 할당되지 않은 state는 POST 요청하기 전에 제거
      const filteredFormValues: Partial<postCardData> = {
        ...formValuesToSend,
        assigneeUserId: formValuesToSend.assigneeUserId || undefined,
        imageUrl: formValuesToSend.imageUrl !== '' ? formValuesToSend.imageUrl : undefined,
        dueDate: formValuesToSend.dueDate !== '' ? formValuesToSend.dueDate : undefined,
      };

      await postCard(filteredFormValues as postCardData);
      // resetQueries 수정 필요
      queryClient.resetQueries({ queryKey: ['columns', id] });
      openNotificationModal({
        text: '할 일 카드가 생성되었습니다!',
      });
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const selectedMember = members.find((member) => member.userId === formValues.assigneeUserId);

  return (
    <div className='modal h-[90vh] w-[327px] md:h-[90vh] md:w-[506px]'>
      <div className='flex h-full flex-col'>
        <h2 className='section-title border-b-2 border-gray-d9 pb-4 text-[20px] md:text-[24px]'>
          {isEdit ? '할일 수정' : '할일 생성'}
        </h2>
        <form className='flex h-full flex-col overflow-y-auto pr-5' onSubmit={handleSubmit}>
          <div className='my-[20px]'>
            <label htmlFor='memberSelect' className='label mb-[15px] block text-[16px] md:text-[18px]'>
              담당자
            </label>
            <div className='relative md:w-[217px]'>
              <div
                className='input cursor-pointer text-[14px] md:text-[16px]'
                onClick={() => {
                  setIsOpen(!isOpen);
                }}
                ref={toggleRef}
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
                  className={`absolute right-[20px] top-[18px] md:top-[24px] ${isOpen ? 'rotate-180' : ''}`}
                  src={CARROT_DOWN}
                  alt='메뉴 내리기 버튼'
                />
              </div>
              {isOpen && (
                <div ref={dropdownRef}>
                  <MembersDropDown members={members} onSelectMember={handleSelectMember} />
                </div>
              )}
            </div>
          </div>
          <div className='mb-[20px]'>
            <label htmlFor='title' className='label mb-[15px] block text-[16px] md:text-[18px]'>
              제목 <span className='text-violet'>(필수)*</span>
            </label>
            <input
              className='input text-[14px] md:text-[16px]'
              id='title'
              type='text'
              placeholder='제목을 입력해 주세요'
              value={formValues.title}
              onChange={(e) => {
                setFormValues((prevValues) => ({ ...prevValues, title: e.target.value }));
              }}
            />
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
                setFormValues((prevValues) => ({ ...prevValues, description: e.target.value }));
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
              onChange={(e) => {
                setFormValues((prevValues) => ({
                  ...prevValues,
                  dueDate: e.target.value ? formatDateTime(e.target.value) : '',
                }));
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
        <div className='flex justify-end gap-[10px] border-t-2 border-gray-d9 bg-white pt-[20px]'>
          <ModalCancelButton type='button' onClick={closeModal}>
            취소
          </ModalCancelButton>
          <ModalActionButton
            type='submit'
            onClick={handleSubmit}
            disabled={!(formValues.title.length > 0 && formValues.description.length > 0)}
          >
            {isEdit ? '수정' : '생성'}
          </ModalActionButton>
        </div>
      </div>
    </div>
  );
}
