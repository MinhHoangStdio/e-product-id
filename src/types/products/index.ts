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
  view_count?: number;
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
  view_count?: number;
  category?: Category;
  organizer_id: number;
  organization: Organization;
}
