import { useMutation } from '@tanstack/react-query';
import { useDispatch, useSelector } from 'react-redux';

import useModal from './useModal';

import { putProfile } from '@/services/putService';
import { setUser, isLoading, setError } from '@/store/reducers/userSlice';
import { RootState } from '@/store/store';
import { UpdateProfileForm } from '@/types/post/UpdateProfileForm.interface';
import { User } from '@/types/User.interface';

// NOTE: 유저 프로필 업데이트를 위한 훅
export const useUpdateProfile = () => {
  const dispatch = useDispatch();
  const { openNotificationModal } = useModal();
  const prevUser = useSelector((state: RootState) => state.user);

  return useMutation<User, unknown, UpdateProfileForm, unknown>({
    mutationFn: putProfile,
    onMutate: () => {
      dispatch(isLoading(true));
      dispatch(setError(null));
      // NOTE: 이 부분에서 필요한 경우 이전 상태를 저장하거나 다른 작업을 수행할 수 있음
      return null; // NOTE: 반환 값은 나중에 revert 함수에서 사용할 수 있음
    },
    onSuccess: (user) => {
      dispatch(setUser({ ...prevUser, user }));
      openNotificationModal({ text: '프로필이 변경되었습니다.' });
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
