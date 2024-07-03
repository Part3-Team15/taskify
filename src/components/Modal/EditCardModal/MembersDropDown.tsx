import MemberProfile from './MemberProfile';

export default function MembersDropDown({
  members,
  onSelectMember,
}: {
  members: {
    userId: number;
    nickname: string;
    profileImageUrl: string | null;
  }[];
  onSelectMember: (userId: number) => void;
}) {
  return (
    <ul className='absolute top-[110%] w-full rounded-[6px] border border-gray-d9 bg-white px-4 py-2'>
      {members.map((member) => {
        return (
          <li
            className='flex cursor-pointer items-center rounded-[6px] px-[6px] py-[5px] text-[14px] transition-all hover:bg-violet-light-hover md:text-[16px]'
            key={`member-${member.userId}`}
            onClick={() => {
              onSelectMember(member.userId);
            }}
          >
            <MemberProfile userId={member.userId} nickname={member.nickname} profileImageUrl={member.profileImageUrl} />
          </li>
        );
      })}
      <li
        className='flex cursor-pointer items-center rounded-[6px] px-[6px] py-[5px] text-[14px] text-gray-9f transition-all hover:bg-violet-light-hover md:text-[16px]'
        onClick={() => {
          onSelectMember(0);
        }}
      >
        <p className='w-full text-center'>담당자 선택 안함</p>
      </li>
    </ul>
  );
}
