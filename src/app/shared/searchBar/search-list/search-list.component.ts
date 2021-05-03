import { Component, OnInit } from '@angular/core';
import {ISong} from '../../../song/isong';
import {SongService} from '../../../song/song.service';
import {DataService} from '../../ dataTransmission/data.service';

@Component({
  selector: 'app-search-list',
  templateUrl: './search-list.component.html',
  styleUrls: ['./search-list.component.scss']
})
export class SearchListComponent implements OnInit {

  constructor(private songService: SongService,
              private data: DataService) { }
  keyWord = '';
  searchList: ISong[] = [];
  ngOnInit(): void {
    this.getKeyWord();
    this.searchSong();
  }
  getKeyWord(): any{
    this.data.keyWord.subscribe( keyWord => {
      // this.keyWord = keyWord.toString();
      console.log('key: ' + this.keyWord);
    });
  }
  searchSong(): any {
    this.songService.searchSong(this.keyWord).subscribe(searchList => {
      console.log(this.keyWord);
      this.searchList = searchList;
      console.log(this.searchList);
    });
  }
}
