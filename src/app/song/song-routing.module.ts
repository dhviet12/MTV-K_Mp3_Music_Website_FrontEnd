import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SongListComponent} from './song-list/song-list.component';
import {CreateSongComponent} from './create-song/create-song.component';
import {EditSongComponent} from './edit-song/edit-song.component';
import {SearchSongComponent} from './search-song/search-song.component';

const routes: Routes = [
  {
    path: '',
    component: SongListComponent
  },
  {
    path: 'edit/:id',
    component: EditSongComponent
  },
  {
    path: 'create',
    component: CreateSongComponent
  },
  {
    path: 'search-song',
    component: SearchSongComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SongRoutingModule { }
