import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RegisterComponent} from './register/register.component';
import {LoginComponent} from './login/login.component';
import {SignoutComponent} from './signout/signout.component';
import {EditProfileUserComponent} from './edit-profile-user/edit-profile-user.component';

const routes: Routes = [
  {
    path: 'signup',
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
    path: 'profile',
    component: EditProfileUserComponent
  }
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {
}
