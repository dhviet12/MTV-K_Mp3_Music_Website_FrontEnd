import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {ISong} from './song/isong';
import {DataService} from './shared/ dataTransmission/data.service';
import {PlayMusicComponent} from './shared/audio/play-music/play-music.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  constructor(private data: DataService) {
  }
  title = 'web-mp3-mtvk-fe';
  songCurrent: ISong = {
    id: 0
  };
  play = false;
  audioList = [{
    id: '1',
    url: 'https://firebasestorage.googleapis.com/v0/b/website-mp3-mtvk.appspot.com/o/mp3%2FD%E1%BA%ABu%20ng%C6%B0%E1%BB%9Di%20kh%C3%B4ng%20%C4%91%E1%BA%BFn.mp3?alt=media&token=2fcec32b-be8a-4ff7-91ec-6757469f27cd',
    title: 'Smaple 1',
    cover: 'https://i1.sndcdn.com/artworks-000249294066-uow7s0-t500x500.jpg',
    artist: 'Khải đẹp trai'
  }, {
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3',
    title: 'Sample 2',
    cover: 'https://avatar-nct.nixcdn.com/singer/avatar/2019/10/30/4/0/0/1/1572405540270_600.jpg'
  },
    {
      url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3',
      title: 'Sample 3',
      cover: 'https://lh3.googleusercontent.com/proxy/fZlb0nHY7vEQ0JMMaPaT5ZyTJ8k1DJQGZQ2xOSuGY104Xs2A8Os8leMzJqtOAMb8hJYuP54rnE6YU3JIp70YyLFrHGbMvMoOrqSwjxgmVzdXK8BfGZix8uZnr2HqbM7n'
    }];

  ngOnInit(): void {
    this.load();
  }
  load(): any{
    this.data.currentData.subscribe( songCurrent => {
      this.songCurrent = songCurrent;
      if ( this.songCurrent !== null){
        this.play = true;
      }
      console.log('load' + this.songCurrent.nameSong);
      this.audioList[0].url = this.songCurrent.fileMp3;
      if (this.songCurrent.nameSong != null) {
        this.audioList[0].title = this.songCurrent.nameSong;
      }
      this.audioList[0].cover = this.songCurrent.fileImage;
      // this.audio.play();
    });
  }
}
