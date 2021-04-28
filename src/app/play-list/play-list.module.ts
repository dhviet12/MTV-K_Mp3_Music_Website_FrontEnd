import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlayListRoutingModule } from './play-list-routing.module';
import { PlaylistListComponent } from './playlist-list/playlist-list.component';
import { CreatePlaylistComponent } from './create-playlist/create-playlist.component';
import {FormsModule} from '@angular/forms';
import { DetailComponent } from './detail/detail.component';

@NgModule({
  declarations: [
    PlaylistListComponent,
    CreatePlaylistComponent,
    DetailComponent
  ],
  imports: [
    CommonModule,
    PlayListRoutingModule,
    FormsModule
  ]
})
export class PlayListModule { }
