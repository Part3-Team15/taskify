import instance from './axios';

import { CancelInvitationInput } from '@/types/delete/CancelInvitation.interface';
import { DeleteDashboardInput } from '@/types/delete/DeleteDashboardInput.interface';
import { DeleteMemberInput } from '@/types/delete/DeleteMemberInput.interface';

// 대시보드 삭제
export const deleteDashboard = async ({ dashboardId }: DeleteDashboardInput) => {
  return await instance.delete(`/dashboards/${dashboardId}`);
};

// 컬럼 삭제
export const deleteColumn = async (columnId: number) => {
  return await instance.delete(`/columns/${columnId}`);
};

// 구성원 삭제
export const deleteMember = async ({ memberId }: DeleteMemberInput) => {
  return await instance.delete(`/members/${memberId}`);
};

// 대시보드 초대 취소
export const deleteInvitation = async ({ dashboardId, invitationId }: CancelInvitationInput) => {
  return await instance.delete(`/dashboards/${dashboardId}/invitations/${invitationId}`);
};

// 댓글 삭제
export const deleteComment = async (commentId: number) => {
  return await instance.delete(`/comments/${commentId}`);
};

// 카드 삭제
export const deleteCard = async (cardId: number) => {
  return await instance.delete(`/cards/${cardId}`);
};
