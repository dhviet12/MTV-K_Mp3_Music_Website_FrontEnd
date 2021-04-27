import {Component, OnInit} from '@angular/core';
import {finalize} from 'rxjs/operators';
import {AngularFireStorage} from '@angular/fire/storage';
import {ISong} from '../isong';
import {SongService} from '../song.service';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import bsCustomFileInput from 'bs-custom-file-input';
import {FormBuilder, Validators} from '@angular/forms';
import {AuthenService} from '../../user/service/authen.service';

@Component({
  selector: 'app-create-song',
  templateUrl: './create-song.component.html',
  styleUrls: ['./create-song.component.scss']
})
export class CreateSongComponent implements OnInit{
  constructor(private storage: AngularFireStorage,
              private songService: SongService,
              private router: Router,
              private fb: FormBuilder,
              private authen: AuthenService
              ) {
    this.song.createdBy = this.authen.currentUserValue;
    console.log(this.song.createdBy);
  }
  song: ISong = {
    id: 0,
    createdBy: {
      id: 0,
      username: '',
      password: '',
      fullName: '',
      address: '',
      email: '',
      phone: '',
      avatar: '',
      token: '',
    }
  };
  percentageMp3 = 0;
  percentageImg = 0;
  creSongForm = this.fb.group({
    nameSong: ['', [Validators.required, Validators.minLength(2),
      Validators.pattern('^[a-zA-Z0-9ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêếìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹý ]+$')]],
    fileImg: [''],
    fileMp3: ['', [Validators.required]],
    singer: ['', [Validators.required, Validators.minLength(2),
      Validators.pattern('^[a-zA-Z0-9ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêếìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹý ]+$')]],
    author: ['', [Validators.required, Validators.minLength(2),
      Validators.pattern('^[a-zA-Z0-9ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêếìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹý ]+$')]],
    description: ['', Validators.maxLength(300)],
    createBy: ['']
  });
  ngOnInit(): void {
    // hiển thị tên file trên thanh input file
    bsCustomFileInput.init();
  }
  // up file mp3 lên firebase storage
  upFileMp3(e: any): Observable<number | undefined> {
    const file = e.target.files[0];
    const fileName = file.name;
    const filePath = `mp3/${fileName}`;
    const storageRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);
    task.snapshotChanges().pipe(
      finalize(() => {
        storageRef.getDownloadURL().subscribe(URL => {
          this.creSongForm.get('fileMp3')?.setValue(URL);
          console.log(this.song.fileMp3);
        });
      })
    ).subscribe();
    return task.percentageChanges();
  }
  // up file ảnh lên firebase storage
  upFileImage(e: any): Observable<number | undefined> {
    const file = e.target.files[0];
    const fileName = file.name;
    const filePath = `image/${fileName}`;
    const storageRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);
    task.snapshotChanges().pipe(
      finalize(() => {
        storageRef.getDownloadURL().subscribe(URL => {
          this.creSongForm.get('fileImg')?.setValue(URL);
          console.log(this.song.fileImage);
        });
      })
    ).subscribe();
    return task.percentageChanges();
  }
  // tiến trình upload fileMp3
  processUploadMp3(e: any): void{
    this.upFileMp3(e).subscribe(
      percentage => {
        this.percentageMp3 = Math.round(percentage ? percentage : 0);
      }
    );
  }
  // tiến trình upload file Img
  processUploadImg(e: any): void{
    this.upFileImage(e).subscribe(
      percentage => {
        this.percentageImg = Math.round(percentage ? percentage : 0);
      }
    );
  }
  createSong(): any {
    this.creSongForm.get('createBy')?.setValue(this.authen.currentUserValue);
    return this.songService.createBook(this.creSongForm.value).subscribe(() => {
      console.log(this.song);
      console.log(this.creSongForm.value);
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.router.onSameUrlNavigation = 'reload';
      // @ts-ignore
      this.router.navigateByUrl('songs/create') ;
    });
  }
}
