import ActionButton from '@/components/Button/ActionButton';
import CancelButton from '@/components/Button/CancelButton';
import Image from 'next/image';
import useFetchData from '@/hooks/useFetchData';
import { getInvitationsList } from '@/services/getService';

import { Invitation, InvitationsResponse } from '@/types/Invitation.interface';
import { putAcceptInvitation } from '@/services/putService';

export default function InvitedDashboardList() {
  const { data, error, isLoading } = useFetchData<InvitationsResponse>('invitations', () => getInvitationsList());

  const handleAcceptInvitation = async (invitationId: number, inviteAccepted: boolean) => {
    try {
      await putAcceptInvitation(invitationId, inviteAccepted);
    } catch (error) {
      console.error('Error updating invitation:', error);
    }
  };

  if (isLoading) {
    return (
      <div className='h-full max-w-screen-lg overflow-hidden rounded-lg border-0 bg-white'>
        <p className='px-7 pb-5 pt-8 text-base font-bold text-black-33'>초대받은 대시보드</p>
        <div className='flex items-center justify-center'>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='h-full max-w-screen-lg overflow-hidden rounded-lg border-0 bg-white'>
        <p className='px-7 pb-5 pt-8 text-base font-bold text-black-33'>초대받은 대시보드</p>
        <div className='flex items-center justify-center'>
          <p>Error fetching data</p>
          <p>{error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className='h-full min-h-80 max-w-screen-lg overflow-hidden rounded-lg border-0 bg-white'>
      <p className='px-7 pb-5 pt-8 text-base font-bold text-black-33'>초대받은 대시보드</p>
      {data && data.invitations.length > 0 ? (
        <>
          <div className='relative px-7'>
            <div className='absolute left-11 top-2 h-[24px] w-[24px]'>
              <Image src={'/icons/search.svg'} alt='search' fill />
            </div>
            <input
              placeholder='검색'
              className='h-full w-full rounded-md border border-gray-d9 bg-white py-[8px] pl-12 pr-4'
            />
          </div>

          <div className='h-[calc(100%-170px)] pt-6'>
            <div className='grid grid-cols-3 pb-6 pl-7'>
              <p>이름</p>
              <p>초대자</p>
              <p className='w-44'>수락 여부</p>
            </div>

            <ul className='h-full overflow-y-scroll'>
              {data.invitations.map((invitation: Invitation) => (
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
        </>
      ) : (
        <div className='flex h-full flex-col items-center justify-center'>
          <div className='relative h-[60px] w-[60px] md:h-[100px] md:w-[100px]'>
            <Image src={'/icons/invitations.svg'} alt='invitations' fill />
          </div>
          <p className='px-7 py-5 text-gray-78'>초대된 대시보드가 없습니다.</p>
        </div>
      )}
    </div>
  );
}
