import {Component, OnInit} from '@angular/core';
import {SignUpForm} from '../model/SignUpForm';
import {FormControl, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthenService} from '../service/authen.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  form: any = {};
  // @ts-ignore
  signUp: SignUpForm;
  status = 'Please fill in the form';


  mess1: any = {
    message: 'Fail -> Username is already taken!'
  };
  mess2: any = {
    message: 'User registered successfully!'
  };


  constructor(private authenService: AuthenService, private router: Router) {
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.signUp = new SignUpForm(
      this.form.username ,
      this.form.password,
      this.form.fullName,
      this.form.address,
      this.form.email,
      this.form.phone
    );
    this.authenService.signUp(this.signUp).subscribe(data => {
      console.log('data', data);
      if (JSON.stringify(data) == JSON.stringify(this.mess1)) {
        this.status = 'Username is existed';
        alert(this.status)
      }
      if (JSON.stringify(data) == JSON.stringify(this.mess2)) {
        this.status = 'Created Successfully';
        alert(this.status);
        this.router.navigate(['/']);
      }
    });
  }

}
