import { Component, OnInit } from '@angular/core';
import {ISong} from '../isong';
import {SongService} from '../song.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-topthinhhanh',
  templateUrl: './topthinhhanh.component.html',
  styleUrls: ['./topthinhhanh.component.scss']
})
export class TopthinhhanhComponent implements OnInit {
  mySongs: ISong[] = [];

  constructor(private songService: SongService, private router: Router) {
    this.topSongsView();
  }

  ngOnInit(): void {
  }

  topSongsView(): any {
    this.songService.topSongsView().subscribe(songList => {
      this.mySongs = songList;
    });
  }

}
