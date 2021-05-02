import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'web-mp3-mtvk-fe';
  audioList = [{
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    title: 'Smaple 1',
    cover: 'https://i1.sndcdn.com/artworks-000249294066-uow7s0-t500x500.jpg'
  }, {
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3',
    title: 'Sample 2',
    // cover: 'https://i1.sndcdn.com/artworks-000249294066-uow7s0-t500x500.jpg'
    cover: 'https://avatar-nct.nixcdn.com/singer/avatar/2019/10/30/4/0/0/1/1572405540270_600.jpg'
  },
    {
      url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3',
      title: 'Sample 3',
      // cover: 'https://i1.sndcdn.com/artworks-000249294066-uow7s0-t500x500.jpg'
      cover: 'https://lh3.googleusercontent.com/proxy/fZlb0nHY7vEQ0JMMaPaT5ZyTJ8k1DJQGZQ2xOSuGY104Xs2A8Os8leMzJqtOAMb8hJYuP54rnE6YU3JIp70YyLFrHGbMvMoOrqSwjxgmVzdXK8BfGZix8uZnr2HqbM7n'
    }];
}
