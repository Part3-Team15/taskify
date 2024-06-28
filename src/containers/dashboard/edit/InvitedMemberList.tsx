import InvitedMemberItem from './InvitedMemberItem';

import { Invitation } from '@/types/Invitation.interface';

interface Props {
  invitations: Invitation[];
}

export default function InvitedMemberList({ invitations }: Props) {
  const lastItem = invitations.at(-1);

  return (
    <ol className='flex flex-col gap-3 md:gap-4'>
      {invitations.slice(0, invitations.length - 1).map(({ id, invitee }) => (
        <li key={id} className='flex flex-col gap-3 md:gap-4'>
          <InvitedMemberItem email={invitee.email} />
          <div className='h-0 w-full border border-gray-ee' />
        </li>
      ))}
      {lastItem && (
        <li key={lastItem.id}>
          <InvitedMemberItem email={lastItem.invitee.email} />
        </li>
      )}
    </ol>
  );
}
