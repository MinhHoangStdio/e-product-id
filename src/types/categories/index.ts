export interface Category {
  name: string;
  parent_id?: number;
  id: number;
  product_count: number;
  parent_category?: {
    name: string;
    parent_id?: number;
    id: number;
  };
}
export interface ParentCategory {
  name: string;
  parent_id?: number;
  id: number;
}
