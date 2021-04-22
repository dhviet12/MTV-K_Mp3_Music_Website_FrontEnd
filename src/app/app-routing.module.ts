import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'songs',
    loadChildren : () => import('./song/song.module').then(module => module.SongModule)
  },
  {
    path: '',
    loadChildren : () => import('./comment/comment.module').then(module => module.CommentModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
