import { sha256 } from 'js-sha256';

// NOTE: sha256 해시함수와 환경변수에 저장된 키를 이용해 비밀번호 해시
const hashPassword = (password: string) => {
  const key = String(process.env.NEXT_PUBLIC_SHA256_KEY);
  return sha256.hmac(key, password);
};

export default hashPassword;
