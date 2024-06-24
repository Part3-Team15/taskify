import UserProfile from './UserProfile';

interface DefaultHeaderProps {
  title: string;
}

export default function DefaultHeader({ title }: DefaultHeaderProps) {
  return (
    <header className='flex h-[70px] w-full items-center justify-between border-b border-gray_d9 bg-white px-[24px] text-black_33 md:px-[40px]'>
      <h1 className='text-lg font-bold md:text-xl'>{title}</h1>
      <UserProfile />
    </header>
  );
}
