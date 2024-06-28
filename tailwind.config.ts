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
        hover: '#3925a8',
        active: '#261680',
        disabled: '#9FA6B2',
        light: {
          hover: '#f4f2ff',
          active: '#ebe8fc',
          disabled: '#ebebeb',
        }
      },
      red: {
        DEFAULT: '#D6173A',
        hover: '#b51230',
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
      profile: {
        0: '#7CE34F',
        1: '#46E079',
        2: '#FF5D54',
        3: '#D5EB2C',
        4: '#52EBCA',
        5: '#FFE648',
        6: '#EA6D88',
        7: '#F5B65B',
        8: '#FF7C21',
        9: '#86DEFF',
        10: '#FC96DF',
        11: '#BD7BC2',
        12: '#4CA1F5',
        13: '#8A42D6',
        14: '#5959D1',
        15: '#F0866E',
      }
    },
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
};

export default config;
