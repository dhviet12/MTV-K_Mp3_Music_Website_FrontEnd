import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SongRoutingModule } from './song-routing.module';
import { CreateSongComponent } from './create-song/create-song.component';
import { SongListComponent } from './song-list/song-list.component';
import { SongDetailComponent } from './song-detail/song-detail.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { EditSongComponent } from './edit-song/edit-song.component';
import {TopSongsViewComponent} from './top-songs-view/top-songs-view.component';
import {TopSongsNewComponent} from './top-songs-new/top-songs-new.component';
import { MySongComponent } from './my-song/my-song.component';


@NgModule({
  declarations: [
    CreateSongComponent,
    SongListComponent,
    SongDetailComponent,
    EditSongComponent,
    TopSongsViewComponent,
    TopSongsNewComponent,
    MySongComponent
  ],
  imports: [
    CommonModule,
    SongRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class SongModule { }
