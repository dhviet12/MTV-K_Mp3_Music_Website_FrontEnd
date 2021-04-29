import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PlaylistListComponent} from './playlist-list/playlist-list.component';
import {CreatePlaylistComponent} from './create-playlist/create-playlist.component';
import {EditPlaylistComponent} from './edit-playlist/edit-playlist.component';

const routes: Routes = [
  {
    path: '',
    component: PlaylistListComponent
  },
  {
    path: 'create/:username',
    component: CreatePlaylistComponent
  },
  {
    path: 'edit/:username',
    component: EditPlaylistComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlayListRoutingModule { }
