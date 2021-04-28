import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'songs',
    loadChildren: () => import('./song/song.module').then(module => module.SongModule)
  },
  {
    path: 'user',
    loadChildren: () => import('./user/user.module').then(module => module.UserModule)
  },
  {
    path: 'playlist',
    loadChildren: () => import('./play-list/play-list.module').then(module => module.PlayListModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
