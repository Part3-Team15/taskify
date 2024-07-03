import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import ConfirmModal from './ConfirmModal';
import EditCardModal from './EditCardModal';
import InviteMemberModal from './InviteMemberModal';
import ModifyColumnModal from './ModifyColumnModal';
import NewColumnModal from './NewColumnModal';
import NewDashboardModal from './NewDashboardModal';
import NotificationModal from './NotificationModal';

import useModal from '@/hooks/useModal';
import { modalSelector } from '@/store/reducers/modalSlice';
import {
  ModifyColumnModalProps,
  ConfirmModalProps,
  NewColumnModalProps,
  NotificationModalProps,
  MODAL,
  EditCardModalProps,
} from '@/types/Modal.interface';

export default function Modal() {
  const { closeModal } = useModal();
  const { type, modalProps } = useSelector(modalSelector);

  // 모달이 열릴 때, overflow-hidden으로 스크롤 동작 방지
  useEffect(() => {
    if (type) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [type]);

  // 바깥을 눌렀을 때 모달이 닫힘
  const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  // 전달받은 type에 따라 모달의 내부 컨텐트를 다르게 렌더
  const renderModalContent = () => {
    switch (type) {
      // NOTE: useModal 에서 open 함수가 각 모달에 맞는 타입의 modalProps 받음
      case MODAL.NOTIFICATION:
        return <NotificationModal {...(modalProps as NotificationModalProps)} />;

      case MODAL.CONFIRM:
        return <ConfirmModal {...(modalProps as ConfirmModalProps)} />;

      case MODAL.NEW_DASHBOARD:
        return <NewDashboardModal />;

      case MODAL.NEW_COLUMN:
        return <NewColumnModal {...(modalProps as NewColumnModalProps)} />;

      case MODAL.INVITE_MEMBER:
        return <InviteMemberModal />;

      case MODAL.MODIFY_COLUMN:
        return <ModifyColumnModal {...(modalProps as ModifyColumnModalProps)} />;

      case MODAL.EDIT_CARD:
        return modalProps ? <EditCardModal {...(modalProps as EditCardModalProps)} /> : null;

      default:
        return <NotificationModal text='' />;
    }
  };

  return (
    <>
      {/* 타입이 존재할 때만 모달이 열림 */}
      {type && (
        <div
          className='fixed inset-0 z-50 flex items-center justify-center bg-black-17 bg-opacity-[0.3] backdrop-blur-[2px]'
          onClick={handleOutsideClick}
        >
          {renderModalContent()}
        </div>
      )}
    </>
  );
}
