export interface Column {
  id: number;
  title: string;
  teamId: number;
  dashboardId: number;
  createdAt: string;
  updatedAt: string;
}

export interface ColumnsResponse {
  result: string;
  data: Column[];
}
