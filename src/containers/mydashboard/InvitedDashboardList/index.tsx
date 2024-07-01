import { useQueryClient } from '@tanstack/react-query';
import { debounce } from 'lodash';
import Image from 'next/image';
import { useState, useEffect, useCallback, useRef } from 'react';

import InvitationItemList from './ItemList';
import SearchBar from './SearchBar';

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
      <section className='max-h-[calc(100vh-610px)] min-h-[580px] grow overflow-hidden rounded-lg border-0 bg-white md:max-h-[calc(100vh-390px)]'>
        <p className='px-7 pb-5 pt-8 text-base font-bold text-black-33'>초대받은 대시보드</p>
        <div className='flex items-center justify-center'>
          <p>데이터를 가져오는 중 오류가 발생했습니다.</p>
          <p>{error.message}</p>
        </div>
      </section>
    );
  }

  return (
    <section className='h-dvh max-h-[calc(100vh-590px)] min-h-[400px] grow overflow-hidden rounded-lg border-0 bg-white md:max-h-[calc(100dvh-465px)] lg:max-h-[calc(100dvh-410px)]'>
      <p className='px-7 pb-5 pt-8 text-base font-bold text-black-33'>초대받은 대시보드</p>
      {isLoading ? (
        <div className='flex animate-pulse flex-col'>
          <div className='px-7'>
            <div className='size-full h-[40px] rounded-md bg-gray-fa py-[8px] pl-12 pr-4' />
          </div>
          <div className='h-[calc(100%-130px)] pt-6 md:h-[calc(100%-170px)]'>
            <div className='hidden h-[48px] grid-cols-9 pb-6 pl-7 md:grid md:pr-7'>
              {[...Array(3)].map((_, i) => (
                <>
                  <div key={i} className='h-[24px] rounded-md bg-gray-fa'></div>
                  <div key={i} className='h-[24px]'></div>
                </>
              ))}
            </div>

            <div className='h-full overflow-y-hidden'>
              {[...Array(5)].map((_, i) => (
                <div key={i} className='hidden h-[48px] grid-cols-6 pb-6 pl-7 md:grid md:pr-7'>
                  {[...Array(3)].map((__, j) => (
                    <>
                      <div key={j} className='h-[24px] rounded-md bg-gray-fa'></div>
                      <div key={j} className='h-[24px]'></div>
                    </>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
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
            <div className='flex h-full flex-col items-center justify-center'>
              <div className='relative size-[60px] md:size-[100px]'>
                <Image src={'/icons/invitations.svg'} alt='invitations' fill />
              </div>
              <p className='px-7 py-5 text-gray-78'>초대된 대시보드가 없습니다.</p>
            </div>
          )}
        </>
      )}
    </section>
  );
}
