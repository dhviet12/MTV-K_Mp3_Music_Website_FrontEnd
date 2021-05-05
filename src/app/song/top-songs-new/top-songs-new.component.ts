import {Component, Input, OnInit, Output} from '@angular/core';
import {ISong} from '../isong';
import {SongService} from '../song.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-top-songs-new',
  templateUrl: './top-songs-new.component.html',
  styleUrls: ['./top-songs-new.component.scss']
})
export class TopSongsNewComponent implements OnInit {
  songList: ISong[] = [];
  constructor(private songService: SongService, private router: Router) {
    this.topSongsNew();
  }

  ngOnInit(): void {
  }

  topSongsNew(): any {
    this.songService.topSongsNew().subscribe(songList => {
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
