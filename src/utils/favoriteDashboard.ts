import { getFavorites, getFavoriteUsers } from '@/services/getService';
import { postFavorite } from '@/services/postService';
import { FavoriteDashboard } from '@/types/Dashboard.interface';

export const UserCheck = async (userId: number) => {
  try {
    if (!userId) return false;

    const data = await getFavoriteUsers();

    if (!data) return false;

    return data.some((user: { userId: number }) => user.userId === userId);
  } catch (error) {
    console.error('Failed to check user:', error);
    return false;
  }
};

export const findUserById = async (userId: number) => {
  try {
    if (!userId) return;

    const data = await getFavoriteUsers();

    if (!data) return;

    const selectedUser = data.find((user: { userId: number }) => user.userId === userId);

    if (!selectedUser) return;

    return selectedUser._id;
  } catch (error) {
    console.error('Failed to find user:', error);
    return false;
  }
};

export const checkFavorite = async (userId: number, favoriteId: number) => {
  if (!userId || !favoriteId) return false;

  const id = await findUserById(userId);

  try {
    const favorites = (await getFavorites(id)).data;
    if (!favorites) return false;

    return favorites.some((favorite: { id: number }) => favorite.id === favoriteId);
  } catch (error) {
    console.error('Failed to check favorite:', error);
    return false;
  }
};

export const createFavorite = async (id: string, favoriteData: FavoriteDashboard) => {
  if (await limitCheckFavorite(favoriteData.userId)) {
    throw new Error('즐겨찾기는 최대 3개까지 가능합니다.');
  }

  await postFavorite(id, favoriteData);
};

export const limitCheckFavorite = async (userId: number) => {
  const id = await findUserById(userId);

  try {
    const favorites = (await getFavorites(id)).data;

    if (!favorites) return false;

    if (favorites.length >= 3) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error('Failed to check favorite limit:', error);
    return false;
  }
};
