import ModalActionButton from '@/components/Button/ModalActionButton';
import ModalCancelButton from '@/components/Button/ModalCancelButton';
import useModal from '@/hooks/useModal';
import { deleteColumn } from '@/services/deleteService';
import { ColumnDeleteModalProps } from '@/types/Modal.interface';

export default function ColumnDeleteModal({ modalProps }: { modalProps: ColumnDeleteModalProps }) {
  const { closeModal } = useModal();
  const handleDeleteButton = async () => {
    try {
      deleteColumn(modalProps.columnId);
      closeModal();
    } catch (e) {
      alert(e);
    }
  };

  return (
    <div className='flex h-[220px] w-[327px] flex-col justify-between rounded-[8px] bg-white px-[18px] py-[32px] md:h-[250px] md:w-[540px]'>
      <div className='flex size-full items-center justify-center'>
        <h1 className='mt-[10px] text-[16px] font-medium text-black-33 md:text-[18px]'>
          컬럼의 모든 카드가 삭제됩니다.
        </h1>
      </div>
      <div className='flex justify-between md:justify-end md:gap-[15px]'>
        <ModalCancelButton onClick={closeModal}>취소</ModalCancelButton>
        <ModalActionButton className='bg-red hover:bg-red-hover' onClick={handleDeleteButton}>
          삭제
        </ModalActionButton>
      </div>
    </div>
  );
}
