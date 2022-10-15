export interface Post {
  body: string;
  create_time: string;
  hits: number;
  id: number;
  recomend: number;
  title: string;
  user: number;
}

export interface Comment {
  coment: string;
  create_time: string;
  user: string;
}
