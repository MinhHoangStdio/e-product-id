import { EOrderStatus } from "../enums/order";

export interface Order {
  name: string;
  phone_number: string;
  address: string;
  note?: string;
  id: number;
  status: EOrderStatus;
  created_at: string;
  product?: OrderProduct;
  consignment?: OrderConsignment;
}

export interface OrderProduct {
  name: string;
  id: number;
  images?: string[];
}
export interface OrderConsignment {
  name: string;
  id: number;
  organization_id: number;
}
