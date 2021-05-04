import {ISong} from '../song/isong';
import {IUserToken} from '../user/model/IUserToken';
import {IUser} from '../user/model/IUser';

import {PlayList} from '../play-list/play-list';

export interface IComment {
  id?: number;
  content?: string;
  createdBy: IUserToken;
  song?: ISong;
  playList?: PlayList;
}
