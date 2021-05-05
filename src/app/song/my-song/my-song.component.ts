import { Component, OnInit } from '@angular/core';
import {ISong} from '../isong';
import {SongService} from '../song.service';
import {AuthenService} from '../../user/service/authen.service';
import {Router} from '@angular/router';
import {DataService} from '../../shared/ dataTransmission/data.service';
import {Audio} from '../../shared/audio/audio';

@Component({
  selector: 'app-my-song',
  templateUrl: './my-song.component.html',
  styleUrls: ['./my-song.component.scss']
})

export class MySongComponent implements OnInit {
  constructor(private songService: SongService,
              private authen: AuthenService,
              private router: Router,
              private data: DataService) { }
  mySongs: ISong[] = [];
  album: Audio[] = [];
  ngOnInit(): void {
    this.songsOfCurrentUser();
  }
  songsOfCurrentUser(): any{
    const id = this.authen.currentUserValue.id;
    return this.songService.getSongsOfUserCurrent(id).subscribe( songs => {
      this.mySongs = songs;
      console.log(this.mySongs);
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
      console.log(this.album);
    });
  }

  playSong(i: any): any {
    this.data.changeAlbum(this.album);
    this.data.changeData(i);
  }
  delSong(id: number): any {
    if (confirm('Bạn có chắc muốn xoá bài hát này ?')){
      this.songService.delSong(id).subscribe( () => {
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigateByUrl('songs/my-song') ;
      });
    }
  }

  changeSongAdd(id: any): any{
    this.data.changeSong(id);
  }
}
