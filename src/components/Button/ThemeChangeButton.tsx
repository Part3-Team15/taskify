import { useTheme } from 'next-themes';

export default function ThemeChangeButton() {
  const { theme, setTheme } = useTheme();
  const handleChangeTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return <button onClick={handleChangeTheme}>{theme === 'light' ? '○ Light' : '● Dark'} Theme</button>;
}
