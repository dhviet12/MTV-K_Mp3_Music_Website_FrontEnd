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
  keyword: any;
  songList: ISong[] = [];
  getAllSong(): any {
    return this.songService.getAllSong().subscribe( songs => {
      this.songList = songs;
    });
  }
  delSong(id: number): any {
    if(confirm("Bạn có chắc muốn xoá bài hát này ?")){
      this.songService.delSong(id).subscribe( () => {
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigateByUrl('songs') ;
      });
    }

  }
  // xóa bái hát trên firebase
  // delSong(): any{
  //   const storageRef = this.storage.ref('mp3/');
  //   storageRef.child('audio_xe_dap_oi.mp3').delete();
  // }
  searchSong(): any {
    this.songService.searchSong(this.keyword).subscribe(songList => {
      console.log(this.keyword);
      this.songList = songList;
      console.log(this.songList);
    });
  }
  ngOnInit(): void {
  }
}
