import { useMutation } from '@tanstack/react-query';
import { useDispatch, useSelector } from 'react-redux';

import { getFavoriteUsers } from '@/services/getService';
import { postFavoriteUser } from '@/services/postService';
import { isLoading, setError, setFavoritesUser } from '@/store/reducers/favoritesUserSlice';
import { RootState } from '@/store/store';

export const useFavoriteUser = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.user);
  const { userId } = useSelector((state: RootState) => state.favoritesUser);

  return useMutation({
    mutationFn: async () => {
      if (userId) {
        return { userId };
      }

      const res = await getFavoriteUsers();
      let favoriteUser = res.data.find((favUser: { userId: number | undefined }) => favUser.userId === user?.id);

      if (!favoriteUser) {
        favoriteUser = await postFavoriteUser({ userId: Number(user?.id) });
      }

      return favoriteUser;
    },
    onMutate: () => {
      dispatch(isLoading(true));
      dispatch(setError(null));
    },
    onSuccess: (data) => {
      dispatch(setFavoritesUser({ userId: data.userId, _id: data._id }));
      dispatch(isLoading(false));
    },
    onError: (error) => {
      dispatch(setError('Failed to fetch favorite user'));
      dispatch(isLoading(false));
    },
  });
};
