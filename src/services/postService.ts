import instance from './axios';

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
