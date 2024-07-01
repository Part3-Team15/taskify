export interface Dashboard {
  id: number;
  title: string;
  color: string;
  userId: number;
  createdAt: string;
  updatedAt: string;
  createdByMe: boolean;
}

export interface DashboardsResponse {
  dashboards: Dashboard[];
  totalCount: number;
  cursorId: number | null;
}

export interface DashboardInfoState {
  title: string;
  color: string;
}

export type DashboardColor = 'green' | 'purple' | 'orange' | 'blue' | 'pink';
