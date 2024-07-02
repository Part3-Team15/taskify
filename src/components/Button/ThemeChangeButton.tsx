import { useTheme } from 'next-themes';

export default function ThemeChangeButton() {
  const { theme, setTheme } = useTheme();

  return (
    <button
      className='p-3'
      onClick={() => {
        setTheme(theme === 'light' ? 'dark' : 'light');
      }}
      value={theme === 'light' ? 'dark' : 'light'}
    >
      {theme === 'light' ? '○ light' : '● dark'}
    </button>
  );
}
