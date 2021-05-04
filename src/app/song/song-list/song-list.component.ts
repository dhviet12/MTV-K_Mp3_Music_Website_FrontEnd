import {Component, OnInit} from '@angular/core';
import {SongService} from '../song.service';
import {ISong} from '../isong';
import {DataService} from '../../shared/ dataTransmission/data.service';
import {Audio} from '../../shared/audio/audio';

@Component({
  selector: 'app-song-list',
  templateUrl: './song-list.component.html',
  styleUrls: ['./song-list.component.scss']
})
export class SongListComponent implements OnInit {
  constructor(private songService: SongService,
              private data: DataService) {
  }

  songList: ISong[] = [];
  album: Audio[] = [];
  audio: Audio = {};

  getAllSong(): any {
    return this.songService.getAllSong().subscribe(songs => {
      this.songList = songs;
      console.log(this.songList);
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < this.songList.length; i++) {
        const audio: Audio = {};
        audio.id = this.songList[i].id;
        audio.url = this.songList[i].fileMp3;
        audio.cover = this.songList[i].fileImage;
        audio.title = this.songList[i].nameSong;
        audio.artist = this.songList[i].singer;
        this.album.push(audio);
      }
      console.log(this.album);
    });
  }

  playSong(i: any): any {
    this.data.changeAlbum(this.album);
    this.data.changeData(i);
  }

  ngOnInit(): void {
    this.getAllSong();
  }
}

// xóa bái hát trên firebase
// delSong(): any{
//   const storageRef = this.storage.ref('mp3/');
//   storageRef.child('audio_xe_dap_oi.mp3').delete();
// }
