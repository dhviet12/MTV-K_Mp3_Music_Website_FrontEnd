import { Component, OnInit } from '@angular/core';
import {ISong} from '../isong';
import {Subscription} from 'rxjs';
import {SongService} from '../song.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';

@Component({
  selector: 'app-song-detail',
  templateUrl: './song-detail.component.html',
  styleUrls: ['./song-detail.component.scss']
})
export class SongDetailComponent implements OnInit {
  song: ISong = {};
  sub: Subscription;
  constructor(private songService: SongService, private activatedRoute: ActivatedRoute, private router: Router) {
    this.sub = this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      this.song.id = Number(paramMap.get('id'));
      this.getSongById(this.song.id);
    });
  }
  getSongById(id: number){
    return this.songService.getSongById(id).subscribe(song =>{
      this.song = song;
    });
  }
  ngOnInit(): void {
  }

}
