import { useDispatch } from 'react-redux';

import { openModal, closeModal } from '@/store/reducers/modalSlice';
import {
  MODAL,
  NotificationModalProps,
  ConfirmModalProps,
  NewColumnModalProps,
  ModifyColumnModalProps,
  EditCardModalProps,
  TodoCardModalProps,
} from '@/types/Modal.interface';

// NOTE: 쉽게 모달을 관리할 수 있도록 돕는 훅
const useModal = () => {
  const dispatch = useDispatch();

  // NOTE: open{...}Modal 함수에 정해진 타입의 인자를 넣어 각 모달을 열 수 있도록 함
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
  const openTodoCardModal = (modalProps: TodoCardModalProps) => {
    dispatch(openModal({ type: MODAL.TODO_CARD, modalProps }));
  };
  const openEditCardModal = (modalProps: EditCardModalProps) => {
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
    openTodoCardModal,
    closeModal: handleCloseModal,
    openEditCardModal,
  };
};

export default useModal;
