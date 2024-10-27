export interface IUser {
  id: number;
  name: string;
  email: string;
  password: string;
  phone?: string; // not mandatory
  created_at: Date;
  updated_at: Date;
}
