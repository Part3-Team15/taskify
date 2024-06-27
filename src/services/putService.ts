import instance from './axios';

import { User } from '@/types/User.interface';

// 프로필 변경
export const putProfile = async (formData: UpdateProfileForm) => {
  const response = await instance.put<User>(`/users/me`, formData);
  return response.data;
};
