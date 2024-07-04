import InvitedMemberItem from './InvitedMemberItem';

import { Invitation } from '@/types/Invitation.interface';

interface Props {
  invitations: Invitation[];
  onCancelClick: (id: number) => void;
}

export default function InvitedMemberList({ invitations, onCancelClick }: Props) {
  const lastItem = invitations.at(-1);

  return (
    <ol className='flex flex-col gap-3 md:gap-4'>
      {invitations.slice(0, invitations.length - 1).map(({ id, invitee }) => (
        <li key={id} className='flex flex-col gap-3 md:gap-4'>
          <InvitedMemberItem email={invitee.email} onCancelClick={() => onCancelClick(id)} />
          <div className='h-0 w-full border border-gray-ee dark:border-dark-200' />
        </li>
      ))}
      {lastItem && (
        <li key={lastItem.id}>
          <InvitedMemberItem email={lastItem.invitee.email} onCancelClick={() => onCancelClick(lastItem.id)} />
        </li>
      )}
    </ol>
  );
}
