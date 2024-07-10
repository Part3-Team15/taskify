import { useQuery, QueryKey, UseQueryResult } from '@tanstack/react-query';

// TODO: 인자 개수가 많아져 객체 형식으로 받는 게 좋을 듯 하나, 많은 코드 수정이 요구됨
const useFetchData = <T>(
  queryKey: QueryKey,
  getService: () => Promise<{ data: T }>,
  enabled: boolean = true,
  refetchInterval: false | number = false,
): UseQueryResult<T, Error> => {
  return useQuery<T, Error>({
    queryKey: queryKey,
    queryFn: async () => {
      try {
        const response = await getService();
        return response.data;
      } catch (error) {
        throw error;
      }
    },
    enabled: enabled,
    refetchInterval: refetchInterval, // NOTE: 주기적인 초대내역 수신을 위해 설정
  });
};

export default useFetchData;
