import { Component, OnInit } from '@angular/core';
import {SongService} from '../song.service';
import {ISong} from '../isong';

@Component({
  selector: 'app-song-list',
  templateUrl: './song-list.component.html',
  styleUrls: ['./song-list.component.scss']
})
export class SongListComponent implements OnInit {
  constructor(private songService: SongService) {
    this.getAllSong();
  }
  songList: ISong[] = [];
  getAllSong() {
    return this.songService.getAllSong().subscribe( songs => {
      this.songList = songs;
    });
  }
  delSong(id: number) {
    this.songService.delSong(id).subscribe( () => this.getAllSong() );
  }
  ngOnInit(): void {
  }
}
