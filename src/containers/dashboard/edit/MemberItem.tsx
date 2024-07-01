import CancelButton from '@/components/Button/CancelButton';
import ProfileIcon from '@/components/ProfileIcon';
import { Member } from '@/types/Member.interface';

interface InvitedMemberProps {
  member: Member;
  onDeleteClick: () => void;
}

export default function MemberItem({ member, onDeleteClick }: InvitedMemberProps) {
  return (
    <div className='flex items-center justify-between'>
      <div className='flex items-center gap-2 md:gap-3'>
        {/* TODO: ProfileIcon PR 반영해야함 */}
        <ProfileIcon
          user={member}
          userId={member.userId}
          imgClassName='size-[34px] md:size-[38px]'
          fontClassName='md:text-base text-sm'
        />
        <p className='text-base font-medium'>{member.nickname}</p>
      </div>
      <CancelButton type='button' className='text-sm' onClick={onDeleteClick}>
        삭제
      </CancelButton>
    </div>
  );
}
