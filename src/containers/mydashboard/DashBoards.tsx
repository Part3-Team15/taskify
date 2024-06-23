import { useSelector } from 'react-redux';

import { useFetchDashboards } from '@/hooks/useFetchDashboards';
import { RootState } from '@/store/store';

const Dashboards = () => {
  const { isLoading } = useFetchDashboards();
  const dashboards = useSelector((state: RootState) => state.dashboards.dashboards);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <h1>Dashboards</h1>
      <ul>
        {dashboards.map((dashboard) => (
          <li key={dashboard.id}>{dashboard.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboards;
