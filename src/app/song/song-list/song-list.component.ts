import {Component, OnInit} from '@angular/core';
import {SongService} from '../song.service';
import {ISong} from '../isong';
import {Router} from '@angular/router';
import {DataService} from '../../shared/ dataTransmission/data.service';

@Component({
  selector: 'app-song-list',
  templateUrl: './song-list.component.html',
  styleUrls: ['./song-list.component.scss']
})
export class SongListComponent implements OnInit {
  constructor(private songService: SongService,
              private data: DataService) {
    this.getAllSong();
  }

  songList: ISong[] = [];

  getAllSong(): any {
    return this.songService.getAllSong().subscribe(songs => {
      this.songList = songs;
    });
  }

  // playSong(song: any): any {
  //   console.log(song);
  //   this.data.changeData(song);
  // }

  playAlbum(album: any): any {
    // console.log(album);
    this.data.changeAlbum(album);
  }

  // xóa bái hát trên firebase
  // delSong(): any{
  //   const storageRef = this.storage.ref('mp3/');
  //   storageRef.child('audio_xe_dap_oi.mp3').delete();
  // }
  ngOnInit(): void {
  }
}
