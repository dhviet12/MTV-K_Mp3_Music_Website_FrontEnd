import {IUser} from '../user/model/IUser';

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
  createdBy?: IUser;
  category?: any;
  likes?: any;
  comment?: any;
}
