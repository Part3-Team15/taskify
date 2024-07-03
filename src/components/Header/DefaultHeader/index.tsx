import UserMenuDropdown from '../UserMenuDropdown';

interface DefaultHeaderProps {
  title: string;
}

export default function DefaultHeader({ title }: DefaultHeaderProps) {
  return (
    <header className='relative flex h-[60px] w-full items-center justify-between border-b border-gray-d9 bg-white px-[24px] text-black-33 md:h-[70px] md:px-[40px]'>
      <h1 className='text-lg font-bold md:text-xl'>{title}</h1>
      <UserMenuDropdown />
    </header>
  );
}
