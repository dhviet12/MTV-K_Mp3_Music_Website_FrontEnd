import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SongListComponent} from './song-list/song-list.component';
import {CreateSongComponent} from './create-song/create-song.component';
import {EditSongComponent} from './edit-song/edit-song.component';
import {TopSongsViewComponent} from './top-songs-view/top-songs-view.component';
import {TopSongsNewComponent} from './top-songs-new/top-songs-new.component';
import {SongDetailComponent} from './song-detail/song-detail.component';

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
    path: 'detail/:id',
    component: SongDetailComponent
  },
  {
    path: 'top10songsview',
    component: TopSongsViewComponent
  },
  {
    path: 'top10songsnew',
    component: TopSongsNewComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SongRoutingModule { }
