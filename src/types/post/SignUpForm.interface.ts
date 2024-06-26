export interface SignUpForm {
  email: string;
  nickname: string;
  password: string;
}

export interface SignUpResponse {
  id: number;
  email: string;
  nickname: string;
  profileImageUrl: string | null;
  createdAt: string;
  updatedAt: string;
}
