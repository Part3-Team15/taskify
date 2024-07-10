import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';

import { store } from '@/store/store';

const instance = axios.create({
  baseURL: 'https://sp-taskify-api.vercel.app/15',
});

instance.interceptors.request.use((config) => {
  // NOTE: 전역 상태에 저장된 accessToken을 가져와 인증요청에 사용
  const state = store.getState();
  const { accessToken } = state.user;
  // NOTE: 아래 재요청을 위해, 헤더에 토큰이 설정되지 않은 경우에만 토큰 추가
  if (accessToken && !config.headers.Authorization) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

instance.interceptors.response.use(
  (res) => res,
  async (error: AxiosError) => {
    const originalRequest = error.config;
    /* NOTE: 공유 대시보드에서 공유계정 권한으로 수행하는 메소드인지 확인
     * GET: 헤더(대시보드 / 구성원), 대시보드(컬럼 / 카드 / 코멘트) 확인
     * PUT: 공유 대시보드에 공유계정 초대 수락
     */
    const checkMethodForPublic = (request: InternalAxiosRequestConfig) =>
      (request.method === 'get' &&
        !request.headers.memberTest &&
        (request.url?.includes('/dashboards/') ||
          request.url?.includes('/columns') ||
          request.url?.includes('/members') ||
          request.url?.includes('/cards') ||
          request.url?.includes('/comments'))) ||
      (request.method === 'put' && request.url?.includes('/invitations'));

    // NOTE: 개인 계정 권한으로 공유 대시보드 관련 요청 실패시 1회에 한해 공유 계정으로 시도
    if (originalRequest && checkMethodForPublic(originalRequest) && !originalRequest.headers._retry) {
      originalRequest.headers._retry = true;
      originalRequest.headers.Authorization = `Bearer ${process.env.NEXT_PUBLIC_SHARE_ACCOUNT_TOKEN}`;
      return instance(originalRequest);
    }

    return Promise.reject(error);
  },
);

export default instance;
