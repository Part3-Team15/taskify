import { useMutation } from 'react-query';
import { useDispatch } from 'react-redux';

import { setUser, isLoading, setError } from '@/store/reducers/userSlice';

interface SignInResponse {
  user: { nickname: string; id: number };
  accessToken: string;
}

const signIn = async (credentials: { email: string; password: string }): Promise<SignInResponse> => {
  try {
    const response = await fetch('https://sp-taskify-api.vercel.app/15/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      throw new Error('Login failed');
    }

    const data: SignInResponse = await response.json();
    // 로그인 성공 시 유저 데이터를 Redux에 저장 & 로컬 스토리지에 토큰 저장
    localStorage.setItem('accessToken', data.accessToken);

    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message || '로그인 중 오류가 발생했습니다.');
    } else {
      throw new Error('로그인 중 알 수 없는 오류가 발생했습니다.');
    }
  }
};

export const useSignIn = () => {
  const dispatch = useDispatch();
  return useMutation(signIn, {
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
