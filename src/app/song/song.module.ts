import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SongRoutingModule } from './song-routing.module';
import { CreateSongComponent } from './create-song/create-song.component';
import { SongListComponent } from './song-list/song-list.component';
import { SongDetailComponent } from './song-detail/song-detail.component';
import {FormsModule} from '@angular/forms';


@NgModule({
  declarations: [
    CreateSongComponent,
    SongListComponent,
    SongDetailComponent
  ],
  imports: [
    CommonModule,
    SongRoutingModule,
    FormsModule
  ]
})
export class SongModule { }
