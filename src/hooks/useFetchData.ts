import { useQuery, QueryKey } from 'react-query';

const useFetchData = <T>(queryKey: QueryKey, getService: () => Promise<{ data: T }>) => {
  const fetchData = async () => {
    const response = await getService();
    return response.data;
  };

  return useQuery<T, Error>({
    queryKey, // 캐시 키를 임의로 지정할 수 있음
    queryFn: fetchData, // 비동기 getService 함수 (services/ 에 정의)
    onError: (error: Error) => {
      console.error('Error fetching data:', error);
    },
  });
};

export default useFetchData;
