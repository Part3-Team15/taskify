import { useQuery, QueryKey, UseQueryResult } from '@tanstack/react-query';

const useFetchData = <T>(queryKey: QueryKey, getService: () => Promise<{ data: T }>): UseQueryResult<T, Error> => {
  return useQuery<T, Error>({
    queryKey: queryKey,
    queryFn: async () => {
      try {
        const response = await getService();
        return response.data;
      } catch (error) {
        // 에러 처리
        throw new Error('데이터를 불러오는 중 에러 발생: ' + error);
      }
    },
  });
};

export default useFetchData;
