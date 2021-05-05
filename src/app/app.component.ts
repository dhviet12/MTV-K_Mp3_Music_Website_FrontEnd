import {Component, OnInit} from '@angular/core';
import {DataService} from './shared/ dataTransmission/data.service';
import {Audio} from './shared/audio/audio';
import {Router} from '@angular/router';
import {ISong} from './song/isong';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private data: DataService, private router: Router) {
  }

  title = 'web-mp3-mtvk-fe';
  play = false;
  audio: Audio = {};
  index: any;
  songCurrent: ISong = {
    id: 0
  };
  audioList: Audio[] = [];
  ngOnInit(): void {
    this.router.navigate(['/songs']);
    // this.loadDataMusic();
    // this.loadData();
  }
  loadDataMusic(): any{
    this.data.currentAlbum.subscribe( album => {
      if (album !== null && album !== []){
        this.audioList = album;
        console.log(this.audioList);
      }
    });
    this.data.currentData.subscribe(index => {
      if (index !== null) {
        this.index = index;
        console.log(this.index);
      }
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
