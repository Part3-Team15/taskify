import { useState } from 'react';
import { useSelector } from 'react-redux';

import { useSignIn } from '@/hooks/useSignIn';
import { RootState } from '@/store/store';

export default function SignInForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const mutation = useSignIn();

  // useSelector를 사용하여 Redux store의 상태를 조회
  const { user, error } = useSelector((state: RootState) => state.user);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate({ email, password });
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <input
        type='email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder='이메일을 입력하세요.'
        required
      />
      <input
        type='password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder='비밀번호를 입력하세요.'
        required
      />
      <button type='submit' disabled={mutation.isLoading}>
        {mutation.isLoading ? '잠시만 기다려주세요..' : '로그인'}
      </button>
      {mutation.isError && (
        <p>Error: {mutation.error instanceof Error ? mutation.error.message : '알 수 없는 오류가 발생했습니다.'}</p>
      )}

      {user && (
        <p>
          로그인 성공: {user.nickname} ({user.id})
        </p>
      )}
      {error && <p>오류: {error}</p>}
    </form>
  );
}
