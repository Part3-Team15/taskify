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
        fa: '#fafafa',
      }, 
      white: '#ffffff',
      violet: {
        DEFAULT: '#5534da',
        f1: '#f1effd',
        hover: '#3925a8',
      },
      red: {
        DEFAULT: '#D6173A',
        red_hover: '#b51230',
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
    },
  },
  plugins: [],
};

export default config;
