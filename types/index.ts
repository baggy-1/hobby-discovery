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

export interface User {
  id: number;
  nickname: string;
  password: string;
  profile: string | null;
  username: string;
}

export interface Hobby {
  id: number;
  hobby_title: string;
  descrition: string;
  hobby_image: string;
}
