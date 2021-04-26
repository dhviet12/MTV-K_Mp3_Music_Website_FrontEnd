import { Injectable } from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {ISong} from './isong';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SongService {
  shouldRefresh = new Subject<any>();
  getAllSong(): Observable<ISong[]>{
    return this.httpClient.get<ISong[]>('http://localhost:8080/songs');
  }
  getSongById(id: number): Observable<ISong>{
    return this.httpClient.get<ISong>('http://localhost:8080/song/' + id);
  }
  createBook(song: ISong): Observable<ISong>{
    return this.httpClient.post<ISong>('http://localhost:8080/create-song', song);
  }
  editSong(id: number, song: ISong): Observable<ISong>{
    return this.httpClient.put<ISong>('http://localhost:8080/edit-song/' + id, song);
  }
  delSong(id: number): Observable<ISong>{
    return this.httpClient.delete<ISong>('http://localhost:8080/delete-song/' + id);
  }
  searchSong(nameSong: string): Observable<ISong[]> {
    return this.httpClient.get<ISong[]>('http://localhost:8080/search-song?name=' + nameSong);
  }
  topSongsView(): Observable<ISong[]> {
    return this.httpClient.get<ISong[]>('http://localhost:8080/top10songsview');
  }
  topSongsNew(): Observable<ISong[]> {
    return this.httpClient.get<ISong[]>('http://localhost:8080/top10songsnew');
  }
  constructor(private httpClient: HttpClient) { }
}
