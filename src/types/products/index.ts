export interface Product {
  id: string | number;
  name: string;
  price: number;
  description: string;
  payload?: object
  images?: string[]
  category_id: number
  organizer_id: number
  approval_status: string
}


export interface DetailProduct {
  id: string | number;
  name: string;
  price: number;
  description: string;
  payload?: object
  images?: string[]
  category_id: number
  approval_status: string
  category: {
    id: any,
    name: string,
    parent_id?: any
  },
  organizer_id: number
  organizer: {
    id: any,
    email: string,
    name:string
  }
}
