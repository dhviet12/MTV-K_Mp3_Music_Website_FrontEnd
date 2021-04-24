import { Component, OnInit } from '@angular/core';
import {SongService} from '../song.service';
import {ISong} from '../isong';
import {Router} from '@angular/router';

@Component({
  selector: 'app-song-list',
  templateUrl: './song-list.component.html',
  styleUrls: ['./song-list.component.scss']
})
export class SongListComponent implements OnInit {
  constructor(private songService: SongService, private router: Router) {
    this.getAllSong();
  }
  songList: ISong[] = [];
  getAllSong(): any {
    return this.songService.getAllSong().subscribe( songs => {
      this.songList = songs;
    });
  }
  delSong(id: number): any {
    this.songService.delSong(id).subscribe( () => {
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.router.onSameUrlNavigation = 'reload';
      // @ts-ignore
      this.router.navigateByUrl('songs') ;
    });
  }
  ngOnInit(): void {
  }
}
