import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SongRoutingModule } from './song-routing.module';
import { CreateSongComponent } from './create-song/create-song.component';
import { SongListComponent } from './song-list/song-list.component';
import { SongDetailComponent } from './song-detail/song-detail.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { EditSongComponent } from './edit-song/edit-song.component';
import {SearchSongComponent} from './search-song/search-song.component';


@NgModule({
  declarations: [
    CreateSongComponent,
    SongListComponent,
    SongDetailComponent,
    EditSongComponent,
    SearchSongComponent
  ],
  imports: [
    CommonModule,
    SongRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class SongModule { }
