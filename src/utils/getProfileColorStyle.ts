import { NUM_PROFILE_COLORS, PROFILE_COLORS } from '@/constants';

// NOTE: 사용자 userId를 이용해 프로필 아이콘에 표시될 색 배정 (id % 색 개수)
const getProfileColorStyle = (id: number) => {
  const index = id % NUM_PROFILE_COLORS;
  return { backgroundColor: PROFILE_COLORS[index] };
};

export default getProfileColorStyle;
