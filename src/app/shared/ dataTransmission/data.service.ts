import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  // có thể subcribe theo dõi thay đổi value của biến này thay cho messageSource
  dataSource = new BehaviorSubject<any>('truyền dữ liệu mp3');
  currentData = this.dataSource.asObservable();
  // lay ra tu search
  keyWordSource = new BehaviorSubject<string>('truyền key word');
  keyWord = this.keyWordSource.asObservable();
  // lay ra playlist
  albumSourse = new BehaviorSubject<any>('');
  currentAlbum = this.albumSourse.asObservable();
  // thêm bài hát vào album
  addSongToAlbumSourse = new BehaviorSubject<any>('');
  currentSongAdd = this.addSongToAlbumSourse.asObservable();

  constructor() {
  }

  // method này để change source message
  changeData(data: any): any {
    this.dataSource.next(data);
  }

  changeKeyWord(key: string): any {
    this.keyWordSource.next(key);
  }

  changeAlbum(album: any): any {
    this.albumSourse.next(album);
  }

  changeSong(song: any): any {
    this.addSongToAlbumSourse.next(song);
  }
}
