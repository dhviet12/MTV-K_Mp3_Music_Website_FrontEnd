import {IUser} from "../user/model/IUser";

export interface IComment {
  id: number;
  content?: string;
  user?: any;
}
