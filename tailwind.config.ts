import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      md: '780px',
      lg: '1280px',
    },
    colors: {
      black: '#000000',
      black_17: '#171717',
      black_33: '#333236',
      black_4b: '#4b4b4b',
      gray_78: '#787486',
      gray_9f: '#9fa6b2',
      gray_d9: '#d9d9d9',
      gray_ee: '#eeeeee',
      gray_fa: '#fafafa',
      white: '#ffffff',
      violet: '#5534da',
      violet_f1: '#f1effd',
      violet_hover: '#3925a8',
      red: '#D6173A',
      red_hover: '#b51230',
      green: '#7ac555',
      purple: '#760dde',
      orange: '#ffa500',
      blue: '#76a5ea',
      pink: '#e876ea',
      
    },
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
};
export default config;
