import { useQuery } from 'react-query';

const useFetchData = <T>(getService: () => Promise<{ data: T }>) => {
  const fetchData = async () => {
    const response = await getService();
    return response.data;
  };

  return useQuery<T, Error>({
    queryKey: 'data', // 캐시 키
    queryFn: fetchData, // 비동기 getService 함수 (services/ 에 정의)
    onError: (error: Error) => {
      console.error('Error fetching data:', error);
    },
  });
};

export default useFetchData;
