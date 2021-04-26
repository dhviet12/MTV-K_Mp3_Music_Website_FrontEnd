import { Component, OnInit } from '@angular/core';
import {SongService} from '../song.service';
import {ISong} from '../isong';
import {Router} from '@angular/router';

@Component({
  selector: 'app-top-songs-view',
  templateUrl: './top-songs-view.component.html',
  styleUrls: ['./top-songs-view.component.scss']
})
export class TopSongsViewComponent implements OnInit {
  songList: ISong[] = [];

  constructor(private songService: SongService, private router: Router) {
    this.topSongsView();
  }

  ngOnInit(): void {
  }

  topSongsView(): any {
    this.songService.topSongsView().subscribe(songList => {
      this.songList = songList;
    });
  }

  delSong(id: number): any {
    this.songService.delSong(id).subscribe( () => {
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.router.onSameUrlNavigation = 'reload';
      this.router.navigateByUrl('songs');
    });
  }

}
