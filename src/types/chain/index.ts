export interface Chain {
  name: string;
  description: string;
  payload?: any;
  images?: string[];
  date_start?: any;
  id: number;
  consignment_id: number;
}
