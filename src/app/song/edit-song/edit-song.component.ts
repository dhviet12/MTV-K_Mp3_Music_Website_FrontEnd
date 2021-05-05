import {Component, OnInit} from '@angular/core';
import {ISong} from '../isong';
import {Observable, Subscription} from 'rxjs';
import {SongService} from '../song.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {finalize} from 'rxjs/operators';
import {AngularFireStorage} from '@angular/fire/storage';
import bsCustomFileInput from 'bs-custom-file-input';
import {FormBuilder, Validators} from '@angular/forms';
import {Icategory} from '../../model/icategory';
import {PlayList} from '../../play-list/play-list';
import {CategoryService} from '../../service/categoryService/category.service';
import {PlayListService} from '../../play-list/play-list.service';
import {AuthenService} from '../../user/service/authen.service';

@Component({
  selector: 'app-edit-song',
  templateUrl: './edit-song.component.html',
  styleUrls: ['./edit-song.component.scss']
})
export class EditSongComponent implements OnInit {
  constructor(private songService: SongService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private storage: AngularFireStorage,
              private fb: FormBuilder,
              private cateService: CategoryService,
              private playlistService: PlayListService,
              private authen: AuthenService
  ) {
    this.sub = this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      this.song.id = Number(paramMap.get('id'));
      this.getSongById(this.song.id);
    });
  }
  categories: Icategory[] = [];
  playList: PlayList[] = [];
  song: ISong = {
    id: 0
  };
  sub: Subscription;
  percentageMp3 = 0;
  percentageImg = 0;
  editSongForm = this.fb.group({
    nameSong: ['', [Validators.required, Validators.minLength(2),
      Validators.pattern('^[a-zA-Z0-9ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêếìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹý ]+$')]],
    fileImg: [''],
    fileMp3: ['', [Validators.required]],
    singer: ['', [Validators.required, Validators.minLength(2),
      Validators.pattern('^[a-zA-Z0-9ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêếìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹý ]+$')]],
    author: ['', [Validators.required, Validators.minLength(2),
      Validators.pattern('^[a-zA-Z0-9ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêếìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹý ]+$')]],
    description: ['', Validators.maxLength(300)],
    category: ['', [Validators.required]],
    playList: ['']
  });

  ngOnInit(): void {
    // hiển thị tên file trên thanh input file
    bsCustomFileInput.init();
    this.getAllCate();
    this.getAllPlayList();
  }

  upFileMp3(e: any): Observable<number | undefined> {
    const file = e.target.files[0];
    const fileName = file.name;
    const filePath = `mp3/${fileName}`;
    const storageRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);
    task.snapshotChanges().pipe(
      finalize(() => {
        storageRef.getDownloadURL().subscribe(URL => {
          this.song.fileMp3 = URL;
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
          this.song.fileImage = URL;
          console.log(this.song.fileImage);
        });
      })
    ).subscribe();
    return task.percentageChanges();
  }

  // tiến trình upload fileMp3
  processUploadMp3(e: any): void {
    this.upFileMp3(e).subscribe(
      percentage => {
        this.percentageMp3 = Math.round(percentage ? percentage : 0);
      }
    );
  }

  // tiến trình upload file Img
  processUploadImg(e: any): void {
    this.upFileImage(e).subscribe(
      percentage => {
        this.percentageImg = Math.round(percentage ? percentage : 0);
      }
    );
  }

  getSongById(id: number): any {
    return this.songService.getSongById(id).subscribe(song => {
      this.song = song;
    });
  }

  editSong(): any {
    if (confirm('Bạn có chắc chắn muốn sửa thông tin bài hát')) {
      return this.songService.editSong(this.song.id, this.song).subscribe(
        window.location.reload
      );
    }
  }

  getAllCate(): any{
    this.cateService.getAllCate().subscribe( categories => {
      this.categories = categories;
    });
  }
  getAllPlayList(): any {
    this.playlistService.getAllPlayList(this.authen.currentUserValue.username).subscribe(playlist => {
      this.playList = playlist;
      console.log(this.playList);
    }, error => console.log(error));
  }
}
