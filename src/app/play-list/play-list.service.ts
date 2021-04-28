import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {PlayList} from './play-list';

const API_URL = `${environment.url}`;

@Injectable({
  providedIn: 'root'
})
export class PlayListService {

  constructor(private httpClient: HttpClient) { }

  getAllPlayList(username: string): Observable<PlayList[]> {
    return this.httpClient.get<PlayList[]>(API_URL + 'playlists/user/' + username);
  }

  createNewPlayList(playlist: PlayList, username: string): Observable<PlayList> {
    return this.httpClient.post<PlayList>(API_URL + 'playlists/user/create/' + username, playlist);
  }

  deletePlayListById(id: number, username: string): Observable<PlayList> {
    return this.httpClient.delete<PlayList>(API_URL + 'playlists/user/delete/' + username + '/' + id);
  }

}
