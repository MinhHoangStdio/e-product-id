import { Category } from "../categories";
import { EApprovalStatus } from "../enums/product";
import { Organization } from "../organizations";

export interface Product {
  id: string | number;
  name: string;
  description: string;
  payload?: object;
  images?: string[];
  category_id: number;
  organizer_id: number;
  approval_status: EApprovalStatus;
}

export interface DetailProduct {
  id: string | number;
  name: string;
  description: string;
  payload?: object;
  images?: string[];
  category_id: number;
  approval_status: EApprovalStatus;
  views?: number;
  unit_price?: number;
  unit?: string;
  category?: Category;
  organizer_id: number;
  organization: Organization;
}
