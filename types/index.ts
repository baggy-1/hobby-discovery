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

interface Image {
  image: string;
}

export interface Hobby {
  id: number;
  hobby_title: string;
  descrition: string;
  images: Image[];
}

export interface AccessToken {
  access_token: string;
  access_exp: number;
}

export type AddNull<T> = {
  [P in keyof T]: T[P] | null;
};

export interface Cart {
  prod: Hobby;
  count: number;
}
