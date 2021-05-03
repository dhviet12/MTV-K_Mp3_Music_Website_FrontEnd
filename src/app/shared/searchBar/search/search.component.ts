import { Component, OnInit } from '@angular/core';
import {AuthenService} from '../../../user/service/authen.service';
import {IUserToken} from '../../../user/model/IUserToken';
import {Router} from '@angular/router';
import {TokenStorageService} from '../../../user/service/tokenstorage.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  constructor(private authen: AuthenService, private tokenStorageService:TokenStorageService) { }
  checkLogin = false;
  user: any;
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
}
