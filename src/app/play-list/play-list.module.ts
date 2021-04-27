import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlayListRoutingModule } from './play-list-routing.module';
import { PlaylistListComponent } from './playlist-list/playlist-list.component';
import { CreatePlaylistComponent } from './create-playlist/create-playlist.component';


@NgModule({
  declarations: [
    PlaylistListComponent,
    CreatePlaylistComponent
  ],
  imports: [
    CommonModule,
    PlayListRoutingModule
  ]
})
export class PlayListModule { }
