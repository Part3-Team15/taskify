import { useMutation } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';

import { putProfile } from '@/services/putService';
import { setUser, isLoading, setError } from '@/store/reducers/userSlice';
import { RootState } from '@/store/store';
import { User } from '@/types/User.interface';

export const useUpdateProfile = () => {
  const dispatch = useDispatch();
  const prevUser = useSelector((state: RootState) => state.user);

  return useMutation<User, unknown, UpdateProfileForm>(putProfile, {
    onMutate: () => {
      dispatch(isLoading(true));
      dispatch(setError(null));
    },
    onSuccess: (user) => {
      dispatch(setUser({ ...prevUser, user }));
      dispatch(isLoading(false));
    },
    onError: (error: unknown) => {
      if (error instanceof Error) {
        dispatch(setError(error.message));
      } else {
        dispatch(setError('알 수 없는 오류가 발생했습니다.'));
      }
      dispatch(isLoading(false));
    },
  });
};
