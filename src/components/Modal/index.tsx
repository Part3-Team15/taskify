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

  const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };
  const renderModalContent = () => {
    switch (type) {
      case 'textModal':
        return modalProps ? <TextModal modalProps={modalProps as TextModalProps} /> : null;
      case 'newDashboard':
        return <NewDashboardModal />;
      case 'deleteDashboard':
        return <DeleteDashboardModal modalProps={modalProps as DeleteDashboardModalProps} />;
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
      case 'signupSuccess':
        return <SignUpSuccessModal />;
      default:
        return <DefaultModal />;
    }
  };

  return (
    <>
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
