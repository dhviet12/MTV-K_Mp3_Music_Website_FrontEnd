import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SongListComponent} from './song-list/song-list.component';
import {SongDetailComponent} from './song-detail/song-detail.component';
import {CreateSongComponent} from './create-song/create-song.component';

const routes: Routes = [
  {
    path: '',
    component: SongListComponent
  },
  {
    path: 'detail/:id',
    component: SongDetailComponent
  },
  {
    path: 'create',
    component: CreateSongComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SongRoutingModule { }
