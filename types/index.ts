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
  image: string; // 제품 이미지
  pd_image: string; // 제품 설명 이미지
}

export interface KitItem {
  pd_id: number;
  pd_create: string;
  pd_descrition: string;
  pd_info: string; // 제품 추가 정보
  pd_price: number;
  pd_sell: string; // 제품 판매자
  pd_title: string;
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
  kitItem: KitItem;
  count: number;
}
