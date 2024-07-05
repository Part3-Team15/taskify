import Image from 'next/image';
import { useRouter } from 'next/router';
import { useTheme } from 'next-themes';

export default function ThemeChangeButton({ className }: { className?: string }) {
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const handleChangeTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const themeImage = theme === 'light' ? '/icons/theme-light.svg' : '/icons/theme-dark.svg';

  const isSignPage = router.pathname === '/signin' || router.pathname === '/signup';

  return (
    <button
      onClick={handleChangeTheme}
      className={`btn-violet-light dark:btn-violet-dark flex items-center gap-2 border-none ${className}`}
    >
      <Image src={themeImage} alt='theme' width={25} height={25} />
      {!isSignPage && <span className='hidden font-bold md:block dark:text-dark-10'>Theme</span>}
    </button>
  );
}
