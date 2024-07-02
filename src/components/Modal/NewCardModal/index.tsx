import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState, useRef } from 'react';

import MemberProfile from './MemberProfile';
import MembersDropDown from './MembersDropDown';
import TagsWrapper from './TagsWrapper';

import CARROT_DOWN from '@/../public/icons/carrot-down.svg';
import ModalActionButton from '@/components/Button/ModalActionButton';
import ModalCancelButton from '@/components/Button/ModalCancelButton';
import ImageInput from '@/components/Input/ImageInput';
import { getMembersList } from '@/services/getService';
import { NewCardModalProps } from '@/types/Modal.interface';

interface postCardData {
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

interface Member {
  createdAt: string;
  email: string;
  id: number;
  isOwner: boolean;
  nickname: string;
  profileImageUrl: string | null;
  updatedAt: string;
  userId: number;
}

export default function NewCardModal({ columnId }: NewCardModalProps) {
  const router = useRouter();
  const { id } = router.query;

  const [isOpen, setIsOpen] = useState(false);
  const [members, setMembers] = useState<Member[]>([]);
  const [formValues, setFormValues] = useState<postCardData>(formInitialState);
  const [profileImageFile, setProfileImageFile] = useState<File | null>(null);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const getMembers = async () => {
      try {
        const response = await getMembersList(Number(id), 1, 99);
        const filteredMembers = response.data.members.map((member: Member) => ({
          userId: member.userId,
          nickname: member.nickname,
          profileImageUrl: member.profileImageUrl,
        }));
        setMembers(filteredMembers); // AxiosResponse 객체에서 data를 추출하여 상태에 설정
      } catch (error) {
        console.error('Error fetching members:', error);
      }
    };
    if (id) {
      getMembers();
      setFormValues((prevValues) => ({
        ...prevValues,
        dashboardId: Number(id),
        columnId: Number(columnId),
      }));
    }
  }, [id]);

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

  const handleSelectMember = (userId: number) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      assigneeUserId: userId,
    }));
    setIsOpen(false);
  };

  const handleTagsKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
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

  const handleTagDeleteClick = (tag: string) => {
    setFormValues((prevValue) => ({ ...prevValue, tags: prevValue.tags.filter((t) => t !== tag) }));
  };

  const handleImageChange = (image: File) => {
    setProfileImageFile(image);
  };

  const handleImageDelete = () => {
    setProfileImageFile(null);
  };

  const selectedMember = members.find((member) => member.userId === formValues.assigneeUserId);

  return (
    <div className='modal h-[766px] w-[327px] md:h-[907px] md:w-[506px]'>
      <div className='flex h-full flex-col'>
        <h1 className='section-title shrink-0 pb-4 text-[20px] md:text-[24px]'>할일 생성</h1>
        <form className='flex h-full flex-col justify-between'>
          <div>
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
                  '담당자를 선택해 주세요'
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
          <div>
            <label htmlFor='title' className='label mb-[15px] block text-[16px] md:text-[18px]'>
              제목 <span className='text-violet'>*</span>
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
          <div>
            <label htmlFor='description' className='label mb-[15px] block text-[16px] md:text-[18px]'>
              설명 <span className='text-violet'>*</span>
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
          <div>
            <label htmlFor='dueDate' className='label mb-[15px] block text-[16px] md:text-[18px]'>
              마감일
            </label>
            <input
              className='input text-[14px] md:text-[16px]'
              id='dueDate'
              type='datetime-local'
              placeholder='날짜를 입력해 주세요'
              onChange={(e) => {
                setFormValues((prevValues) => ({ ...prevValues, dueDate: e.target.value }));
              }}
            />
          </div>
          <div>
            <label htmlFor='tags' className='label mb-[15px] block text-[16px] md:text-[18px]'>
              태그
            </label>
            <input
              className='input text-[14px] md:text-[16px]'
              id='tags'
              type='text'
              placeholder='입력 후 Enter'
              onKeyDown={handleTagsKeyDown}
            />
            <TagsWrapper tags={formValues.tags} onTagClick={handleTagDeleteClick} />
          </div>
          <div>
            <label htmlFor='card-profile' className='label mb-[15px] block text-[16px] md:text-[18px]'>
              이미지
            </label>
            <div className='size-[58px] md:size-[76px]'>
              <ImageInput
                name='card-profile'
                value={formValues.imageUrl || null}
                onChange={handleImageChange}
                onDeleteClick={handleImageDelete}
              />
            </div>
          </div>
          <div className='flex justify-end gap-[10px]'>
            <ModalCancelButton type='button'>취소</ModalCancelButton>
            <ModalActionButton>생성</ModalActionButton>
          </div>
        </form>
      </div>
    </div>
  );
}
