import { useSelector, useDispatch } from 'react-redux';

import DefaultModal from './DefaultModal';
import InviteMemberModal from './InviteMemberModal';
import NewColumnModal from './NewColumnModal';
import NotificationModal from './NotificationModal';

import { modalSelector, closeModal } from '@/store/reducers/modalSlice';

export default function Modal() {
  const dispatch = useDispatch();
  const { type, props = null } = useSelector(modalSelector);

  const handleCloseModal = () => {
    dispatch(closeModal());
  };

  const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (e.target === e.currentTarget) {
      handleCloseModal();
    }
  };

  const notificationTextObj = {
    pwdNotEqual: '비밀번호가 일치하지 않습니다.',
    signupSuccess: '가입이 완료되었습니다!',
    emailExists: '이미 사용 중인 이메일입니다.',
    curPwdNotEqual: '현재 비밀번호가 틀렸습니다.',
  };

  const renderModalContent = () => {
    switch (type) {
      case 'pwdNotEqual':
        return <NotificationModal handleCloseModal={handleCloseModal} notificationText={notificationTextObj[type]} />;
      case 'signupSuccess':
        return <NotificationModal handleCloseModal={handleCloseModal} notificationText={notificationTextObj[type]} />;
      case 'emailExists':
        return <NotificationModal handleCloseModal={handleCloseModal} notificationText={notificationTextObj[type]} />;
      case 'curPwdNotEqual':
        return <NotificationModal handleCloseModal={handleCloseModal} notificationText={notificationTextObj[type]} />;
      case 'newColumn':
        return <NewColumnModal handleCloseModal={handleCloseModal} />;
      case 'inviteMember':
        return <InviteMemberModal handleCloseModal={handleCloseModal} />;
      default:
        return <DefaultModal handleCloseModal={handleCloseModal} />;
    }
  };

  return (
    <>
      {type && (
        <div
          className='fixed left-0 top-0 flex h-screen w-screen items-center justify-center bg-black-17 bg-opacity-[0.3] backdrop-blur-[2px]'
          onClick={handleOutsideClick}
        >
          {renderModalContent()}
        </div>
      )}
    </>
  );
}
