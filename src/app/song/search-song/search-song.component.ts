import { Component, OnInit } from '@angular/core';
import {SongService} from '../song.service';
import {ISong} from '../isong';

@Component({
  selector: 'app-search-song',
  templateUrl: './search-song.component.html',
  styleUrls: ['./search-song.component.scss']
})
export class SearchSongComponent implements OnInit {
  keyword: any;
  songList: ISong[] = [];

  constructor(private songService: SongService) {
    this.searchListSong();
  }

  ngOnInit(): void {
  }

  searchListSong(): any {
    this.songService.searchSong(this.keyword).subscribe(songList => {
      console.log(this.keyword);
      this.songList = songList;
      console.log(this.songList);
    });
  }

}
