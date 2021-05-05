import {IUserToken} from '../user/model/IUserToken';
import {PlayList} from '../play-list/play-list';

export interface ILikePlaylist {
  id? : number,
  user: IUserToken,
  playlist: PlayList
}
