import { Category } from "../categories";
import { Organization } from "../organizations";

export interface Product {
  id: string | number;
  name: string;
  price: number;
  description: string;
  payload?: object;
  images?: string[];
  category_id: number;
  organizer_id: number;
  approval_status: string;
}

export interface DetailProduct {
  id: string | number;
  name: string;
  price: number;
  description: string;
  payload?: object;
  images?: string[];
  category_id: number;
  approval_status: string;
  category: Category;
  organizer_id: number;
  organization: Organization;
}
