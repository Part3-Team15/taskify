import MemberItem from './MemberItem';

import { Member } from '@/types/Member.interface';

interface Props {
  members: Member[];
  onDeleteClick: (id: number) => void;
}

export default function MemberList({ members, onDeleteClick }: Props) {
  const lastItem = members.at(-1);

  return (
    <ol className='flex flex-col gap-3 md:gap-4'>
      {members.slice(0, members.length - 1).map((member) => (
        <li key={member.id} className='flex flex-col gap-3 md:gap-4'>
          <MemberItem member={member} onDeleteClick={() => onDeleteClick(member.id)} />
          <div className='h-0 w-full border border-gray-ee' />
        </li>
      ))}
      {lastItem && (
        <li key={lastItem.id}>
          <MemberItem member={lastItem} onDeleteClick={() => onDeleteClick(lastItem.id)} />
        </li>
      )}
    </ol>
  );
}
