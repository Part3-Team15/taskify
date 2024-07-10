import { useQuery, QueryKey, UseQueryResult } from '@tanstack/react-query';

const useFetchData = <T>(
  queryKey: QueryKey,
  getService: () => Promise<{ data: T }>,
  refetchInterval: false | number = false,
  enabled: boolean = true,
  handleSuccess?: () => void,
): UseQueryResult<T, Error> => {
  return useQuery<T, Error>({
    queryKey: queryKey,
    queryFn: async () => {
      try {
        const response = await getService();
        handleSuccess && handleSuccess();
        return response.data;
      } catch (error) {
        throw error;
      }
    },
    refetchInterval: refetchInterval,
    enabled: enabled,
  });
};

export default useFetchData;
