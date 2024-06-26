import { User } from './User.interface';

export interface Member extends User {
  isOwner: boolean;
  userId: number;
}

export interface MembersResponse {
  members: Member[];
  totalCount: number;
}
