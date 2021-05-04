import { Component, OnInit } from '@angular/core';
import {ISong} from '../../song/isong';
import {SongService} from '../../song/song.service';
import {Router} from '@angular/router';
import {PlayList} from '../play-list';
import {PlayListService} from '../play-list.service';

@Component({
  selector: 'app-top-playlist-new',
  templateUrl: './top-playlist-new.component.html',
  styleUrls: ['./top-playlist-new.component.scss']
})
export class TopPlaylistNewComponent implements OnInit {
  playList: PlayList[] = [];

  constructor(private playlistService:PlayListService, private router: Router) {
    this.topPlaylistNew();
  }

  ngOnInit(): void {
  }

  topPlaylistNew(): any {
    this.playlistService.getTop10PlaylistNew().subscribe(result => {
      this.playList = result;
    });
  }

}
