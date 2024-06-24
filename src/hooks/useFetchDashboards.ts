import { useQuery } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';

import { getDashboardsList } from '@/services/getService';
import { setDashboards } from '@/store/reducers/dashboardsSlice';

const fetchDashboards = async () => {
  const response = await getDashboardsList();

  if (response.status !== 200) {
    throw new Error('Failed to fetch dashboards');
  }

  return response.data;
};

export const useFetchDashboards = () => {
  const dispatch = useDispatch();

  return useQuery('dashboards', () => fetchDashboards(), {
    onSuccess: (data) => {
      dispatch(setDashboards({ dashboards: data.dashboards, totalCount: data.totalCount }));
    },
  });
};
