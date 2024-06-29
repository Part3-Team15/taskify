import instance from './axios';

// 컬럼 목록 조회
export const getColumnsList = async (dashboardId: number) => {
  return await instance.get(`/columns?dashboardId=${dashboardId}`);
};

// 대시보드 목록 조회
export const getDashboardsList = async (
  navigationMethod: 'infiniteScroll' | 'pagination' = 'infiniteScroll', // navigationMethod는 'infiniteScroll' 또는 'pagination'만 가능. 기본값은 'infiniteScroll'
  page: number = 1, // 기본값 1
  size: number = 10, // 기본값 10
) => {
  return await instance.get(`/dashboards?navigationMethod=${navigationMethod}&page=${page}&size=${size}`);
};

// 대시보드 상세 조회
export const getDashboard = async (id: string) => {
  return await instance.get(`/dashboards/${id}`);
};

// 대시보드 멤버 목록 조회
export const getMembersList = async (
  dashboardId: number,
  page: number = 1, // 기본값 1
  size: number = 4, // 기본값 4
) => {
  return await instance.get(`/members?page=${page}&size=${size}&dashboardId=${dashboardId}`);
};

// 내가 받은 초대 목록 조회
export const getInvitationsList = async (size: number = 10, cursorId?: number, title?: string) => {
  const params = new URLSearchParams();
  params.append('size', size.toString());

  if (cursorId) {
    params.append('cursorId', cursorId.toString());
  }
  if (title) {
    params.append('title', title);
  }
  return await instance.get(`/invitations`, { params });
};

// 카드 목록 조회
export const getCardsList = async (columnId: number) => {
  return await instance.get(`/cards?columnId=${columnId}`);
};

// 상세 카드 조회
export const getCard = async (cardId: number) => {
  return await instance.get(`/cards/${cardId}`);
};
