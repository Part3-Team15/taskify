import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import ConfirmModal from './ConfirmModal';
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
  InviteMemberModalProps,
  NewColumnModalProps,
  NotificationModalProps,
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
      case 'notification':
        return modalProps ? <NotificationModal {...(modalProps as NotificationModalProps)} /> : null;

      case 'confirm':
        return modalProps ? <ConfirmModal {...(modalProps as ConfirmModalProps)} /> : null;

      case 'newDashboard':
        return <NewDashboardModal />;

      case 'newColumn':
        return modalProps ? <NewColumnModal {...(modalProps as NewColumnModalProps)} /> : null;

      case 'inviteMember':
        return modalProps ? <InviteMemberModal modalProps={modalProps as InviteMemberModalProps} /> : null;

      case 'modifyColumn':
        return modalProps ? <ModifyColumnModal {...(modalProps as ModifyColumnModalProps)} /> : null;

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
