import {IUser} from '../user/model/IUser';
import {ISong} from '../song/isong';
import {IUserToken} from '../user/model/IUserToken';

export interface IComment {
  id?: number;
  content?: string;
  createdBy: IUserToken;
  song?: ISong;
}
