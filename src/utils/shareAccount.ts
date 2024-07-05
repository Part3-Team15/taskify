import { deleteMember } from '@/services/deleteService';
import { getMembersList } from '@/services/getService';
import { postInviteMember } from '@/services/postService';
import { putAcceptInvitation } from '@/services/putService';
import { Member } from '@/types/Member.interface';

const SHARE_EMAIL = String(process.env.NEXT_PUBLIC_SHARE_ACCOUNT_EMAIL);

export const addShareAccount = async (dashboardId: number) => {
  if (!dashboardId) return;

  const { id: invitationId } = await postInviteMember(dashboardId, { email: SHARE_EMAIL });
  await putAcceptInvitation(invitationId, true);
};

const filterShareAccount = (members: Member[]) => members.filter((member: Member) => member.email === SHARE_EMAIL);

const findShareAccount = async (dashboardId: number) => {
  let page = 1;
  const SIZE = 20;
  let response = await getMembersList(dashboardId, page, SIZE);
  while (response && page * SIZE < response.data.totalCount && filterShareAccount(response.data.members).length === 0) {
    page += 1;
    response = await getMembersList(dashboardId, page, SIZE);
  }
  return filterShareAccount(response.data.members).at(0);
};

export const checkPublic = async (dashboardId: number) => {
  if (!dashboardId) return false;
  return !!(await findShareAccount(dashboardId));
};

export const removeShareAccount = async (dashboardId: number) => {
  if (!dashboardId) return;

  const shareAccount = await findShareAccount(dashboardId);
  if (shareAccount) {
    await deleteMember({ memberId: shareAccount.id });
  }
};
