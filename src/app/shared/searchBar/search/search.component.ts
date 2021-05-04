import {Component, OnInit} from '@angular/core';
import {AuthenService} from '../../../user/service/authen.service';
import {TokenStorageService} from '../../../user/service/tokenstorage.service';
import {Router} from '@angular/router';
import {DataService} from '../../ dataTransmission/data.service';
import {PlayListService} from '../../../play-list/play-list.service';
import {PlayList} from '../../../play-list/play-list';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  constructor(private authen: AuthenService,
              private tokenStorageService: TokenStorageService,
              private router: Router,
              private data: DataService,
              private playlistService: PlayListService) {
  }

  checkLogin = false;
  playlist: PlayList[] = [];
  albumSelected: PlayList = {
    id: 0
  };
  user: any;
  keyWord: any;
  songId: any;

  ngOnInit(): void {
    this.login();
    this.getAllPlayList();
  }

  login(): any {
    if (this.authen.currentUserValue !== null) {
      this.user = this.authen.currentUserValue;
      this.checkLogin = true;
    }
  }

  signOut(): void {
    this.tokenStorageService.signOut();
    window.location.reload();
  }

  getKeyWord(): any {
    console.log(this.keyWord);
    this.data.changeKeyWord(this.keyWord);
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    // @ts-ignore
    this.router.navigateByUrl('songs/search');
  }

  getAllPlayList(): any {
    this.playlistService.getAllPlayList(this.authen.currentUserValue.username).subscribe(playlist => {
      this.playlist = playlist;
      console.log(this.playlist);
    }, error => console.log(error));
  }

  addSongToAlbum(): any {
    this.data.currentSongAdd.subscribe(songId => {
      this.songId = songId;
    });
    this.playlistService.addSongToPlaylist(this.songId, this.albumSelected.id).subscribe(value => {
      if (value == null) {
        alert('Đã tồn tại bài hát trong playlist');
      } else {
        alert('Đã thêm bài hát vào playlist');
      }
    });
  }

}
