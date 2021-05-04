import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {PlaylistListComponent} from './playlist-list/playlist-list.component';
import {CreatePlaylistComponent} from './create-playlist/create-playlist.component';
import {EditPlaylistComponent} from './edit-playlist/edit-playlist.component';
import {DetailComponent} from './detail/detail.component';
import {ListsongPlaylistComponent} from './listsong-playlist/listsong-playlist.component';
import {TopPlaylistNewComponent} from './top-playlist-new/top-playlist-new.component';

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
    path: 'edit/:username/:id',
    component: EditPlaylistComponent
  },
  {
    path: 'detail/:id',
    component: DetailComponent
  },
  {
    path: 'listsongs/:username/:id',
    component: ListsongPlaylistComponent
  },
  {
    path: 'top10new',
    component: TopPlaylistNewComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlayListRoutingModule { }
