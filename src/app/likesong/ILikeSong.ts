import {IUser} from '../user/model/IUser';
import {ISong} from '../song/isong';

export interface ILikeSong {
  id?: number;
  user: IUser;
  song: ISong;
}
