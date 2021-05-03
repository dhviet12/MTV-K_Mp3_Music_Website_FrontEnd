import { Component, OnInit } from '@angular/core';
import {SongService} from '../song.service';
import {ISong} from '../isong';
import {ActivatedRoute, Router} from '@angular/router';
import {PlayListService} from '../../play-list/play-list.service';
import {AuthenService} from '../../user/service/authen.service';
import {PlayList} from '../../play-list/play-list';

@Component({
  selector: 'app-song-list',
  templateUrl: './song-list.component.html',
  styleUrls: ['./song-list.component.scss']
})
export class SongListComponent implements OnInit {

  currentUser: any;
  listPlaylist: PlayList[] = [];
  idSong: any;
  idPlaylist: any;
  keyword: any;
  songList: ISong[] = [];
  song: ISong = {
    id: 0
  };
  playlist: PlayList = {
    id: 0
  };

  constructor(private songService: SongService,
              private router: Router,
              private playListService: PlayListService,
              private authen: AuthenService,
              private activatedRoute: ActivatedRoute) {
    this.authen.currentUser.subscribe(value => {
      this.currentUser = value;
      console.log(this.currentUser);
      this.getAllPlaylistByUsername(this.currentUser.username);
    });
    this.getAllSong();
  }

  getAllSong(): any {
    return this.songService.getAllSong().subscribe( songs => {
      this.songList = songs;
    });
  }

  delSong(id: number): any {
    if (confirm('Bạn có chắc muốn xoá bài hát này ?')){
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

  getAllPlaylistByUsername(username: string): any {
    this.playListService.getPlaylistByUsername(username).subscribe(value => {
      this.listPlaylist = value;
    });
  }

  addSongToPlayList(idSong: number, idPlaylist: number): any {
    this.playListService.addSongToPlaylist(idSong, idPlaylist).subscribe(value => {
      if (value == null) {
        alert('Đã tồn tại bài hát trong playlist');
      } else {
        alert('Đã thêm bài hát vào playlist');
        this.getAllPlaylistByUsername(this.currentUser.username);
      }
    });
  }

  ngOnInit(): void {
  }
}
