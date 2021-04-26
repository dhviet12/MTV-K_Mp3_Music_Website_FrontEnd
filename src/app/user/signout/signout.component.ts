import { Component, OnInit } from '@angular/core';
import {TokenStorageService} from '../service/tokenstorage.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-signout',
  templateUrl: './signout.component.html',
  styleUrls: ['./signout.component.scss']
})
export class SignoutComponent implements OnInit {

  constructor(private tokenStorageService:TokenStorageService, private router:Router) { }

  ngOnInit(): void {
    this.tokenStorageService.signOut();
    this.router.navigate(['/login']);
  }

}
