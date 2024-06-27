import { useMutation } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';

import { postSignIn } from '@/services/postService';
import { setUser, isLoading, setError } from '@/store/reducers/userSlice';
import { SignInForm, SignInResponse } from '@/types/post/SignInForm.interface';

export const useSignIn = () => {
  const dispatch = useDispatch();

  return useMutation<SignInResponse, unknown, SignInForm, unknown>({
    mutationFn: postSignIn,
    onError: (error: unknown) => {
      if (error instanceof Error) {
        dispatch(setError(error.message));
      } else {
        dispatch(setError('알 수 없는 오류가 발생했습니다.'));
      }
      dispatch(isLoading(false));
    },
    onSuccess: (data) => {
      dispatch(setUser(data));
      dispatch(isLoading(false));
    },
    onMutate: async () => {
      dispatch(isLoading(true));
      dispatch(setError(null));
      // 이 부분에서 필요한 경우 이전 상태를 저장하거나 다른 작업을 수행할 수 있음
      return null; // 반환 값은 나중에 revert 함수에서 사용할 수 있음
    },
  });
};
