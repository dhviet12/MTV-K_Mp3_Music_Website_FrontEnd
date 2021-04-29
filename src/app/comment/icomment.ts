import {ISong} from '../song/isong';
import {IUserToken} from '../user/model/IUserToken';
import {IUser} from "../user/model/IUser";

export interface IComment {
  id?: number;
  content?: string;
  createdBy: IUserToken;
  song?: ISong;
}
