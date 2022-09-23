export interface Comment {
  id: number;
  content: string;
  created_at: string;
  userId: string;
}

export interface Post {
  id: number;
  title: string;
  description: string;
  created_at: string;
  userId: string;
  comment: Comment[];
  counts: number;
}
