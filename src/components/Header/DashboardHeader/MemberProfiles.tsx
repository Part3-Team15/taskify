import ProfileIcon from '@/components/ProfileIcon';
import useFetchData from '@/hooks/useFetchData';
import { getMembersList } from '@/services/getService';
import { MembersResponse } from '@/types/Member.interface';

interface MemberProfilesProps {
  id: number;
}

export default function MemberProfiles({ id }: MemberProfilesProps) {
  const { data, isLoading, error } = useFetchData<MembersResponse>(['members', id], () => getMembersList(id));
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

  // TODO: 길이도 정확히 하려면 device 정보 있어야 함
  const w = 38 + 30 * (data.members.length - 1);
  const ulStyle = { width: w };
  return (
    <ul className='relative h-[38px]' style={ulStyle}>
      {data.members.map((user, i) => {
        const offset = 30 * i;
        const liStyle = { left: offset };
        const hidden = i >= 2 ? 'hidden' : '';
        return (
          <li key={user.id} className='absolute size-[34px] md:size-[38px]' style={liStyle}>
            <ProfileIcon
              user={user}
              imgClassName={`size-[34px] md:size-[38px] lg:flex ${hidden}`}
              fontClassName='md:font-base font-sm'
            />
          </li>
        );
      })}
      {/* TODO: + 버튼 추가하려면 device 정보가 있어야 함 */}
    </ul>
  );
}
