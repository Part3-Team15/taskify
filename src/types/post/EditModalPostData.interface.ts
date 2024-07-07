export interface PostCardData {
  assigneeUserId: number | null;
  dashboardId: number;
  columnId: number;
  title: string;
  description: string;
  dueDate: string | null;
  tags: string[];
  imageUrl: string | null;
}
