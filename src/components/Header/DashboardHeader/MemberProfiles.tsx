import ProfileIcon from '@/components/ProfileIcon';
import useFetchData from '@/hooks/useFetchData';
import { getMembersList } from '@/services/getService';
import { Member, MembersResponse } from '@/types/Member.interface';

interface MemberProfilesProps {
  id: string;
}

// NOTE: 구성원 프로필 아이콘 생성 (member[] -> ProfileIcon[])
const genMemberProfiles = (members: Member[], distance: number) =>
  members.map((user, i) => {
    const offset = distance * i;
    const liStyle = { left: offset };
    return (
      <li key={user.id} className='absolute size-[34px] md:size-[38px]' style={liStyle}>
        <ProfileIcon
          user={user}
          userId={user.userId}
          imgClassName={`size-[34px] md:size-[38px]`}
          fontClassName='md:font-base font-sm'
        />
      </li>
    );
  });

// NOTE: 대시보드 헤더 구성원 프로필 목록 컴포넌트
export default function MemberProfiles({ id }: MemberProfilesProps) {
  const { data, isLoading, error } = useFetchData<MembersResponse>(['members', id, 1], () =>
    getMembersList(Number(id)),
  );

  if (isLoading) {
    return <p>로딩중...</p>;
  }

  if (error) {
    return <p>{error.message}</p>;
  }

  if (!data?.members) {
    // NOTE: 실제론 생성자 한명이라도 존재
    return <p>멤버가 없습니다.</p>;
  }

  // NOTE: 디바이스 정보를 알 수 없어 임시방편으로 세 개 렌더링하고 hidden 처리
  const numMembers = data.totalCount;
  const numPC = Math.min(numMembers, 4);
  const numNonPC = Math.min(numMembers, 2);
  const wPC = numMembers > 4 ? 38 + 30 * numPC : 38 + 30 * (numPC - 1);
  const wTablet = numMembers > 2 ? 38 + 30 * numNonPC : 38 + 30 * (numNonPC - 1);
  const wMobile = numMembers > 2 ? 34 + 24 * numNonPC : 34 + 24 * (numNonPC - 1);
  return (
    <>
      {/* PC용 */}
      <ul className='relative hidden h-[34px] text-sm md:h-[38px] md:text-base lg:block' style={{ width: wPC }}>
        {genMemberProfiles(data.members.slice(0, numPC), 30)}
        {numMembers > 4 && MoreIcon(numMembers - 4, 30 * 4)}
      </ul>
      {/* Tablet용 */}
      <ul
        className='relative hidden h-[34px] text-sm md:block md:h-[38px] md:text-base lg:hidden'
        style={{ width: wTablet }}
      >
        {genMemberProfiles(data.members.slice(0, numNonPC), 30)}
        {numMembers > 2 && MoreIcon(numMembers - 2, 30 * 2)}
      </ul>
      {/* Mobile용 */}
      <ul className='relative h-[34px] text-sm md:hidden md:h-[38px] md:text-base' style={{ width: wMobile }}>
        {genMemberProfiles(data.members.slice(0, numNonPC), 24)}
        {numMembers > 2 && MoreIcon(numMembers - 2, 24 * 2)}
      </ul>
    </>
  );
}

// NOTE: 구성원이 많을 때 프로필 보여주지 못한 구성원 수 표시
function MoreIcon(more: number, offset: number) {
  return (
    <div
      style={{ left: offset }}
      className='align-center font-montserrat absolute size-[34px] rounded-full border-2 border-solid border-white bg-gray-9f font-semibold text-white md:size-[38px]'
    >
      <p>{`+${more}`}</p>
    </div>
  );
}
