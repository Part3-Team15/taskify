import Image from 'next/image';

import ActionButton from '@/components/Button/ActionButton';
import CancelButton from '@/components/Button/CancelButton';
import { Invitation } from '@/types/Invitation.interface';

interface InvitationListProps {
  invitations: Invitation[];
  handleAcceptInvitation: (invitationId: number, inviteAccepted: boolean) => void;
}

export default function InvitationItemList({ invitations, handleAcceptInvitation }: InvitationListProps) {
  return (
    <div className='h-[calc(100%-170px)] pt-6'>
      <div className='grid grid-cols-3 pb-6 pl-7'>
        <p>이름</p>
        <p>초대자</p>
        <p className='w-44'>수락 여부</p>
      </div>
      {invitations.length === 0 && (
        <div className='flex h-full flex-col items-center justify-center'>
          <div className='relative size-[60px] md:size-[100px]'>
            <Image src={'/icons/invitations.svg'} alt='invitations' fill />
          </div>
          <p className='px-7 py-5 text-gray-78'>검색 결과가 없습니다.</p>
        </div>
      )}
      <ul className='h-full overflow-y-scroll'>
        {invitations.map((invitation: Invitation) => (
          <li key={invitation.id} className='grid h-16 grid-cols-3 border-b border-gray-ee pl-7'>
            <p className='flex items-center'>{invitation.dashboard.title}</p>
            <p className='flex min-w-28 items-center'>{invitation.inviter.nickname}</p>
            <div className='flex items-center gap-[10px]'>
              <ActionButton onClick={() => handleAcceptInvitation(invitation.id, true)}>수락</ActionButton>
              <CancelButton onClick={() => handleAcceptInvitation(invitation.id, false)}>거절</CancelButton>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
