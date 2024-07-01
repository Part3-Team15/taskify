import CancelButton from '@/components/Button/CancelButton';

interface InvitedMemberProps {
  email: string;
  onCancelClick: () => void;
}

export default function InvitedMemberItem({ email, onCancelClick }: InvitedMemberProps) {
  return (
    <div className='flex items-center justify-between'>
      {email}
      <CancelButton className='text-sm' type='button' onClick={onCancelClick}>
        취소
      </CancelButton>
    </div>
  );
}
