import CancelButton from '@/components/Button/CancelButton';

interface InvitedMemberProps {
  email: string;
}

export default function InvitedMemberItem({ email }: InvitedMemberProps) {
  return (
    <div className='flex items-center justify-between'>
      {email}
      <CancelButton className='text-sm'>취소</CancelButton>
    </div>
  );
}
