export interface Organization {
  id?: string | number;
  name: string;
  members?: number[] | string[];
  owner_id: string | number;
}
