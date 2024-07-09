import axios from 'axios';

import instance from './axios';

import { Dashboard, FavoriteDashboard } from '@/types/Dashboard.interface';
import { Invitation } from '@/types/Invitation.interface';
import { CommentForm } from '@/types/post/CommentForm.interface';
import { PostCardData } from '@/types/post/EditModalPostData.interface';
import { NewDashboardForm, NewColumnForm, InviteMemberForm } from '@/types/post/ModalForm.interface';
import { SignInForm, SignInResponse } from '@/types/post/SignInForm.interface';
import { SignUpForm } from '@/types/post/SignUpForm.interface';
import { UploadImageForm, UploadImageResponse } from '@/types/post/UploadImageForm.interface';

// 회원가입
export const postSignUp = async (formData: SignUpForm) => {
  return await instance.post(`/users`, formData);
};

// 로그인
export const postSignIn = async (formData: SignInForm): Promise<SignInResponse> => {
  const response = await instance.post<SignInResponse>(`/auth/login`, formData);
  return response.data;
};

// 대쉬보드 생성
export const postNewDashboard = async (formData: NewDashboardForm): Promise<Dashboard> => {
  const response = await instance.post(`/dashboards`, formData);
  return response.data;
};

// 컬럼 생성
export const postNewColumn = async (formData: NewColumnForm) => {
  return await instance.post(`/columns`, formData);
};

// 대시보드 멤버 초대하기
export const postInviteMember = async (dashboardId: number, formData: InviteMemberForm): Promise<Invitation> => {
  const response = await instance.post(`dashboards/${dashboardId}/invitations`, formData);
  return response.data;
};

// 이미지 업로드
export const postImage = async (formData: UploadImageForm) => {
  const response = await instance.post<UploadImageResponse>(`/users/me/image`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

// 카드 생성
export const postCard = async (formData: PostCardData) => {
  const response = await instance.post(`/cards`, formData);
  return response.data;
};

// 카드 이미지 업로드
export const postImageForCard = async (columnId: number, formData: UploadImageForm) => {
  const response = await instance.post<{ imageUrl: string }>(`/columns/${columnId}/card-image`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

// 댓글 생성
export const postComment = async (formData: CommentForm) => {
  return await instance.post(`/comments`, formData);
};

// 사용자 생성하기
export const postFavoriteUser = async (userData: { userId: number }) => {
  const response = await axios.post(`/api/users`, userData);
  return response.data;
};

// 즐겨찾기 항목 생성하기
export const postFavorite = async (id: string, favoriteData: FavoriteDashboard) => {
  const response = await axios.post(`/api/favorites/${id}`, favoriteData);
  return response.data;
};
