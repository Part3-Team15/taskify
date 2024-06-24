import instance from './axios';

// 컬럼 목록 조회
export async function getColumnsList(id: string) {
  return await instance.get(`/columns?dashboardId=${id}`);
}

// 대시보드 목록 조회
export async function getDashboardsList(
  navigationMethod: 'infiniteScroll' | 'pagination' = 'infiniteScroll', // navigationMethod는 'infiniteScroll' 또는 'pagination'만 가능. 기본값은 'infiniteScroll'
  page: number = 1, // 기본값 1
  size: number = 10, // 기본값 10
) {
  return await instance.get(`/dashboards?navigationMethod=${navigationMethod}&page=${page}&size=${size}`);
}
