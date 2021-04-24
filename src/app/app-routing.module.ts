import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RegisterComponent} from './user/register/register.component';
import {LoginComponent} from './user/login/login.component';

const routes: Routes = [
  {
    path: 'songs',
    loadChildren: () => import('./song/song.module').then(module => module.SongModule)
  },
  { path:'signup',
    component: RegisterComponent
  },
  {
    path:'login',
    component: LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
