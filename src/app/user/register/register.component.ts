import { Component, OnInit } from '@angular/core';
import {SignUp} from '../model/signUp';
import {FormControl, Validators} from '@angular/forms';
import {FormSignUpService} from '../service/form-sign-up.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  form: any= {};
  // @ts-ignore
  signUp: SignUp;
  status= 'Please fill in the form';

  usernameValidate = new FormControl('',
    Validators.required)

  passwordValidate = new FormControl('',
    Validators.required)
  hide = true;
  mess1: any ={
    message: "Fail -> Username is already taken!"
  }
  mess2: any ={
    message: "User registered successfully!"
  }





  constructor(private formSignUpService:FormSignUpService) { }

  ngOnInit(): void {
  }
  onSubmit(){
    this.signUp= new SignUp(
      this.form.username,
      this.form.password,
      this.form.fullName,
      this.form.address,
      this.form.email,
      this.form.phone
    )
    this.formSignUpService.signUp(this.signUp).subscribe(data=>{
      console.log('data',data)
      if(JSON.stringify(data)== JSON.stringify(this.mess1)){
        this.status= 'Username is existed'
      }
      if(JSON.stringify(data)== JSON.stringify(this.mess2)){
        this.status= 'Created Successfully'
        alert(this.status)
      }
    })
  }

}
