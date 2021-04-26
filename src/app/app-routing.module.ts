import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RegisterComponent} from './user/register/register.component';
import {LoginComponent} from './user/login/login.component';
import {SignoutComponent} from './user/signout/signout.component';

const routes: Routes = [
  {
    path: 'songs',
    loadChildren: () => import('./song/song.module').then(module => module.SongModule)
  },
  { path:'signup',
    component: RegisterComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'logout',
    component: SignoutComponent
  },
  {
    path:'user',
    loadChildren: () => import('./user/user.module').then(module => module.UserModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
