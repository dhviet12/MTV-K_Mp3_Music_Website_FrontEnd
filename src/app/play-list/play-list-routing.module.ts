import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PlaylistListComponent} from './playlist-list/playlist-list.component';
import {CreatePlaylistComponent} from './create-playlist/create-playlist.component';

const routes: Routes = [
  {
    path: '',
    component: PlaylistListComponent
  },
  {
    path: 'create',
    component: CreatePlaylistComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlayListRoutingModule { }
