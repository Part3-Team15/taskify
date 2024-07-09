import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/containers/**/*.{js,ts,jsx,tsx,mdx}',
    './src/layouts/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      md: '780px',
      lg: '1280px',
    },
    fontFamily: {
      pretendard: ['Pretendard', 'sans-serif'],
      nanumgothic: ['"Nanum Gothic"', 'sans-serif'],
    },
    colors: {
      black: {
        DEFAULT: '#000000',
        17: '#171717',
        33: '#333236',
        '4b': '#4b4b4b',
      },
      dark: {
        DEFAULT: '#212121',
        bg: '#1e1e1e',
        10: 'hsl(0, 0%, 90%)',
        100: 'hsl(0, 0%, 60%)',
        200: 'hsl(0, 0%, 30%)',
        300: 'hsl(0, 0%, 15%)',
        400: 'hsl(0, 0%, 10%)',
        450: 'hsl(0, 0%, 8%)',
        500: 'hsl(0, 0%, 6%)',
        purple: {
          DEFAULT: '#2C283A',
          hover: '#3D3A4F',
        },
      },
      gray: {
        78: '#787486',
        '9f': '#9fa6b2',
        d9: '#d9d9d9',
        ee: '#eeeeee',
        f5: '#f5f5f5',
        fa: '#fafafa',
      },
      white: {
        DEFAULT: '#ffffff',
        hover: '#f7f7f7',
        active: '#eeeeee',
        disabled: '#ebebeb',
      },
      violet: {
        DEFAULT: '#5534da',
        f1: '#f1effd',
        e8: '#e8e6f7',
        hover: '#3925a8',
        active: '#261680',
        disabled: '#9FA6B2',
        light: {
          hover: '#f4f2ff',
          active: '#ebe8fc',
          disabled: '#ebebeb',
        },
      },
      red: {
        DEFAULT: '#D6173A',
        hover: '#b51230',
        active: '#9c0823',
      },
      green: {
        DEFAULT: '#7ac555',
      },
      purple: {
        DEFAULT: '#760dde',
      },
      orange: {
        DEFAULT: '#ffa500',
      },
      blue: {
        DEFAULT: '#76a5ea',
      },
      pink: {
        DEFAULT: '#e876ea',
      },
    },
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      animation: {
        'scroll-horizontal': 'scroll-horizontal 20s linear infinite',
      },
      keyframes: {
        'scroll-horizontal': {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
      },
    },
  },
  plugins: [require('tailwind-scrollbar-hide')],
  darkMode: 'selector',
};

export default config;
