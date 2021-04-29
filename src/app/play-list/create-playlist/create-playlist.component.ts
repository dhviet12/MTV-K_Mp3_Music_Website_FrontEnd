import { Component, OnInit } from '@angular/core';
import {PlayList} from '../play-list';
import {PlayListService} from '../play-list.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthenService} from '../../user/service/authen.service';

@Component({
  selector: 'app-create-playlist',
  templateUrl: './create-playlist.component.html',
  styleUrls: ['./create-playlist.component.scss']
})
export class CreatePlaylistComponent implements OnInit {
  playlist: PlayList = {
    id: 0
  };
  currentUser: any;
  username: any;
  createSuccess = false;

  constructor(private playListService: PlayListService,
              private activatedRoute: ActivatedRoute,
              private authen: AuthenService,
              private router: Router) {
    this.authen.currentUser.subscribe(value => {
      this.currentUser = value;
    });
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(async paramMap => {
      this.username = paramMap.get('username');
      console.log(this.username);
    });
  }

  createPlayList(): any {
    return this.playListService.createNewPlayList(this.playlist, this.currentUser.username).subscribe( () => {
      this.router.navigate(['/playlist']);
    });
  }

}
