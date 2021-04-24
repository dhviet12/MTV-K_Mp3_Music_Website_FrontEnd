import { Component, OnInit } from '@angular/core';
import {ISong} from '../isong';
import {Observable, Subscription} from 'rxjs';
import {SongService} from '../song.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {finalize} from 'rxjs/operators';
import {AngularFireStorage} from '@angular/fire/storage';
import bsCustomFileInput from 'bs-custom-file-input';

@Component({
  selector: 'app-edit-song',
  templateUrl: './edit-song.component.html',
  styleUrls: ['./edit-song.component.scss']
})
export class EditSongComponent implements OnInit {
  constructor(private songService: SongService,
              private activatedRoute: ActivatedRoute,
              private router: Router, private storage: AngularFireStorage) {
    this.sub = this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      this.song.id = Number(paramMap.get('id'));
      this.getSongById(this.song.id);
    });
  }
  song: ISong = {};
  sub: Subscription;
  percentageMp3 = 0;
  percentageImg = 0;
  ngOnInit(): void {
    // hiển thị tên file trên thanh input file
    bsCustomFileInput.init();
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
  getSongById(id: number): any{
    return this.songService.getSongById(id).subscribe(song => {
      this.song = song;
    });
  }
  editSong(): any{
    return this.songService.editSong(this.song.id, this.song).subscribe(window.location.reload);
  }
}
