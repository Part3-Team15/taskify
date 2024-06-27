import { debounce } from 'lodash';
import Image from 'next/image';
import { useState, useEffect, useCallback } from 'react';

import InvitationItemList from './InvitationItem';
import SearchBar from './InvitationSearch';

import useFetchData from '@/hooks/useFetchData';
import { getInvitationsList } from '@/services/getService';
import { putAcceptInvitation } from '@/services/putService';
import { Invitation, InvitationsResponse } from '@/types/Invitation.interface';

export default function InvitedDashboardList() {
  const { data, error, isLoading } = useFetchData<InvitationsResponse>('invitations', () => getInvitationsList());
  const [invitations, setInvitations] = useState<Invitation[]>([]);

  useEffect(() => {
    if (data) {
      setInvitations(data.invitations);
    }
  }, [data]);

  const handleAcceptInvitation = async (invitationId: number, inviteAccepted: boolean) => {
    try {
      await putAcceptInvitation(invitationId, inviteAccepted);
      setInvitations((prevInvitations) => prevInvitations.filter((invitation) => invitation.id !== invitationId));
    } catch (err) {
      console.error('Error updating invitation:', err);
    }
  };

  const handleChangeSearch = useCallback(
    debounce((e: React.ChangeEvent<HTMLInputElement>) => {
      if (!data) return;
      const searchValue = e.target.value;

      if (searchValue) {
        const filteredInvitations = data.invitations.filter((invitation) =>
          invitation.dashboard.title.toLowerCase().includes(searchValue.toLowerCase()),
        );
        setInvitations(filteredInvitations);
      } else {
        setInvitations(data.invitations);
      }
    }, 300),
    [data],
  );

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
    <section className='h-full min-h-80 overflow-hidden rounded-lg border-0 bg-white'>
      <p className='px-7 pb-5 pt-8 text-base font-bold text-black-33'>초대받은 대시보드</p>
      {data?.invitations && data.invitations.length > 0 ? (
        <>
          <SearchBar handleChangeSearch={handleChangeSearch} />
          <InvitationItemList invitations={invitations} handleAcceptInvitation={handleAcceptInvitation} />
        </>
      ) : (
        <div className='flex h-full flex-col items-center justify-center'>
          <div className='relative size-[60px] md:size-[100px]'>
            <Image src={'/icons/invitations.svg'} alt='invitations' fill />
          </div>
          <p className='px-7 py-5 text-gray-78'>초대된 대시보드가 없습니다.</p>
        </div>
      )}
    </section>
  );
}
