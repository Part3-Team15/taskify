import ModalActionButton from '../Button/ModalActionButton';
import ModalCancelButton from '../Button/ModalCancelButton';

import useModal from '@/hooks/useModal';
import { ConfirmModalProps } from '@/types/Modal.interface';

// NOTE: Delete 등 액션 이전 확인이 필요한 경우, 빨간 버튼과 함께 확인할 때 쓰는 모달
export default function ConfirmModal({ text, onActionClick }: ConfirmModalProps) {
  const { closeModal } = useModal();
  const handleActionClick = () => {
    onActionClick();
    closeModal();
  };

  return (
    <div className='modal modal-basic'>
      <div className='flex size-full flex-col'>
        <p className='align-center grow whitespace-pre-wrap text-center'>{text}</p>
        <div className='flex justify-between gap-3 md:justify-end'>
          <ModalCancelButton type='button' onClick={closeModal}>
            취소
          </ModalCancelButton>
          <ModalActionButton type='button' className='btn-red' onClick={handleActionClick}>
            삭제
          </ModalActionButton>
        </div>
      </div>
    </div>
  );
}
