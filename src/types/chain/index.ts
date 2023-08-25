export interface Chain {
  name: string;
  description: string;
  payload?: any;
  images?: string[];
  id: number;
  consignment_id: number;
}
