import UserMenuDropdown from '../UserMenuDropdown';

import ThemeChangeButton from '@/components/Button/ThemeChangeButton';

interface DefaultHeaderProps {
  title: string;
}

// NOTE: title과 유저 메뉴를 보여주는 범용 헤더 컴포넌트
export default function DefaultHeader({ title }: DefaultHeaderProps) {
  return (
    <header className='relative flex h-[60px] w-full items-center justify-between border-b border-gray-d9 bg-white px-[24px] text-black-33 transition-colors md:h-[70px] md:px-[40px] dark:border-dark-200 dark:bg-dark dark:text-dark-10'>
      <h1 className='text-lg font-bold md:text-xl'>{title}</h1>
      <div className='flex items-center gap-3'>
        <div>
          <ThemeChangeButton className='p-2' />
        </div>
        <div className='h-[34px] w-0 border-l border-gray-d9 dark:border-dark-200' />
        <UserMenuDropdown />
      </div>
    </header>
  );
}
