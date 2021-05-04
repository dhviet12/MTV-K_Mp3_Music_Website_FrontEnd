import { Component, OnInit } from '@angular/core';
import {AuthenService} from '../../../user/service/authen.service';
import {TokenStorageService} from '../../../user/service/tokenstorage.service';
import {Router} from '@angular/router';
import {DataService} from '../../ dataTransmission/data.service';
import {ISong} from '../../../song/isong';
import {SongService} from '../../../song/song.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  constructor(private authen: AuthenService,
              private tokenStorageService: TokenStorageService,
              private router: Router,
              private data: DataService) { }
  checkLogin = false;
  user: any;
  keyWord: any;
  ngOnInit(): void {
    this.login();
  }
  login(): any{
    if (this.authen.currentUserValue !== null){
      this.user = this.authen.currentUserValue;
      this.checkLogin = true;
    }
  }

  signOut(): void {
    this.tokenStorageService.signOut();
    window.location.reload();
  }

  getKeyWord(): any{
    console.log(this.keyWord);
    this.data.changeKeyWord(this.keyWord);
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    // @ts-ignore
    this.router.navigateByUrl('songs/search');
  }
}
