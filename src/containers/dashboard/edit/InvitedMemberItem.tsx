import CancelButton from '@/components/Button/CancelButton';

interface InvitedMemberProps {
  email: string;
  onCancelClick: () => void;
}

// NOTE: 초대 받은 사람의 이메일을 확인하고 취소할 수 있는 컴포넌트
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
