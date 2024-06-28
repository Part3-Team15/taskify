import instance from './axios';

import { NewDashboardFormData, NewColumnFormData } from '@/types/post/ModalPost.interface';
import { SignInForm, SignInResponse } from '@/types/post/SignInForm.interface';
import { SignUpForm } from '@/types/post/SignUpForm.interface';

// 회원가입
export const postSignUp = async (formData: SignUpForm) => {
  return await instance.post(`/users`, formData);
};

// 로그인
export const postSignIn = async (formData: SignInForm): Promise<SignInResponse> => {
  const response = await instance.post<SignInResponse>(`/auth/login`, formData);
  return response.data;
};

// 대쉬보드 생성 모달
export const postNewDashboard = async (formData: NewDashboardFormData) => {
  return await instance.post(`/dashboards`, formData);
};

// 컬럼 생성 모달
export const postNewColumn = async (formData: NewColumnFormData) => {
  return await instance.post(`/columns`, formData);
};
