import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import {HttpClientModule} from '@angular/common/http';
import { RegisterComponent } from './register/register.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { SignoutComponent } from './signout/signout.component';
import { EditProfileUserComponent } from './edit-profile-user/edit-profile-user.component';


@NgModule({
  declarations: [
    RegisterComponent,
    LoginComponent,
    SignoutComponent,
    EditProfileUserComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    HttpClientModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class UserModule { }
