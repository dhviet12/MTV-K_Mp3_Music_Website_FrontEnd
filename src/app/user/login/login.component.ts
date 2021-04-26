import { Component, OnInit } from '@angular/core';
import {AuthenService} from '../service/authen.service';
import {TokenStorageService} from '../service/tokenstorage.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: any = {
    username: null,
    password: null
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = 'Invalid Username or password';
  roles: string[] = [];



  constructor(private authenService: AuthenService, private token:TokenStorageService, private router:Router) { }

  ngOnInit(): void {
    if (this.token.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.token.getUser().roles;
    }
  }
  onSubmit(): void {
    const { username, password } = this.form;

    this.authenService.login(username, password).subscribe(
      data => {
        // @ts-ignore
        this.token.saveToken(data.accessToken);
        this.token.saveUser(data);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.token.getUser().roles;
        this.router.navigate(['/songs']);
      },
      err => {
        this.isLoginFailed = true;
      }
    );
  }

  reloadPage(): void {
    window.location.reload();
  }

}
