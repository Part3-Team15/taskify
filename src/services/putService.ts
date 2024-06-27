import instance from './axios';

import { UpdatePasswordForm } from '@/types/post/UpdatePasswordForm.interface';
import { UpdateProfileForm } from '@/types/post/UpdateProfileForm.interface';
import { User } from '@/types/User.interface';

// 프로필 변경
export const putProfile = async (formData: UpdateProfileForm) => {
  const response = await instance.put<User>(`/users/me`, formData);
  return response.data;
};

export const putPassword = async (formData: UpdatePasswordForm) => {
  return await instance.put<User>(`/auth/password`, formData);
};
