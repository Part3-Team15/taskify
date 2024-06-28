import instance from './axios';

import { UpdatePasswordForm } from '@/types/post/UpdatePasswordForm.interface';
import { UpdateProfileForm } from '@/types/post/UpdateProfileForm.interface';
import { User } from '@/types/User.interface';

// 대시보드 초대 수락
export const putAcceptInvitation = async (invitationId: number, inviteAccepted: boolean) => {
  return await instance.put(`/invitations/${invitationId}`, { inviteAccepted });
};

// 프로필 변경
export const putProfile = async (formData: UpdateProfileForm) => {
  const response = await instance.put<User>(`/users/me`, formData);
  return response.data;
};

// 비밀번호 수정
export const putPassword = async (formData: UpdatePasswordForm) => {
  return await instance.put<User>(`/auth/password`, formData);
};
  
// 컬럼 수정
export const putColumn = async (columnId: number, formData: { title: string }) => {
  return await instance.put(`/columns/${columnId}`, formData);
};
