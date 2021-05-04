import {IUser} from '../user/model/IUser';
import {ISong} from '../song/isong';
import {IUserToken} from '../user/model/IUserToken';

export interface ILikeSong {
  id?: number;
  user: IUserToken;
  song: ISong;
}
