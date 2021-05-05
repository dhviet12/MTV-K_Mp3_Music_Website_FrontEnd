
import {IUserToken} from '../user/model/IUserToken';
import {Icategory} from '../model/icategory';
import {PlayList} from '../play-list/play-list';

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
  category?: Icategory;
  playList?: PlayList;
  likes?: any;
  comment?: any;
}
