import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import ColumnDeleteModal from './ColumnDeleteModal';
import ColumnModifyModal from './ColumnModifyModal';
import DefaultModal from './DefaultModal';
import DeleteDashboardModal from './DeleteDashboardModal';
import EmailExistModal from './EmailExistModal';
import InviteMemberModal from './InviteMemberModal';
import NewColumnModal from './NewColumnModal';
import NewDashboardModal from './NewDashboardModal';
import SignUpSuccessModal from './SignupSuccessModal';
import TextModal from './TextModal';

import useModal from '@/hooks/useModal';
import { modalSelector } from '@/store/reducers/modalSlice';
import {
  ColumnDeleteModalProps,
  ColumnModifyModalProps,
  DeleteDashboardModalProps,
  EmailExistModalProps,
  InviteMemberModalProps,
  NewColumnModalProps,
  TextModalProps,
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
      case 'newDashboard':
        return <NewDashboardModal />;

      case 'signupSuccess':
        return <SignUpSuccessModal />;

      case 'textModal':
        return modalProps ? <TextModal modalProps={modalProps as TextModalProps} /> : null;

      case 'deleteDashboard':
        return modalProps ? <DeleteDashboardModal modalProps={modalProps as DeleteDashboardModalProps} /> : null;

      case 'columnDeleteConfirm':
        return modalProps ? <ColumnDeleteModal modalProps={modalProps as ColumnDeleteModalProps} /> : null;

      case 'newColumn':
        return modalProps ? <NewColumnModal modalProps={modalProps as NewColumnModalProps} /> : null;

      case 'inviteMember':
        return modalProps ? <InviteMemberModal modalProps={modalProps as InviteMemberModalProps} /> : null;

      case 'columnModify':
        return modalProps ? <ColumnModifyModal modalProps={modalProps as ColumnModifyModalProps} /> : null;

      case 'emailExists':
        return modalProps ? <EmailExistModal modalProps={modalProps as EmailExistModalProps} /> : null;

      default:
        return <DefaultModal />;
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
