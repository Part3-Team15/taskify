import { useDispatch } from 'react-redux';

import { openModal, closeModal } from '@/store/reducers/modalSlice';
import {
  MODAL,
  NotificationModalProps,
  ConfirmModalProps,
  NewColumnModalProps,
  ModifyColumnModalProps,
  EditCardModalProps,
} from '@/types/Modal.interface';

const useModal = () => {
  const dispatch = useDispatch();

  const openNotificationModal = (modalProps: NotificationModalProps) => {
    dispatch(openModal({ type: MODAL.NOTIFICATION, modalProps }));
  };
  const openConfirmModal = (modalProps: ConfirmModalProps) => {
    dispatch(openModal({ type: MODAL.CONFIRM, modalProps }));
  };
  const openNewDashboardModal = () => {
    dispatch(openModal({ type: MODAL.NEW_DASHBOARD, modalProps: {} }));
  };
  const openNewColumnModal = (modalProps: NewColumnModalProps) => {
    dispatch(openModal({ type: MODAL.NEW_COLUMN, modalProps }));
  };
  const openInviteMemberModal = () => {
    dispatch(openModal({ type: MODAL.INVITE_MEMBER, modalProps: {} }));
  };
  const openModifyColumnModal = (modalProps: ModifyColumnModalProps) => {
    dispatch(openModal({ type: MODAL.MODIFY_COLUMN, modalProps }));
  };

  const openNewCardModal = (modalProps: EditCardModalProps) => {
    dispatch(openModal({ type: MODAL.EDIT_CARD, modalProps }));
  };
  const handleCloseModal = () => {
    dispatch(closeModal());
  };

  return {
    openNotificationModal,
    openConfirmModal,
    openNewDashboardModal,
    openNewColumnModal,
    openInviteMemberModal,
    openModifyColumnModal,
    closeModal: handleCloseModal,
    openNewCardModal,
  };
};

export default useModal;
