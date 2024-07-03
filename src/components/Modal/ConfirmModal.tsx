import ModalActionButton from '../Button/ModalActionButton';
import ModalCancelButton from '../Button/ModalCancelButton';

import useModal from '@/hooks/useModal';
import { ConfirmModalProps } from '@/types/Modal.interface';

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
