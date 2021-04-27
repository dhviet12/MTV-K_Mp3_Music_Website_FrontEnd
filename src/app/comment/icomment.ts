
import {IUser} from "../user/model/IUser";
import {ISong} from "../song/isong";
export interface IComment {
  id: number;
  content?: string;
  user: IUser;
  song: ISong;
}
