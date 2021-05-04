import { Component, OnInit } from '@angular/core';
import {PlayListService} from '../play-list.service';
import {AuthenService} from '../../user/service/authen.service';
import {ActivatedRoute, Router} from '@angular/router';
import {PlayList} from '../play-list';

@Component({
  selector: 'app-edit-playlist',
  templateUrl: './edit-playlist.component.html',
  styleUrls: ['./edit-playlist.component.scss']
})
export class EditPlaylistComponent implements OnInit {
  currentUser: any;
  id: any;
  username: any;
  playlist: PlayList = {
    id: 0,
    name: '',
    song: [],
    kindOfMusic: '',
    timeCreate: 0,
    description: '',
    timeUpdate: null,
    view: 1,
  };
  editSuccess = false;

  constructor(private playListService: PlayListService,
              private activatedRoute: ActivatedRoute,
              private authen: AuthenService,
              private router: Router) {
    this.authen.currentUser.subscribe(value => {
      this.currentUser = value;
      console.log(this.currentUser);
    });
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(async paramMap => {
      this.id = paramMap.get('id');
      console.log(this.id);
      this.username = paramMap.get('username');
      console.log(this.username);
      this.playListService.getPlayListById(this.id, this.username).subscribe(playlist => {
        this.playlist = playlist;
      });
    });
  }

  editPlaylist(id: any): any {
    alert('Sửa thành công');
    this.playListService.editPlayListById(id, this.currentUser.username, this.playlist).subscribe(() => {
      this.router.navigate(['/playlist']);
    });
  }

}
