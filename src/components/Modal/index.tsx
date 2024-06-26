import { useSelector, useDispatch } from 'react-redux';

import DefaultModal from './DefaultModal';
import InviteMemberModal from './InviteMemberModal';
import NewColumnModal from './NewColumnModal';

import { modalSelector, closeModal } from '@/store/reducers/modalSlice';

export default function Modal() {
  const dispatch = useDispatch();
  const { type, props } = useSelector(modalSelector);

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
