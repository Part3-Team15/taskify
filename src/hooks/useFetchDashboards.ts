import { useQuery } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';

import { setDashboards } from '@/store/reducers/dashboardsSlice';
import { RootState } from '@/store/store';

const fetchDashboards = async (accessToken: string) => {
  const response = await fetch(
    'https://sp-taskify-api.vercel.app/15/dashboards?navigationMethod=infiniteScroll&page=1&size=10',
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: 'application/json',
      },
    },
  );

  if (!response.ok) {
    throw new Error('Failed to fetch dashboards');
  }

  const data = await response.json();
  return data;
};

export const useFetchDashboards = () => {
  const dispatch = useDispatch();
  const accessToken = useSelector((state: RootState) => state.user.accessToken); // 전역 상태에 저장된 user 정보에서 accessToken을 가져옴

  return useQuery('dashboards', () => fetchDashboards(accessToken as string), {
    onSuccess: (data) => {
      dispatch(setDashboards({ dashboards: data.dashboards, totalCount: data.totalCount }));
    },
  });
};
