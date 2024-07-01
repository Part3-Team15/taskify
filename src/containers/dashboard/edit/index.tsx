import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

import DashboardModifySection from './DashboardModifySection';
import InvitedMembersSection from './InvitedMembersSection';
import MembersSection from './MembersSection';

export default function DashboardEdit() {
  const router = useRouter();
  const { id } = router.query;

  const handleDeleteClick = () => {
    alert('대시보드 삭제');
  };

  return (
    <div className='px-3 py-4 text-black-33 md:p-5'>
      <Link
        href={`/dashboard/${id}`}
        className='mb-5 flex items-center gap-1.5 text-sm font-medium md:mb-6 md:text-base'
      >
        <div className='relative size-[18px] rotate-180 md:size-5'>
          <Image src='/icons/arrow-black.svg' alt='뒤로가기 아이콘' fill />
        </div>
        돌아가기
      </Link>
      <div className='flex flex-col gap-4'>
        <DashboardModifySection />
        <MembersSection />
        <InvitedMembersSection />
      </div>
      <button
        type='button'
        className='btn-gray gray-border my-8 size-fit rounded-lg px-[84px] py-4 text-base font-medium md:my-12 md:px-[95px] md:py-5 md:text-lg'
        onClick={handleDeleteClick}
      >
        대시보드 삭제하기
      </button>
    </div>
  );
}
