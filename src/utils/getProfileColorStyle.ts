import { NUM_PROFILE_COLORS, PROFILE_COLORS } from '@/constants';

const getProfileColorStyle = (id: number) => {
  const index = id % NUM_PROFILE_COLORS;
  return { backgroundColor: PROFILE_COLORS[index] };
};

export default getProfileColorStyle;
