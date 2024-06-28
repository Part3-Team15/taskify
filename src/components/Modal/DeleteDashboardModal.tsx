import { MouseEventHandler } from 'react';

import ModalActionButton from '@/components/Button/ModalActionButton';
import ModalCancelButton from '@/components/Button/ModalCancelButton';
import useModal from '@/hooks/useModal';
import { deleteDashboard } from '@/services/deleteService';
import { DeleteDashboardModalProps } from '@/types/Modal.interface';

export default function DeleteDashboardModal({
  handleCloseModal,
  modalProps,
}: {
  handleCloseModal: MouseEventHandler<HTMLButtonElement>;
  modalProps: DeleteDashboardModalProps;
}) {
  const { closeModal } = useModal();
  const handleDeleteButton = async () => {
    try {
      deleteDashboard(modalProps.dashboardId);
      closeModal();
    } catch (e) {
      alert(e);
    }
  };

  return (
    <div className='flex h-[220px] w-[327px] flex-col justify-between rounded-[8px] bg-white px-[18px] py-[32px] md:h-[250px] md:w-[540px]'>
      <div className='flex size-full items-center justify-center'>
        <h1 className='mt-[10px] text-[16px] font-medium text-black-33 md:text-[18px]'>
          대시보드가 삭제됩니다. 정말 삭제하시겠습니까?
        </h1>
      </div>
      <div className='flex justify-between md:justify-end md:gap-[15px]'>
        <ModalCancelButton onClick={handleCloseModal}>취소</ModalCancelButton>
        <ModalActionButton className='bg-red hover:bg-red-hover' onClick={handleDeleteButton}>
          삭제
        </ModalActionButton>
      </div>
    </div>
  );
}
