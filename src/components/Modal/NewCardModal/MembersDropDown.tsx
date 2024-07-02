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
    <ul className='absolute bottom-[-48px] w-full rounded-[6px] border border-gray-d9 bg-white px-4 py-2 md:bottom-[-53px]'>
      {members.map((member) => {
        return (
          <li
            className='cursor-pointer rounded-[6px] px-[3px] hover:bg-violet hover:text-white'
            key={`member-${member.userId}`}
            onClick={() => {
              onSelectMember(member.userId);
            }}
          >
            <p className={`font-montserrat font-semibold text-white`}>{member.nickname.substring(0, 1)}</p>
            {member.nickname}
          </li>
        );
      })}
    </ul>
  );
}
