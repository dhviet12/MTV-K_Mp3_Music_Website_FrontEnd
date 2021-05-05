import {Component, Input, OnInit} from '@angular/core';
import {Icategory} from '../../model/icategory';
import {CategoryService} from '../../service/categoryService/category.service';
import {ISong} from '../../song/isong';
import {SongService} from '../../song/song.service';
import {Audio} from '../audio/audio';
import {DataService} from '../ dataTransmission/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  constructor(private cateService: CategoryService,
              private songService: SongService,
              private data: DataService) {
  }

  top10new: ISong[] = [];
  top10view: ISong[] = [];
  categories: Icategory[] = [];
  album: Audio[] = [];
  getAllCate(): any {
    this.cateService.getAllCate().subscribe(categories => {
      this.categories = categories;
    });
  }

  topSongsView(): any {
    this.songService.topSongsView().subscribe(songList => {
      this.top10view = songList;
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < this.top10view.length; i++) {
        const audio: Audio = {};
        audio.id = this.top10view[i].id;
        audio.url = this.top10view[i].fileMp3;
        audio.cover = this.top10view[i].fileImage;
        audio.title = this.top10view[i].nameSong;
        audio.artist = this.top10view[i].singer;
        this.album.push(audio);
      }
    });
  }

  topSongsNew(): any {
    this.songService.topSongsNew().subscribe(songList => {
      this.top10new = songList;
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < this.top10new.length; i++) {
        const audio: Audio = {};
        audio.id = this.top10new[i].id;
        audio.url = this.top10new[i].fileMp3;
        audio.cover = this.top10new[i].fileImage;
        audio.title = this.top10new[i].nameSong;
        audio.artist = this.top10new[i].singer;
        this.album.push(audio);
      }
    });
  }

  // hiển thi ảnh mặc định nếu file ảnh lỗi
  onImgError(event: any): any {
    event.target.src = './assets/my_img/test.png';
  }

  playSongsNew(i: any): any {
    this.data.changeAlbum(this.album);
    this.data.changeData(i);
  }

  playSongView(i: any): any {
    this.data.changeAlbum(this.album);
    this.data.changeData(i);
  }

  ngOnInit(): void {
    this.getAllCate();
    this.topSongsNew();
    this.topSongsView();
  }

}
