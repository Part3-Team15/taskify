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
      pretendard: ['Pretendard'],
      montserrat: ['Montserrat'],
    },
    colors: {
      black: {
        DEFAULT: '#000000',
        17: '#171717',
        33: '#333236',
        '4b': '#4b4b4b',
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
      },
      green: {
        DEFAULT: '#7ac555',
        tagtext: '#86d549',
        tagbg: '#e7f7db',
      },
      purple: {
        DEFAULT: '#760dde',
      },
      orange: {
        DEFAULT: '#ffa500',
        tagtext: '#d58d49',
        tagbg: '#f9eee3',
      },
      blue: {
        DEFAULT: '#76a5ea',
        tagtext: '#4981d5',
        tagbg: '#dbe6f7',
      },
      pink: {
        DEFAULT: '#e876ea',
        tagtext: '#d549b6',
        tagbg: '#f7dbf0',
      },
    },
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [
    require("tailwind-scrollbar-hide"),
  ],
};

export default config;
