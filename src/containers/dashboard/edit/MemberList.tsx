import MemberItem from './MemberItem';

import { Member } from '@/types/Member.interface';

interface Props {
  members: Member[];
  onDeleteClick: (member: Member) => void;
}

// NOTE: 구성원 컴포넌트 생성 (Member[] -> MemberItem[])
export default function MemberList({ members, onDeleteClick }: Props) {
  const lastItem = members.at(-1);

  return (
    <ol className='flex flex-col gap-3 md:gap-4'>
      {members.slice(0, members.length - 1).map((member) => (
        <li key={member.id} className='flex flex-col gap-3 md:gap-4'>
          <MemberItem member={member} onDeleteClick={() => onDeleteClick(member)} />
          <div className='h-0 w-full border border-gray-ee dark:border-dark-200' />
        </li>
      ))}
      {/* 마지막 구성원은 구분선이 없음 */}
      {lastItem && (
        <li key={lastItem.id}>
          <MemberItem member={lastItem} onDeleteClick={() => onDeleteClick(lastItem)} />
        </li>
      )}
    </ol>
  );
}
