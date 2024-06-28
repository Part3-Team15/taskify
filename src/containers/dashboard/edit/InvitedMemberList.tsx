import InvitedMemberItem from './InvitedMemberItem';

import { Invitation } from '@/types/Invitation.interface';

interface Props {
  invitations: Invitation[];
}

export default function InvitedMemberList({ invitations }: Props) {
  const lastItem = invitations.at(-1);

  return (
    <ol className='flex flex-col gap-3 md:gap-4'>
      {invitations.slice(0, invitations.length - 1).map(({ invitee }) => (
        <>
          <InvitedMemberItem key={invitee.id} email={invitee.email} />
          <div className='h-0 w-full border border-gray-ee' />
        </>
      ))}
      {lastItem && <InvitedMemberItem key={lastItem.invitee.id} email={lastItem.invitee.email} />}
    </ol>
  );
}
