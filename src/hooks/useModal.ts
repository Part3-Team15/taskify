import { useDispatch } from 'react-redux';

import { openModal, closeModal, ModalState } from '@/store/reducers/modalSlice';

const useModal = () => {
  const dispatch = useDispatch();

  const handleOpenModal = ({ type, props }: ModalState) => {
    dispatch(openModal({ type, props }));
  };

  const handleCloseModal = () => {
    dispatch(closeModal());
  };

  return { openModal: handleOpenModal, closeModal: handleCloseModal };
};

export default useModal;
