import axios from 'axios';

import { store } from '@/store/store';

const instance = axios.create({
  baseURL: 'https://sp-taskify-api.vercel.app/15',
});

instance.interceptors.request.use((config) => {
  const state = store.getState();
  const { accessToken } = state.user; // 전역 상태에 저장된 accessToken을 가져와 인증요청에 사용
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

export default instance;
