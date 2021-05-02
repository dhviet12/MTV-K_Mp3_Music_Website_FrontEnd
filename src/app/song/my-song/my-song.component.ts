import { Component, OnInit } from '@angular/core';
import {ISong} from '../isong';
import {SongService} from '../song.service';
import {AuthenService} from '../../user/service/authen.service';

@Component({
  selector: 'app-my-song',
  templateUrl: './my-song.component.html',
  styleUrls: ['./my-song.component.scss']
})
export class MySongComponent implements OnInit {
  constructor(private songService: SongService,
              private authen: AuthenService) { }
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
}
