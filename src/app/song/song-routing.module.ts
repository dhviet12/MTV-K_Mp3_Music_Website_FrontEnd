import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SongListComponent} from './song-list/song-list.component';
import {CreateSongComponent} from './create-song/create-song.component';
import {EditSongComponent} from './edit-song/edit-song.component';
import {TopSongsViewComponent} from './top-songs-view/top-songs-view.component';
import {TopSongsNewComponent} from './top-songs-new/top-songs-new.component';
import {SongDetailComponent} from './song-detail/song-detail.component';
import {HomeComponent} from '../shared/home/home.component';
import {MySongComponent} from './my-song/my-song.component';
import {SearchListComponent} from '../shared/searchBar/search-list/search-list.component';
import {TopthinhhanhComponent} from './topthinhhanh/topthinhhanh.component';
import {TopnghenhieuComponent} from './topnghenhieu/topnghenhieu.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'search',
    component: SearchListComponent
  },
  {
    path: 'my-song',
    component: MySongComponent
  },
  {
    path: 'list',
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
    path: 'top10/view',
    component: TopthinhhanhComponent
  },
  {
    path: 'top10/new',
    component: TopnghenhieuComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SongRoutingModule {
}
