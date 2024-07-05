import axios, { AxiosError } from 'axios';

import { store } from '@/store/store';

const instance = axios.create({
  baseURL: 'https://sp-taskify-api.vercel.app/15',
});

instance.interceptors.request.use((config) => {
  const state = store.getState();
  const { accessToken } = state.user; // 전역 상태에 저장된 accessToken을 가져와 인증요청에 사용
  if (accessToken && !config.headers.Authorization) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

instance.interceptors.response.use(
  (res) => res,
  async (error: AxiosError) => {
    const originalRequest = error.config;
    if (originalRequest && !originalRequest.headers._retry) {
      originalRequest.headers._retry = true;
      originalRequest.headers.Authorization = `Bearer ${process.env.NEXT_PUBLIC_SHARE_ACCOUNT_TOKEN}`;
      return instance(originalRequest);
    }
    return Promise.reject(error);
  },
);

export default instance;
