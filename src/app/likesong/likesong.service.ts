import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ILikeSong} from './ILikeSong';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {IComment} from '../comment/icomment';
const URL = `${environment.url}`;

@Injectable({
  providedIn: 'root'
})
export class LikeSongService {

  constructor(private httpClient: HttpClient) { }

  public likeSong(likesong: ILikeSong): Observable<ILikeSong>{
    return this.httpClient.post<ILikeSong>(URL + 'likeSong/like', likesong);
  }


  public unlikeSong(sid: number): Observable<any> {
    console.log('call service', sid)
      return this.httpClient.delete<any>(URL + 'likeSong/unlike/' + `${sid}`);
    }
}
