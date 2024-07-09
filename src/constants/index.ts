import { ToastOptions } from 'react-toastify';

// 이메일 정규표현식
export const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// 프로필 아이콘 배경색상 리스트
export const PROFILE_COLORS = [
  '#7CE34F',
  '#46E079',
  '#FF5D54',
  '#D5EB2C',
  '#52EBCA',
  '#FFE648',
  '#EA6D88',
  '#F5B65B',
  '#FF7C21',
  '#86DEFF',
  '#FC96DF',
  '#BD7BC2',
  '#4CA1F5',
  '#8A42D6',
  '#5959D1',
  '#F0866E',
];

export const NUM_PROFILE_COLORS = 16;

// 대쉬보드 컬러 상수
export const DASHBOARD_COLOR_OBJ = {
  green: '#7ac555',
  purple: '#760dde',
  orange: '#ffa500',
  blue: '#76a5ea',
  pink: '#e876ea',
};

export const TAG_COLORS = [
  {
    name: 'pink',
    text: '#d549b6',
    background: '#f7dbf0',
  },
  {
    name: 'blue',
    text: '#4981d5',
    background: '#dbe6f7',
  },
  {
    name: 'orange',
    text: '#d58d49',
    background: '#ffe8d0',
  },
  {
    name: 'green',
    text: '#86d549',
    background: '#e7f7db',
  },
  {
    name: 'yellow',
    text: '#ffb001',
    background: '#fff5c3',
  },
  {
    name: 'purple',
    text: '#8e77f8',
    background: '#d7daff',
  },
];

export const TOAST_DEFAULT_SETTING: ToastOptions = {
  position: 'top-right',
  autoClose: 3000,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: false,
  theme: 'light',
};
