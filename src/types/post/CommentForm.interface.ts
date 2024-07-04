import { User } from '../User.interface';

export interface CommentForm {
  content: string;
  cardId: number;
  columnId: number;
  dashboardId: number;
}

export interface Comment {
  id: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  cardId: number;
  author: User;
}

export interface CommentsResponse {
  cursorId: number;
  comments: Comment[];
}
