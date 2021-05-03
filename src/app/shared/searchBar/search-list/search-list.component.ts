import { Component, OnInit } from '@angular/core';
import {ISong} from '../../../song/isong';
import {SongService} from '../../../song/song.service';

@Component({
  selector: 'app-search-list',
  templateUrl: './search-list.component.html',
  styleUrls: ['./search-list.component.scss']
})
export class SearchListComponent implements OnInit {

  constructor(private songService: SongService) { }
  keyword: any;
  songList: ISong[] = [];
  ngOnInit(): void {
  }
  searchSong(): any {
    this.songService.searchSong(this.keyword).subscribe(songList => {
      console.log(this.keyword);
      this.songList = songList;
      console.log(this.songList);
    });
  }
}
