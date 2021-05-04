import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {MatSliderModule} from '@angular/material/slider';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';

import {UserModule} from './user/user.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {environment} from '../environments/environment';
import {AngularFireStorageModule} from '@angular/fire/storage';
import {AngularFireModule} from '@angular/fire';
import { LikesongComponent } from './likesong/likesong.component';
import {JwtInterceptor} from './user/helper/jwt.interceptor';
import {ErrorInterceptor} from './user/helper/error.interceptor';
import {SearchComponent} from './shared/searchBar/search/search.component';
import {TimeConversionPipe} from './shared/audio/pipes/time-conversion.pipe';
import {PlayMusicComponent} from './shared/audio/play-music/play-music.component';
import {SongModule} from './song/song.module';
import { SearchListComponent } from './shared/searchBar/search-list/search-list.component';
import {FormsModule} from '@angular/forms';
import {HomeComponent} from './shared/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    LikesongComponent,
    SearchComponent,
    TimeConversionPipe,
    PlayMusicComponent,
    SearchListComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NoopAnimationsModule,
    MatSliderModule,
    BrowserAnimationsModule,
    AngularFireStorageModule,
    AngularFireModule.initializeApp(environment.firebaseConfig, 'cloud'),
    SongModule,
    FormsModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true}
  ],
  exports: [
    AppComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
