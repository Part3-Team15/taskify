import InvitedMembersSection from '@/containers/dashboard/edit/InvitedMembersSection';
import MembersSection from '@/containers/dashboard/edit/MembersSection';

export default function DashboardEditPage() {
  return (
    <div className='flex flex-col gap-4 px-3 py-4 text-black-33 md:p-5'>
      {/* 돌아가기 */}
      {/* 대시보드 수정 */}
      <MembersSection />
      <InvitedMembersSection />
      {/* 대시보드 삭제 버튼 */}
    </div>
  );
}
