import { sha256 } from 'js-sha256';

const hashPassword = (password: string) => {
  const key = String(process.env.NEXT_PUBLIC_SHA256_KEY);
  return sha256.hmac(key, password);
};

export default hashPassword;
