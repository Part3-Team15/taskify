import { deleteFavorite } from '@/services/deleteService';
import { getFavorite } from '@/services/getService';
import { postFavorite } from '@/services/postService';
import { FavoriteDashboard } from '@/types/Dashboard.interface';

export const checkFavorite = async (id: number): Promise<boolean> => {
  try {
    const list = await getFavorite();
    return list.some((item: FavoriteDashboard) => item.id === id);
  } catch (error) {
    console.error('Failed to check favorite:', error);
    return false;
  }
};

export const addFavorite = async (data: FavoriteDashboard): Promise<void> => {
  if (await maxFavorite()) {
    console.log('즐겨찾기는 최대 3개까지 가능합니다.');
    throw new Error('즐겨찾기는 최대 3개까지 가능합니다.');
  }

  try {
    const isFavorite = await checkFavorite(data.id);
    if (isFavorite) {
      console.log('이미 즐겨찾기에 추가되어 있습니다.');
      return;
    }
    await postFavorite(data);
  } catch (error) {
    console.error('Failed to add favorite:', error);
  }
};

export const maxFavorite = async (): Promise<boolean> => {
  try {
    const list = await getFavorite();
    return list.length >= 3;
  } catch (error) {
    console.error('Failed to check favorite:', error);
    return false;
  }
};

export const removeFavorite = async (id: number): Promise<void> => {
  try {
    const list = await getFavorite();
    const target = list.find((item: FavoriteDashboard) => item.id === id);

    if (target && target._id) {
      await deleteFavorite(target._id as string);
    }
  } catch (error) {
    console.error('Failed to remove favorite:', error);
  }
};
