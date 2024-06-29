import InvitedMembersSection from '@/containers/dashboard/edit/InvitedMembersSection';

export default function DashboardEditPage() {
  return (
    <div className='flex flex-col gap-4 px-3 py-4 text-black-33 md:p-5'>
      {/* 돌아가기 */}
      {/* 대시보드 수정 */}
      {/* 구성원 목록 */}
      <InvitedMembersSection />
    </div>
  );
}
