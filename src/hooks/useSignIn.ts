import { useMutation } from 'react-query';
import { useDispatch } from 'react-redux';

import { postSignIn } from '@/services/postService';
import { setUser, isLoading, setError } from '@/store/reducers/userSlice';
import { SignInForm, SignInResponse } from '@/types/post/SignInForm.interface';

export const useSignIn = () => {
  const dispatch = useDispatch();

  return useMutation<SignInResponse, unknown, SignInForm>(postSignIn, {
    onMutate: () => {
      dispatch(isLoading(true));
      dispatch(setError(null));
    },
    onSuccess: (data) => {
      dispatch(setUser(data));
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
