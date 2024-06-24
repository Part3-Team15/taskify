import instance from './axios';

// 컬럼 목록 조회
export async function getColumnsList(id: string) {
  return await instance.get(`/columns?dashboardId=${id}`);
}

// 대시보드 목록 조회
export async function getDashboardsList(navigationMethod = 'infiniteScroll', page = '1', size = '10') {
  return await instance.get(`/dashboards?navigationMethod=${navigationMethod}&page=${page}&size=${size}`);
}
