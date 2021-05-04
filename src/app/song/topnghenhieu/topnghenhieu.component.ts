import { Component, OnInit } from '@angular/core';
import {ISong} from '../isong';
import {SongService} from '../song.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-topnghenhieu',
  templateUrl: './topnghenhieu.component.html',
  styleUrls: ['./topnghenhieu.component.scss']
})
export class TopnghenhieuComponent implements OnInit {
  mySongs: ISong[] = [];

  constructor(private songService: SongService, private router: Router) {
    this.topSongsNew();
  }

  ngOnInit(): void {
  }

  topSongsNew(): any {
    this.songService.topSongsNew().subscribe(songList => {
      this.mySongs = songList;
    });
  }

}
