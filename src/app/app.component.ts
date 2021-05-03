import { Component } from '@angular/core';
import {ISong} from './song/isong';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'web-mp3-mtvk-fe';
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
  // currentSongHandle(event: ISong): any{
  //   // this.audioList[0].id = event.id;
  //   console.log(event + 'xin chào');
  //   this.audioList[0].url = event.fileMp3;
  //   if (event.nameSong != null) {
  //     this.audioList[0].title = event.nameSong;
  //   }
  //   this.audioList[0].cover = event.fileImage;
  //   this.audioList[0].artist = event.singer;
  // }
}
