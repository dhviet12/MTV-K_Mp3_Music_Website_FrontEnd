import { Component, OnInit } from '@angular/core';
import {PlayList} from '../play-list';
import {PlayListService} from '../play-list.service';
import {Router} from '@angular/router';
import {AuthenService} from '../../user/service/authen.service';

@Component({
  selector: 'app-playlist-list',
  templateUrl: './playlist-list.component.html',
  styleUrls: ['./playlist-list.component.scss']
})
export class PlaylistListComponent implements OnInit {
  playlist: PlayList[] = [];
  currentUser: any;

  constructor(private playlistService: PlayListService,
              private route: Router,
              private authen: AuthenService) {
    this.authen.currentUser.subscribe(value => {
      this.currentUser = value;
    });
  }

  ngOnInit(): void {
    this.getAllPlayList();
  }

  getAllPlayList(): any {
    this.playlistService.getAllPlayList(this.currentUser.username).subscribe(playlist => {
      this.playlist = playlist;
      console.log(this.playlist);
    }, error => console.log(error));
  }

  createPlayList(): any {
    this.route.navigate(['/playlist/create/' + this.currentUser.username]);
  }

  deletePlayList(id: any): any {
    if (confirm('Bạn chắc chắn xoá không ?')) {
      this.playlistService.deletePlayListById(id, this.currentUser.username).subscribe( () => {
        this.getAllPlayList();
      });
    }
  }

}
