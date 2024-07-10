import { useCallback, useEffect, useRef } from 'react';

const useInfiniteScroll = (
  fetchData: (size: number, cursorId?: number | null) => Promise<void>,
  cursorId: number | null,
  isFetching: boolean,
) => {
  const observerRef = useRef<HTMLDivElement | null>(null); // 무한 스크롤 옵저버 참조

  // 댓글 목록 무한 스크롤 옵저버
  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const target = entries[0];
      if (target.isIntersecting && cursorId !== null && !isFetching) {
        fetchData(5, cursorId);
      }
    },
    [cursorId, isFetching, fetchData],
  );

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, {
      threshold: 1.0,
    });
    if (observerRef.current) observer.observe(observerRef.current);

    return () => {
      if (observerRef.current) observer.unobserve(observerRef.current);
    };
  }, [handleObserver]);

  return { observerRef };
};

export default useInfiniteScroll;
