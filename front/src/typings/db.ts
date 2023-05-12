import { ReactNode } from "react";

export interface IUser {
  userId: string;
  userName: string;
  password: string;
  role: string;
  ssn: string;
  phone: string;
  addr: string;
  email: string;
  regDate: Date;
  cartTranNo: number;
}

export interface IUserWithOnline extends IUser {
  online: boolean;
}

export interface Branch {
  branchId: string;
  branchName: string;
  addr: string;
  phone: string;
  lattude: string;
  longitude: number;
}

export interface Product {
  fileName: string;
  manuDate: string;
  price: number;
  prodDetail: string;
  prodName: string;
  prodNo: number;
  addr: string;
  regDate: Date;
  proTranCode: string;
}


export interface IWorkspace {
  id: number;
  name: string;
  url: string; // 주소 창에 보이는 주소
  OwnerId: number; // 워크스페이스 만든 사람 아이디
}

export interface MarkerProps {
  content: ReactNode;
  latlng: { lat: number, lng: number };
}