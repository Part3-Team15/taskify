import instance from './axios';

// 컬럼 삭제
export const deleteColumn = async (columnId: number) => {
  return await instance.delete(`/columns/${columnId}`);
};

// 대시보드 삭제
export const deleteDashboard = async (dashboardId: number) => {
  return await instance.delete(`/dashboards/${dashboardId}`);
};
