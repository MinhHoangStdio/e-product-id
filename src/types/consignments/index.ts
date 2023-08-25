import { Category } from "../categories";
import { Chain } from "../chain";
import { Product } from "../products";

export interface Consignment {
  name: string;
  id?: number;
  amount?: number;
  description?: string;
  payload?: any;
  product_id?: number;
  organization_id?: number;
  is_sold_out?: boolean;
  product?: Product;
  category?: Category;
}

export interface ConsignmentDetail {
  name: string;
  amount: number;
  description: string;
  payload?: any;
  product_id: number;
  id: number;
  organizer_id: number;
  is_sold_out: boolean;
  product?: Product;
  chains?: Chain[];
}
