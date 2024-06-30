import ModalCancelButton from '@/components/Button/ModalCancelButton';
import useModal from '@/hooks/useModal';

export default function DefaultModal() {
  const { closeModal } = useModal();

  return (
    <div className='flex flex-col rounded-[8px] bg-white px-[28px] py-[32px]'>
      <h1>DEFAULT MODAL</h1>
      <ModalCancelButton onClick={closeModal}>취소</ModalCancelButton>
    </div>
  );
}
