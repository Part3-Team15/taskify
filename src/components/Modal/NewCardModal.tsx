import ModalActionButton from '@/components/Button/ModalActionButton';
import ModalCancelButton from '@/components/Button/ModalCancelButton';
import ImageInput from '@/components/Input/ImageInput';
import { NewCardModalProps } from '@/types/Modal.interface';

export default function NewCardModal({ columnId }: NewCardModalProps) {
  return (
    <div className='modal h-[766px] w-[327px] md:h-[907px] md:w-[506px]'>
      <div className='flex h-full flex-col'>
        <h1 className='section-title shrink-0 pb-4 text-[20px] md:text-[24px]'>할일 생성</h1>
        <form className='flex h-full flex-col justify-between'>
          <div>
            <label htmlFor='memberSelect' className='label mb-[15px] block text-[16px] md:text-[18px]'>
              담당자
            </label>
            <div>
              <input
                className='input text-[14px] md:text-[16px]'
                id='memberSelect'
                type='text'
                placeholder='이름을 입력해 주세요'
              />
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
