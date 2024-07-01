import ModalActionButton from '@/components/Button/ModalActionButton';
import useModal from '@/hooks/useModal';
import { NotificationModalProps } from '@/types/Modal.interface';

export default function NotificationModal({ text, onClick }: NotificationModalProps) {
  const { closeModal } = useModal();
  const handleClick = () => {
    if (onClick) onClick();
    closeModal();
  };

  return (
    <div className='modal modal-basic'>
      <div className='flex size-full flex-col'>
        <p className='align-center grow'>{text}</p>
        <div className='flex justify-center md:justify-end'>
          <ModalActionButton type='button' onClick={handleClick}>
            확인
          </ModalActionButton>
        </div>
      </div>
    </div>
  );
}
