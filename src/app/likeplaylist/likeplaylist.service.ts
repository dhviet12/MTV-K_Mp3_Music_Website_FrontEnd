import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ILikeSong} from '../likesong/ILikeSong';
import {Observable} from 'rxjs';
import {ILikePlaylist} from './ILikePlaylist';
import {environment} from '../../environments/environment';

const URL = `${environment.url}`;
@Injectable({
  providedIn: 'root'
})
export class LikeplaylistService {

  constructor(private httpClient: HttpClient) { }

  public likePlaylist(likePlaylist: ILikePlaylist): Observable<ILikePlaylist>{
    return this.httpClient.post<ILikePlaylist>(URL + 'likePlaylist/like', likePlaylist);
  }

  public unlikePlaylist(pid: number): Observable<any> {
    return this.httpClient.delete<any>(URL + 'likePlaylist/unlike/' + `${pid}`);
  }
}
