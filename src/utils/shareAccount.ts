import { postInviteMember } from '@/services/postService';
import { putAcceptInvitation } from '@/services/putService';

export const addShareAccount = async (dashboardId: number) => {
  const email = String(process.env.NEXT_PUBLIC_SHARE_ACCOUNT_EMAIL);
  const { id: invitationId } = await postInviteMember(dashboardId, { email });
  return await putAcceptInvitation(invitationId, true);
};
