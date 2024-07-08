import { postFavorite } from '@/services/postService';
import { FavoriteDashboard } from '@/types/Dashboard.interface';

export const checkFavorite = (favorites: FavoriteDashboard[], favoriteId: number) => {
  if (!favorites || !favoriteId) return false;

  try {
    return favorites.some((favorite: { id: number }) => favorite.id === favoriteId);
  } catch (error) {
    console.error('Failed to check favorite:', error);
    return false;
  }
};

export const createFavorite = async (id: string, favoriteData: FavoriteDashboard, favorites: FavoriteDashboard[]) => {
  if (await limitCheckFavorite(favorites)) {
    throw new Error('즐겨찾기는 최대 3개까지 가능합니다.');
  }

  if (await checkFavorite(favorites, favoriteData.id)) {
    // 즐겨찾기가 이미 존재하는 경우 아무 작업도 하지 않습니다.
    return;
  }

  await postFavorite(id, favoriteData);
};

export const limitCheckFavorite = (favorites: FavoriteDashboard[]) => {
  try {
    if (!favorites) return false;

    return favorites.length >= 3;
  } catch (error) {
    console.error('Failed to check favorite limit:', error);
    return false;
  }
};
