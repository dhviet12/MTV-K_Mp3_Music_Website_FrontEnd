import { Component, OnInit } from '@angular/core';
import {AuthenService} from '../../../user/service/authen.service';
import {TokenStorageService} from '../../../user/service/tokenstorage.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  constructor(private authen: AuthenService, private tokenStorageService: TokenStorageService) { }
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
  getKeyWord(event: any): any{
    console.log(event.target.value);
  }
}
