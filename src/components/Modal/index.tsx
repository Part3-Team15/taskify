import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import ColumnDeleteModal from './ColumnDeleteModal';
import ColumnModifyModal from './ColumnModifyModal';
import DefaultModal from './DefaultModal';
import DeleteDashboardModal from './DeleteDashboardModal';
import InviteMemberModal from './InviteMemberModal';
import NewColumnModal from './NewColumnModal';
import NewDashboardModal from './NewDashboardModal';
import NotificationModal from './NotificationModal';

import { NOTIFICATION_TEXT_OBJ } from '@/constants';
import { modalSelector, closeModal } from '@/store/reducers/modalSlice';
import {
  ColumnDeleteModalProps,
  ColumnModifyModalProps,
  DeleteDashboardModalProps,
  InviteMemberModalProps,
  NewColumnModalProps,
} from '@/types/Modal.interface';

export default function Modal() {
  const dispatch = useDispatch();
  const { type, modalProps } = useSelector(modalSelector);

  useEffect(() => {
    if (type) {
      // 모달이 열렸을 때 body의 overflow를 hidden으로 설정
      document.body.style.overflow = 'hidden';
    } else {
      // 모달이 닫힐 때 body의 overflow를 auto로 설정
      document.body.style.overflow = 'auto';
    }

    // cleanup 함수로 모달이 닫힐 때 overflow를 auto로 설정
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [type]);

  const handleCloseModal = () => {
    dispatch(closeModal());
  };

  const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (e.target === e.currentTarget) {
      handleCloseModal();
    }
  };

  const renderModalContent = () => {
    switch (type) {
      case 'pwdNotEqual':
      case 'signupSuccess':
      case 'emailExists':
      case 'curPwdNotEqual':
      case 'newDashboardSuccess':
      case 'newDashboardFailed':
      case 'newColumnSuccess':
      case 'newColumnFailed':
      case 'inviteMemberSuccess':
      case 'inviteMemberFailed':
      case 'columnModifySuccess':
      case 'columnModifyFailed':
        return <NotificationModal handleCloseModal={handleCloseModal} notificationText={NOTIFICATION_TEXT_OBJ[type]} />;
      case 'newDashboard':
        return <NewDashboardModal handleCloseModal={handleCloseModal} />;
      case 'deleteDashboard':
        return (
          <DeleteDashboardModal
            handleCloseModal={handleCloseModal}
            modalProps={modalProps as DeleteDashboardModalProps}
          />
        );
      case 'columnDeleteConfirm':
        return modalProps ? (
          <ColumnDeleteModal handleCloseModal={handleCloseModal} modalProps={modalProps as ColumnDeleteModalProps} />
        ) : null;
      case 'newColumn':
        return modalProps ? (
          <NewColumnModal handleCloseModal={handleCloseModal} modalProps={modalProps as NewColumnModalProps} />
        ) : null;
      case 'inviteMember':
        return modalProps ? (
          <InviteMemberModal handleCloseModal={handleCloseModal} modalProps={modalProps as InviteMemberModalProps} />
        ) : null;
      case 'columnModify':
        return modalProps ? (
          <ColumnModifyModal handleCloseModal={handleCloseModal} modalProps={modalProps as ColumnModifyModalProps} />
        ) : null;
      default:
        return <DefaultModal handleCloseModal={handleCloseModal} />;
    }
  };

  return (
    <>
      {type && (
        <div
          className='fixed inset-0 flex items-center justify-center bg-black-17 bg-opacity-[0.3] backdrop-blur-[2px]'
          onClick={handleOutsideClick}
        >
          {renderModalContent()}
        </div>
      )}
    </>
  );
}
