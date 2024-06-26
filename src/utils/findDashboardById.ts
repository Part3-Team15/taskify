import { Dashboard } from '@/types/Dashboard.interface';

const findDashboardById = (dashboards: Dashboard[], id: number) =>
  dashboards.filter((dashboard) => dashboard.id === id)[0];

export default findDashboardById;
