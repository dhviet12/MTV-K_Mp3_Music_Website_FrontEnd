import {IUser} from '../user/model/IUser';
import {Timestamp} from 'rxjs';
import {IUserToken} from '../user/model/IUserToken';

export interface ISong {
  id: number;
  nameSong?: string;
  description?: string;
  fileMp3?: any;
  fileImage?: any;
  author?: string;
  createdTime?: any;
  updatedTime?: any;
  numberOfView?: number;
  singer?: any;
  createdBy?: IUserToken;
  category?: any;
  likes?: any;
  comment?: any;
}
