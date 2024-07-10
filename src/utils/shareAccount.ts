import { deleteMember } from '@/services/deleteService';
import { getMembersList } from '@/services/getService';
import { postInviteMember } from '@/services/postService';
import { putAcceptInvitation } from '@/services/putService';
import { Member } from '@/types/Member.interface';

const SHARE_EMAIL = String(process.env.NEXT_PUBLIC_SHARE_ACCOUNT_EMAIL);

// NOTE: 대시보드에 공유계정을 멤버로 추가
export const addShareAccount = async (dashboardId: number) => {
  if (!dashboardId) return;

  const { id: invitationId } = await postInviteMember(dashboardId, { email: SHARE_EMAIL });
  await putAcceptInvitation(invitationId, true);
};

// NOTE: 멤버 리스트 중에 공유계정이 있는지 확인
const filterShareAccount = (members: Member[]) => members.filter((member: Member) => member.email === SHARE_EMAIL);

// NOTE: 대시보드 멤버 중 공유계정이 있는지 확인
const findShareAccount = async (dashboardId: number) => {
  let page = 1;
  const SIZE = 20;
  let response = await getMembersList(dashboardId, page, SIZE);
  // NOTE: 맴버를 20명씩 불러와 공유계정이 포함되었는지 확인
  while (response && page * SIZE < response.data.totalCount && filterShareAccount(response.data.members).length === 0) {
    page += 1;
    response = await getMembersList(dashboardId, page, SIZE);
  }
  return filterShareAccount(response.data.members).at(0);
};

// NOTE: 대시보드 멤버 중 공유계정이 있는지 확인해서 public 여부 결정
export const checkPublic = async (dashboardId: number) => {
  if (!dashboardId) return false;
  return !!(await findShareAccount(dashboardId));
};

// NOTE: 대시보드 멤버 중 공유계정을 찾아 멤버에서 제외
export const removeShareAccount = async (dashboardId: number) => {
  if (!dashboardId) return;

  const shareAccount = await findShareAccount(dashboardId);
  if (shareAccount) {
    await deleteMember({ memberId: shareAccount.id });
  }
};
