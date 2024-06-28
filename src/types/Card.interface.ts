import { User } from './User.interface';

export interface Card {
  id: number;
  title: string;
  description: string;
  tags: string[];
  dueDate: string;
  assignee: User;
  imageUrl: string;
  teamId: string;
  columnId: number;
  createdAt: string;
  updatedAt: string;
}

export interface CardsListResponse {
  cursorId: number;
  totalCount: number;
  cards: Card[];
}
