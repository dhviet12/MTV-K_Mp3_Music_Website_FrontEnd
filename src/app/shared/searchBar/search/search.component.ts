import { Component, OnInit } from '@angular/core';
import {AuthenService} from '../../../user/service/authen.service';
import {IUserToken} from '../../../user/model/IUserToken';
import {Router} from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  constructor(private authen: AuthenService) { }
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
}
