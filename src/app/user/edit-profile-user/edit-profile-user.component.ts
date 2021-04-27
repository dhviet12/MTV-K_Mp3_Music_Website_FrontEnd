import {Component, OnInit} from '@angular/core';
import {IUser} from '../model/IUser';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {AngularFireStorage} from '@angular/fire/storage';
import {FormBuilder, Validators} from '@angular/forms';
import {UserService} from '../service/user.service';
import {Observable, Subscription} from 'rxjs';
import {finalize} from 'rxjs/operators';
import {IUserToken} from '../model/IUserToken';
import {AuthenService} from '../service/authen.service';

@Component({
  selector: 'app-edit-profile-user',
  templateUrl: './edit-profile-user.component.html',
  styleUrls: ['./edit-profile-user.component.scss']
})
export class EditProfileUserComponent implements OnInit {
  userToken: IUserToken = {
    id: 0,
    username: '',
    password: '',
    fullName: '',
    address: '',
    email: '',
    phone: '',
    avatar: '',
    token: ''
  };
  // sub: Subscription;
  editUserProfileForm = this.fb.group({
    fullName: ['', [Validators.required, Validators.minLength(2),
      Validators.pattern('^[a-zA-Z0-9ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêếìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹý ]+$')]],
    password: [''],
    address: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required]],
    avatar: ['']
  });

  constructor( private activatedRoute: ActivatedRoute,
               private router: Router,
               private storage: AngularFireStorage,
               private fb: FormBuilder,
               private userService: UserService,
               private authen: AuthenService) {
    // this.sub = this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
    //   this.user.id = Number(paramMap.get('id'));
    //   this.getUserById(this.user.id);
    // });
    this.userToken = this.authen.currentUserValue;
    console.log(this.userToken);
  }

  ngOnInit(): void {
  }


  // getUserById(id: number){
  //   return this.userService.getUserProfileByID(id).subscribe(user =>{
  //     this.user = user;
  //   });
  // }

  upFileAvatar(e: any): any {
    const file = e.target.files[0];
    const fileName = file.name;
    const filePath = `image/${fileName}`;
    const storageRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);
    task.snapshotChanges().pipe(
      finalize(() => {
        storageRef.getDownloadURL().subscribe(URL => {
          this.userToken.avatar = URL;
          console.log(this.userToken.avatar);
        });
      })
    ).subscribe();
  }


  editProfile(): any{
    return this.userService.editUserProfile(this.userToken.id, this.userToken).subscribe(() => {
      this.router.navigate(['/songs']);

    });
  }
  changeClick(): any{
    // @ts-ignore
    document.getElementById('avatar').click();
  }
}
