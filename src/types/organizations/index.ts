import { User } from "../user";

export interface Organization {
  id?: string | number;
  name: string;
  members?: number[] | string[];
  owner_id: string | number;
  list_member?: User[];
}
