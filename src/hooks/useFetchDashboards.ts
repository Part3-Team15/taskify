import { useQuery } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';

import { getDashboardsList } from '@/services/getService';
import { setDashboards } from '@/store/reducers/dashboardsSlice';

export const useFetchDashboards = () => {
  const dispatch = useDispatch();

  const { isLoading, error, data, isFetching } = useQuery({
    queryKey: ['dashboards'], // 쿼리 키는 문자열이나 배열로 지정할 수 있습니다
    queryFn: async () => {
      try {
        const response = await getDashboardsList();
        if (response.status !== 200) {
          throw new Error('Failed to fetch dashboards');
        }
        const data = response.data;
        dispatch(setDashboards({ dashboards: data.dashboards, totalCount: data.totalCount }));
        return data; // 데이터를 반환해야 합니다
      } catch (error) {
        // 에러 처리
        throw new Error('데이터를 불러오는 중 에러 발생: ' + error);
      }
    },
  });

  return { isLoading, error, data, isFetching };
};
