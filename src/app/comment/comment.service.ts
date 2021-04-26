import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {IComment} from "./icomment";
import {environment} from "../../environments/environment";
const URL = `${environment.url}`;

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private httpClient: HttpClient) {
  }
  public getAllCommentBySongId(id: number): Observable<IComment[]> {
    return this.httpClient.get<IComment[]>(URL + 'commentSong/' + id);
  }

  public createComment(iComment: IComment): Observable<IComment> {
    return this.httpClient.post<IComment>(URL + 'commentSong/create', iComment);
  }

  public editComment(id: number, iComment: IComment): Observable<IComment> {
    return this.httpClient.put<IComment>(URL + 'commentSong/edit/' + `${id}`, iComment);
  }

  public getCommentById(id: number): Observable<IComment> {
    return this.httpClient.get<IComment>(URL + 'commentSong/' + `${id}`);
  }

  public deleteComment(id: number): Observable<IComment> {
    return this.httpClient.delete<IComment>(URL + 'commentSong/delete/' + `${id}`);
  }
}
