export type AddNull<T> = {
  [P in keyof T]: T[P] | null;
};

export type AddProps<T, U> = T & { [P in keyof U]: U[P] };

export type DelProp<T, U> = {
  [P in keyof T as P extends U ? never : P]: T[P];
};

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
  username: string;
  password: string;
  nickname: string;
  profile: string;
  number: string;
  address: string;
}

interface Image {
  image: string; // 제품 이미지
  pd_image: string; // 제품 설명 이미지
}

export interface KitItem {
  pd_id: string;
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

export interface Cart {
  kitItem: KitItem;
  count: number;
  checked: boolean;
  type: "product";
}

export interface DaumPostCodeData {
  zonecode: string;
  address: string;
  addressEnglish: string;
  addressType: "R" | "J";
  userSelectedType: "R" | "J";
  noSelected: "Y" | "N";
  userLanguageType: "K" | "E";
  roadAddress: string;
  roadAddressEnglish: string;
  jibunAddress: string;
  jibunAddressEnglish: string;
  autoRoadAddress: string;
  autoRoadAddressEnglish: string;
  autoJibunAddress: string;
  autoJibunAddressEnglish: string;
  buildingCode: string;
  buildingName: string;
  apartment: "Y" | "N";
  sido: string;
  sidoEnglish: string;
  sigungu: string;
  sigunguEnglish: string;
  sigunguCode: string;
  roadnameCode: string;
  bcode: string;
  roadname: string;
  roadnameEnglish: string;
  bname: string;
  bnameEnglish: string;
  bname1: string;
  bname1English: string;
  bname2: string;
  bname2English: string;
  hname: string;
  query: string;
}

interface ReviewImage {
  image: string;
}

export interface Review {
  body: string;
  create_time: string;
  grade: number;
  hobby_rv: number;
  id: number;
  images: ReviewImage[];
  title: string;
  update_time: string;
  user: number;
}

export interface PublicUser {
  id: number;
  nickname: string;
  profile: string;
}

export interface SubKitItem {
  body: string;
  id: number;
  price: number;
  sub_image: string;
  title: string;
  type: "subscription";
}

export interface Order {
  address: string;
  number: string;
  name: string;
  payment: string;
  totalPrice: number;
  items: Cart[] | SubKitItem[];
  type: string;
}

export interface InitFallback<T> {
  [key: string]: T;
}

interface DefaultOrder {
  o_add: string;
  o_create: string;
  o_id: number;
  o_name: string;
  o_num: string;
  o_pay: string;
  o_total_price: number;
}

interface OrderItem {
  o_items: {
    p_create: string;
    p_description: string;
    p_id: number;
    p_info: string;
    p_price: number;
    p_quantity: number;
    p_sell: string;
    p_title: string;
    p_total_price: number;
    p_image: Image[];
  }[];
}

type OrderItemList = AddProps<DefaultOrder, OrderItem>;

export interface OrderItemListObj {
  order: OrderItemList[];
}

interface OrderSub {
  o_items: {
    s_body: string;
    s_id: number;
    s_price: number;
    s_sub_image: string;
    s_title: string;
    s_create: string;
    s_delete: string;
  }[];
}

type OrderSubList = AddProps<DefaultOrder, OrderSub>;

export interface OrderSubListObj {
  order: OrderSubList[];
}
