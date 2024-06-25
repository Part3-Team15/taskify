import instance from './axios';

import { SignUpForm } from '@/types/post/SignUpForm.interface';

// 회원가입
export const postSignUp = async (formData: SignUpForm) => {
  return await instance.post(`/users`, formData);
};
