import { Component, OnInit } from '@angular/core';
import {IUser} from '../model/IUser';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {AngularFireStorage} from '@angular/fire/storage';
import {FormBuilder, Validators} from '@angular/forms';
import {UserService} from '../service/user.service';
import {Observable, Subscription} from 'rxjs';
import {finalize} from 'rxjs/operators';

@Component({
  selector: 'app-edit-profile-user',
  templateUrl: './edit-profile-user.component.html',
  styleUrls: ['./edit-profile-user.component.scss']
})
export class EditProfileUserComponent implements OnInit {
  user: IUser = {};
  sub: Subscription;

  editUserProfileForm = this.fb.group({
    fullName: ['', [Validators.required, Validators.minLength(2),
      Validators.pattern('^[a-zA-Z0-9ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêếìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹý ]+$')]],
    password: [''],
    address: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required]],
    avatar:['']
  });

  constructor( private activatedRoute: ActivatedRoute,
               private router: Router,
               private storage: AngularFireStorage,
               private fb: FormBuilder,
               private userServie: UserService) {
    this.sub = this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      this.user.id = Number(paramMap.get('id'));
      this.getUserById(this.user.id);
    });
  }

  ngOnInit(): void {
  }

  getUserById(id: number){
    return this.userServie.getUserProfileByID(id).subscribe(user =>{
      this.user = user;
    });
  }

  upFileAvatar(e: any)  {
    const file = e.target.files[0];
    const fileName = file.name;
    const filePath = `image/${fileName}`;
    const storageRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);
    task.snapshotChanges().pipe(
      finalize(() => {
        storageRef.getDownloadURL().subscribe(URL => {
          this.user.avatar = URL;
          console.log(this.user.avatar);
        });
      })
    ).subscribe();
  }

  editProfile(): any{
    return this.userServie.editUserProfile(this.user.id, this.user).subscribe(()=>{
      this.router.navigate(['/songs']);
    })
  }

}
