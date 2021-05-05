import {Component, OnInit} from '@angular/core';
import {ISong} from '../../song/isong';
import {PlayListService} from '../play-list.service';
import {SongService} from '../../song/song.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthenService} from '../../user/service/authen.service';

@Component({
  selector: 'app-listsong-playlist',
  templateUrl: './listsong-playlist.component.html',
  styleUrls: ['./listsong-playlist.component.scss']
})
export class ListsongPlaylistComponent implements OnInit {
  listSong: ISong[] = [];
  currentUser: any;
  idPlaylist: any;

  constructor(private playListService: PlayListService,
              private songService: SongService,
              private authen: AuthenService,
              private route: Router,
              private activatedRoute: ActivatedRoute) {
    this.authen.currentUser.subscribe(value => {
      this.currentUser = value;
    });
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(paramMap => {
      this.idPlaylist = paramMap.get('id');
      this.songService.getSongsByPlaylistId(this.currentUser.username, this.idPlaylist).subscribe(list => {
        this.listSong = list;
      });
    });
  }

  deleteSong(id: number): any {
    if (confirm('Bạn chắc chắn xoá bài hát khỏi playlist không ?')) {
      this.songService.deleteSongOutPlaylist(this.idPlaylist, this.currentUser.username, id).subscribe(songs => {
        this.listSong = songs;
      });
    }
  }

}
