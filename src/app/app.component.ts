import {Component, OnInit} from '@angular/core';
import {DataService} from './shared/ dataTransmission/data.service';
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
  play = false;
  audio: Audio = {};
  index: any;
  audioList: Audio[] = [{
    id: '',
    url: 'https://firebasestorage.googleapis.com/v0/b/website-mp3-mtvk.appspot.com/o/image%2Ftest.png?alt=media&token=b2ec78b2-db3d-427c-aed3-28b378e48afc',
    cover: 'https://firebasestorage.googleapis.com/v0/b/website-mp3-mtvk.appspot.com/o/mp3%2Fcha_oi_me_oi_con_lam_duoc_r_a_4674493149495671550.mp3?alt=media&token=8479d8de-f913-468d-8c2b-3f062e594588',
    title: 'Welcome',
    artist: 'MTV-K'
  }];
  ngOnInit(): void {
    this.router.navigate(['/songs']);
    this.loadDataMusic();
  }
  loadDataMusic(): any{
    this.data.currentAlbum.subscribe( album => {
      this.audioList = album;
      console.log(this.audioList);
    });
    this.data.currentData.subscribe(index => {
      this.index = index;
      console.log(this.index);
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
