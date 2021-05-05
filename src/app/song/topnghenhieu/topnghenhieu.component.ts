import {Component, OnInit} from '@angular/core';
import {ISong} from '../isong';
import {SongService} from '../song.service';
import {Router} from '@angular/router';
import {Audio} from '../../shared/audio/audio';
import {DataService} from '../../shared/ dataTransmission/data.service';

@Component({
  selector: 'app-topnghenhieu',
  templateUrl: './topnghenhieu.component.html',
  styleUrls: ['./topnghenhieu.component.scss']
})
export class TopnghenhieuComponent implements OnInit {
  mySongs: ISong[] = [];
  album: Audio[] = [];

  constructor(private songService: SongService, private router: Router,
              private data: DataService) {
    this.topSongsNew();
  }

  ngOnInit(): void {
  }

  topSongsNew(): any {
    this.songService.topSongsNew().subscribe(songList => {
      this.mySongs = songList;
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < this.mySongs.length; i++) {
        const audio: Audio = {};
        audio.id = this.mySongs[i].id;
        audio.url = this.mySongs[i].fileMp3;
        audio.cover = this.mySongs[i].fileImage;
        audio.title = this.mySongs[i].nameSong;
        audio.artist = this.mySongs[i].singer;
        this.album.push(audio);
      }
    });
  }

  playSong(i: any): any {
    this.data.changeData(i);
    this.data.changeAlbum(this.album);
  }
}
