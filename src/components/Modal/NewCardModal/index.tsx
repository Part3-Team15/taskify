import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import MembersDropDown from './MembersDropDown';

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

  useEffect(() => {
    const getMembers = async () => {
      try {
        const response = await getMembersList(Number(id), 1, 99);
        const filterdMembers = response.data.members.map((member: Member) => ({
          userId: member.userId,
          nickname: member.nickname,
          profileImageUrl: member.profileImageUrl,
        }));
        setMembers(filterdMembers); // AxiosResponse 객체에서 data를 추출하여 상태에 설정
      } catch (error) {
        console.error('Error fetching members:', error);
      }
    };
    if (id) {
      getMembers();
    }
  }, [id]);

  useEffect(() => {
    console.log(members);
  }, [members]);

  const handleSelectMember = (userId: number) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      assigneeUserId: userId,
    }));
    setIsOpen(false); // 드롭다운 닫기
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
              <input
                className='input pointer-events-none text-[14px] md:text-[16px]'
                id='memberSelect'
                type='text'
                value={selectedMember ? selectedMember.nickname : ''}
                placeholder='담당자를 선택해 주세요'
              />
              <button
                className='absolute right-[20px] top-[18px] md:top-[24px]'
                type='button'
                onClick={() => {
                  setIsOpen(!isOpen);
                }}
              >
                <Image src={CARROT_DOWN} alt='메뉴 내리기 버튼' />
              </button>
              {isOpen && <MembersDropDown members={members} onSelectMember={handleSelectMember} />}
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
            ></input>
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
              type='date'
              placeholder='날짜를 입력해 주세요'
            ></input>
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
            ></input>
          </div>
          <div>
            <label htmlFor='card-profile' className='label mb-[15px] block text-[16px] md:text-[18px]'>
              이미지
            </label>
            <div className='size-[58px] md:size-[76px]'>
              <ImageInput name='card-profile' value={''} onChange={() => {}} onDeleteClick={() => {}} />
            </div>
          </div>
          <div className='flex justify-end gap-[10px]'>
            <ModalCancelButton>취소</ModalCancelButton>
            <ModalActionButton>생성</ModalActionButton>
          </div>
        </form>
      </div>
    </div>
  );
}
