import { useDispatch } from 'react-redux';

import { openModal, closeModal } from '@/store/reducers/modalSlice';
import { ModalActionState } from '@/types/Modal.interface';

const useModal = () => {
  const dispatch = useDispatch();

  const handleOpenModal = ({ type, modalProps }: ModalActionState) => {
    dispatch(openModal({ type, modalProps }));
  };

  const handleCloseModal = () => {
    dispatch(closeModal());
  };

  return { openModal: handleOpenModal, closeModal: handleCloseModal };
};

export default useModal;
