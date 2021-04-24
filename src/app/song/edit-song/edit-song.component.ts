import { Component, OnInit } from '@angular/core';
import {ISong} from '../isong';
import {Subscription} from 'rxjs';
import {SongService} from '../song.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {finalize} from 'rxjs/operators';
import {AngularFireStorage} from '@angular/fire/storage';

@Component({
  selector: 'app-edit-song',
  templateUrl: './edit-song.component.html',
  styleUrls: ['./edit-song.component.scss']
})
export class EditSongComponent implements OnInit {
  song: ISong = {};
  sub: Subscription;
  upFileMp3(e: any): any {
    const n = Date.now();
    const file = e.target.files[0];
    const filePath = `mp3/${n}`;
    const fileRef = this.storage.ref(filePath);
    this.storage.upload(filePath, file).snapshotChanges().pipe(finalize(() => {
        fileRef.getDownloadURL().subscribe(url => {
          this.song.fileMp3 = url;
          console.log(this.song.fileMp3);
        });
      })
    )
      .subscribe();
  }
  upFileImage(event: any): any {
    const n = Date.now();
    const file = event.target.files[0];
    const filePath = `image/${n}`;
    const fileRef = this.storage.ref(filePath);
    this.storage.upload(filePath, file).snapshotChanges().pipe(finalize(() => {
        fileRef.getDownloadURL().subscribe( url => {
          this.song.fileImage = url;
          console.log(this.song.fileImage);
        });
      })
    )
      .subscribe();
  }
  // tslint:disable-next-line:max-line-length
  constructor(private songService: SongService, private activatedRoute: ActivatedRoute, private router: Router, private storage: AngularFireStorage) {
    this.sub = this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      this.song.id = Number(paramMap.get('id'));
      this.getSongById(this.song.id);
    });
  }
  getSongById(id: number){
    return this.songService.getSongById(id).subscribe(song => {
      this.song = song;
    });
  }
  editSong(){
    return this.songService.editSong(this.song.id, this.song).subscribe(window.location.reload);
  }
  ngOnInit(): void {
  }
}
