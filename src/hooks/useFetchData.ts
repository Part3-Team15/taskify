import { useQuery, QueryKey, UseQueryResult } from '@tanstack/react-query';

// TODO: 인자 개수가 많아져 객체 형식으로 받는 게 좋을 듯 하나, 많은 코드 수정이 요구됨
const useFetchData = <T>(
  queryKey: QueryKey,
  getService: () => Promise<{ data: T }>,
  refetchInterval: false | number = false,
  enabled: boolean = true,
): UseQueryResult<T, Error> => {
  return useQuery<T, Error>({
    queryKey: queryKey,
    queryFn: async () => {
      try {
        const response = await getService();
        return response.data;
      } catch (error) {
        throw new Error('데이터를 불러오는 중 에러 발생: ' + error);
      }
    },
    retry: 1, // NOTE: 요청 실패시 1회까지만 재시도하도록 제한
    refetchInterval: refetchInterval, // NOTE: 주기적인 초대내역 수신을 위해 설정
    enabled: enabled,
  });
};

export default useFetchData;
