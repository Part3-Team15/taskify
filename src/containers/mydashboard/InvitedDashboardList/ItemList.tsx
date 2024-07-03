import Image from 'next/image';

import ActionButton from '@/components/Button/ActionButton';
import CancelButton from '@/components/Button/CancelButton';
import { Invitation } from '@/types/Invitation.interface';

interface InvitationListProps {
  invitations: Invitation[];
  handleAcceptInvitation: (invitationId: number, inviteAccepted: boolean) => void;
  observerRef: React.RefObject<HTMLDivElement>;
}

export default function InvitationItemList({ invitations, handleAcceptInvitation, observerRef }: InvitationListProps) {
  return (
    <div className='h-[calc(100%-130px)] pt-6 md:h-[calc(100%-170px)]'>
      <div className='hidden grid-cols-3 pb-6 pl-7 text-gray-9f md:grid md:pr-7'>
        <p>이름</p>
        <p>초대자</p>
        <p className='w-44'>수락 여부</p>
      </div>
      {invitations.length === 0 ? (
        <div className='flex flex-col items-center justify-center py-[100px]'>
          <div className='relative size-[60px] md:size-[100px]'>
            <Image src={'/icons/invitations.svg'} alt='invitations' fill />
          </div>
          <p className='px-7 py-5 text-gray-78'>검색 결과가 없습니다.</p>
        </div>
      ) : (
        <ul className='h-full overflow-y-auto'>
          {invitations.map((invitation: Invitation) => (
            <li
              key={invitation.id}
              className='grid h-max grid-cols-1 gap-[10px] border-b border-gray-ee p-4 text-sm text-black-33 md:h-16 md:grid-cols-3 md:gap-0 md:px-7 md:py-0 md:text-base'
            >
              <div className='grid grid-cols-3 items-center md:flex'>
                <p className='flex items-center md:hidden'>이름</p>
                <p className='col-span-2 flex items-center'>{invitation.dashboard.title}</p>
              </div>
              <div className='grid grid-cols-3 items-center md:flex'>
                <p className='flex items-center md:hidden'>초대자</p>
                <p className='col-span-2 flex items-center md:min-w-28'>{invitation.inviter.nickname}</p>
              </div>
              <div className='flex items-center gap-[10px]'>
                <ActionButton
                  onClick={() => handleAcceptInvitation(invitation.id, true)}
                  className='w-[84px] grow lg:grow-0'
                >
                  수락
                </ActionButton>
                <CancelButton
                  onClick={() => handleAcceptInvitation(invitation.id, false)}
                  className='w-[84px] grow lg:grow-0'
                >
                  거절
                </CancelButton>
              </div>
            </li>
          ))}
          <div ref={observerRef} className='h-1' />
        </ul>
      )}
    </div>
  );
}
