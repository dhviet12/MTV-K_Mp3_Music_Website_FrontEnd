import { Component, OnInit } from '@angular/core';
import {PlayList} from '../play-list';
import {PlayListService} from '../play-list.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-playlist-list',
  templateUrl: './playlist-list.component.html',
  styleUrls: ['./playlist-list.component.scss']
})
export class PlaylistListComponent implements OnInit {
  playlist: PlayList[] = [];

  constructor(private playlistService: PlayListService,
              private route: Router) { }

  ngOnInit(): void {
  }

}
