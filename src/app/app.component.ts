import {AfterViewInit, Component, Input, OnInit, Output, ViewChild} from '@angular/core';
import {ISong} from './song/isong';
import {DataService} from './shared/ dataTransmission/data.service';
import {PlayMusicComponent} from './shared/audio/play-music/play-music.component';
import {Audio} from './shared/audio/audio';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private data: DataService, private router: Router) {
  }

  title = 'web-mp3-mtvk-fe';
  songCurrent: ISong = {
    id: 0
  };
  album: ISong[] = [];
  play = false;
  audio: Audio = {};
  index: any;
  audioList: Audio[] = [];

  ngOnInit(): void {
    this.router.navigate(['/songs']);
    // this.loadAlbum();
    // this.loadData();
    this.loadDataMusic();
  }
  loadDataMusic(): any{
    this.data.currentData.subscribe(index => {
      this.index = index;
      console.log(this.index);
    });
    this.data.currentAlbum.subscribe( album => {
      this.audioList = album;
      console.log(this.audioList);
    });
  }

  // loadData(): any {
  //   this.data.currentData.subscribe(songCurrent => {
  //     this.songCurrent = songCurrent;
  //     console.log('load' + this.songCurrent.nameSong);
  //     this.audioList[0].id = String(this.songCurrent.id);
  //     this.audioList[0].url = this.songCurrent.fileMp3;
  //     if (this.songCurrent.nameSong != null) {
  //       this.audioList[0].title = this.songCurrent.nameSong;
  //     }
  //     this.audioList[0].cover = this.songCurrent.fileImage;
  //   });
  // }
}
