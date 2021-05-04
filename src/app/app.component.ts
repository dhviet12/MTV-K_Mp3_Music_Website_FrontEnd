import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {ISong} from './song/isong';
import {DataService} from './shared/ dataTransmission/data.service';
import {PlayMusicComponent} from './shared/audio/play-music/play-music.component';
import {Audio} from './shared/audio/audio';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private data: DataService) {
  }

  title = 'web-mp3-mtvk-fe';
  songCurrent: ISong = {
    id: 0
  };
  album: ISong[] = [];
  play = false;
  audio: Audio = {};
  audioList: Audio[] = [{
    id: '1',
    url: 'https://firebasestorage.googleapis.com/v0/b/website-mp3-mtvk.appspot.com/o/mp3%2FD%E1%BA%ABu%20ng%C6%B0%E1%BB%9Di%20kh%C3%B4ng%20%C4%91%E1%BA%BFn.mp3?alt=media&token=2fcec32b-be8a-4ff7-91ec-6757469f27cd',
    title: 'MTV-K',
    cover: 'https://i1.sndcdn.com/artworks-000249294066-uow7s0-t500x500.jpg',
    artist: 'Audio'
  }];

  ngOnInit(): void {
    // this.loadData();
    // this.loadAlbum();
    // console.log(this.audioList + '??');
  }

  // loadData(): any {
  //   this.data.currentData.subscribe(songCurrent => {
  //     this.songCurrent = songCurrent;
  //     console.log('load' + this.songCurrent.nameSong);
  //     if (this.songCurrent !== null) {
  //       this.play = true;
  //     }
  //     this.audioList[0].id = String(this.songCurrent.id);
  //     this.audioList[0].url = this.songCurrent.fileMp3;
  //     if (this.songCurrent.nameSong != null) {
  //       this.audioList[0].title = this.songCurrent.nameSong;
  //     }
  //     this.audioList[0].cover = this.songCurrent.fileImage;
  //   });
  // }
  //
  // loadAlbum(): any {
  //   this.data.currentAlbum.subscribe(album => {
  //     this.album = album;
  //     console.log(this.album + 'dữ liệu nhận đc');
  //     // tslint:disable-next-line:prefer-for-of
  //     for (let i = 0; i < this.album.length; i++) {
  //       this.audio.id = String(this.album[i].id);
  //       this.audio.url = this.album[i].fileMp3;
  //       this.audio.cover = this.album[i].fileImage;
  //       this.audio.title = this.album[i].nameSong;
  //       this.audio.artist = String(this.album[i].singer);
  //       this.audioList.push(this.audio);
  //     }
  //   });
  // }
}
