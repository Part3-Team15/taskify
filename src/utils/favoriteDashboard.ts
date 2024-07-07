import { getFavorites, getFavoriteUsers } from '@/services/getService';

export const UserCheck = async (userId: number) => {
  const data = await getFavoriteUsers();

  if (!data) return false;

  return data.some((user: { userId: number }) => user.userId === userId);
};

export const findUserById = async (userId: number) => {
  if (!userId) return false;

  const data = await getFavoriteUsers();

  if (!data) return false;

  const selectedUser = data.find((user: { userId: number }) => user.userId === userId);

  if (!selectedUser) return false;

  return selectedUser._id;
};

export const FavoriteCheck = async (userId: number, favoriteId: number) => {
  if (!userId || !favoriteId) return false;

  const data = await getFavoriteUsers();

  if (!data) return false;

  return data.some(
    (user: { userId: number; favoriteId: number }) => user.userId === userId && user.favoriteId === favoriteId,
  );
};

export const fetchFavorites = async (id: string) => {
  try {
    const response = await getFavorites(id);
    return response || [];
  } catch (error) {
    console.error('Failed to fetch favorites:', error);
  }
};

export const FavoriteLimitCheck = async (userId: number) => {
  const data = await getFavoriteUsers();

  if (!data) return false;

  if (data.length >= 3) {
    return false;
  } else {
    return true;
  }
};
