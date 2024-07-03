import { useQueryClient } from '@tanstack/react-query';
import { debounce } from 'lodash';
import Image from 'next/image';
import { useState, useEffect, useCallback, useRef } from 'react';

import InvitationItemList from './ItemList';
import SearchBar from './SearchBar';
import Skeleton from './Skeleton';

import useFetchData from '@/hooks/useFetchData';
import { getInvitationsList } from '@/services/getService';
import { putAcceptInvitation } from '@/services/putService';
import { Invitation, InvitationsResponse } from '@/types/Invitation.interface';

export default function InvitedDashboardList() {
  const [invitations, setInvitations] = useState<Invitation[]>([]);
  const [isFetchingNextPage, setIsFetchingNextPage] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const observerRef = useRef<HTMLDivElement | null>(null);
  const [cursorId, setCursorId] = useState<number>(0);

  const queryClient = useQueryClient();

  const { data, error, isLoading } = useFetchData<InvitationsResponse>(['invitations'], () => getInvitationsList());

  useEffect(() => {
    if (data) {
      setInvitations(data.invitations);
      setCursorId(data.cursorId ? data.cursorId : 0);
    }
  }, [data]);

  const handleMoreInvitations = async (currentCursorId: number) => {
    if (currentCursorId !== 0) {
      try {
        setIsFetchingNextPage(true);
        const { data: nextData } = await getInvitationsList(10, currentCursorId);

        if (nextData.invitations.length > 0) {
          setInvitations((prevInvitations) => [...prevInvitations, ...nextData.invitations]);
        }
        setCursorId(nextData.cursorId || 0);
      } catch (err) {
        console.error('데이터를 가져오는 중 오류가 발생했습니다:', err);
      } finally {
        setIsFetchingNextPage(false);
      }
    }
  };

  const handleObserver = useCallback(
    async (entries: IntersectionObserverEntry[]) => {
      const target = entries[0];

      if (target.isIntersecting && !isFetchingNextPage && cursorId && !isSearching) {
        handleMoreInvitations(cursorId);
      }
    },
    [cursorId, isFetchingNextPage, isSearching],
  );

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, {
      threshold: 0.8,
    });

    const currentObserverRef = observerRef.current;

    if (currentObserverRef) {
      observer.observe(currentObserverRef);
    }

    return () => {
      if (currentObserverRef) {
        observer.unobserve(currentObserverRef);
      }
    };
  }, [observerRef, handleObserver]);

  const handleAcceptInvitation = async (invitationId: number, inviteAccepted: boolean) => {
    try {
      await putAcceptInvitation(invitationId, inviteAccepted);
      setInvitations((prevInvitations) => prevInvitations.filter((invitation) => invitation.id !== invitationId));
      queryClient.invalidateQueries({ queryKey: ['dashboards'] });
      queryClient.invalidateQueries({ queryKey: ['sideDashboards'] });
    } catch (err) {
      console.error('초대 업데이트 중 오류 발생:', err);
    }
  };

  const handleChangeSearch = debounce(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value;
    setIsSearching(!!searchValue);

    try {
      const { data: searchData } = await getInvitationsList(10, 0, searchValue);
      setInvitations(searchData.invitations);
    } catch (err) {
      console.error('데이터를 가져오는 중 오류가 발생했습니다:', err);
    }
  }, 300);

  if (error) {
    return (
      <section className='h-[400px] max-w-[350px] rounded-lg border-0 bg-white md:max-w-full lg:max-w-screen-lg'>
        <p className='px-7 pb-5 pt-8 text-base font-bold text-black-33'>초대받은 대시보드</p>
        <div className='flex items-center justify-center'>
          <p>데이터를 가져오는 중 오류가 발생했습니다.</p>
          <p>{error.message}</p>
        </div>
      </section>
    );
  }

  return (
    <section className='h-[400px] max-w-[350px] rounded-lg border-0 bg-white md:max-h-[740px] md:min-h-[530px] md:max-w-full lg:max-w-screen-lg'>
      <p className='px-7 pb-5 pt-8 text-base font-bold text-black-33'>초대받은 대시보드</p>
      {isLoading ? (
        <Skeleton />
      ) : (
        <>
          {invitations.length > 0 || isSearching ? (
            <>
              <SearchBar handleChangeSearch={handleChangeSearch} />
              <InvitationItemList
                invitations={invitations}
                handleAcceptInvitation={handleAcceptInvitation}
                observerRef={observerRef}
              />
            </>
          ) : (
            <div className='flex flex-col items-center justify-center py-[100px]'>
              <div className='relative size-[60px] md:size-[150px]'>
                <Image src={'/icons/invitations.svg'} alt='invitations' fill />
              </div>
              <p className='px-7 py-5 text-sm text-gray-78 md:text-base'>초대된 대시보드가 없습니다.</p>
            </div>
          )}
        </>
      )}
    </section>
  );
}
