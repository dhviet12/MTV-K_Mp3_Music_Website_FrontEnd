import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'songs',
    loadChildren: () => import('./song/song.module').then(module => module.SongModule)
  },
<<<<<<< HEAD
  { path: 'signup',
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
=======
>>>>>>> 7e0dcdda9d608d45b28205ceea3578e465076019
  {
    path: 'user',
    loadChildren: () => import('./user/user.module').then(module => module.UserModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
