import {IUserToken} from '../user/model/IUserToken';

export interface PlayList {
  id: number;
  name?: string;
  song?: any;
  kindOfMusic?: string;
  timeCreate?: any;
  description?: string;
  user?: IUserToken;
  timeUpdate?: any;
  view?: number;
}
