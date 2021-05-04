import { Component, OnInit } from '@angular/core';
import {ISong} from '../isong';
import {SongService} from '../song.service';
import {AuthenService} from '../../user/service/authen.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-my-song',
  templateUrl: './my-song.component.html',
  styleUrls: ['./my-song.component.scss']
})
export class MySongComponent implements OnInit {
  constructor(private songService: SongService,
              private authen: AuthenService,
              private router: Router) { }
  mySongs: ISong[] = [];
  ngOnInit(): void {
    this.songsOfCurrentUser();
  }
  songsOfCurrentUser(): any{
    const id = this.authen.currentUserValue.id;
    return this.songService.getSongsOfUserCurrent(id).subscribe( songs => {
      this.mySongs = songs;
    });
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
}
