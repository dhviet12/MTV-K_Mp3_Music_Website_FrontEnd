import {Component, OnInit} from '@angular/core';
import {finalize} from 'rxjs/operators';
import {AngularFireStorage} from '@angular/fire/storage';
import {ISong} from '../isong';
import {SongService} from '../song.service';
import {Router} from '@angular/router';
import firebase from 'firebase';

@Component({
  selector: 'app-create-song',
  templateUrl: './create-song.component.html',
  styleUrls: ['./create-song.component.scss']
})
export class CreateSongComponent {
  song: ISong = {};
  audioFile: any;
  getFile(e: any): any{
    this.audioFile = e.target.files[0];
  }
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
  constructor(private storage: AngularFireStorage, private songService: SongService, private router: Router) {
  }
  createSong(): any {
    return this.songService.createBook(this.song).subscribe(() => {
      console.log(this.song);
      this.router.navigate(['/songs/create']);
    });
  }
}
