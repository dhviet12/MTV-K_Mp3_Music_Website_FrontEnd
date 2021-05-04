import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ISong} from '../isong';
import {Subscription} from 'rxjs';
import {SongService} from '../song.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {FormBuilder, Validators} from '@angular/forms';
import {CommentService} from '../../comment/comment.service';
import {IComment} from '../../comment/icomment';
import {AuthenService} from '../../user/service/authen.service';
import {ILikeSong} from '../../likesong/ILikeSong';
import {LikeSongService} from '../../likesong/likesong.service';

import {PlayListService} from '../../play-list/play-list.service';
import {PlayList} from '../../play-list/play-list';

import {DataService} from '../../shared/ dataTransmission/data.service';

@Component({
  selector: 'app-song-detail',
  templateUrl: './song-detail.component.html',
  styleUrls: ['./song-detail.component.scss']
})
export class SongDetailComponent implements OnInit {
  song: ISong = {
    id: 0
  };
  playlist: PlayList = {
    id: 0
  };
  idPlaylist: any;
  // @ts-ignore
  comment: IComment = {
    content: '',
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
  checkUser = false;
  commentForm = this.formBuider.group({
    content: ['', [Validators.minLength(1), Validators.maxLength(500)]],
    song: [''],
    createdBy: ['']
  });
  comments: IComment[] = [];
  sub: Subscription;

  likeSongForm = this.formBuider.group(
    {
      user: [''],
      song: ['']
    }
  );
  likeSong: ILikeSong = {
    user: this.authen.currentUserValue,
    song: this.song
  };
  statusLike: any = localStorage.getItem('statusLike');

  currentUser: any = localStorage.getItem('user');

  listPlaylist: PlayList[] = [];

  constructor(private songService: SongService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private formBuider: FormBuilder,
              private commentService: CommentService,
              private authen: AuthenService,
              private likeSongService: LikeSongService,
              private playListService: PlayListService,
              private data: DataService) {
    this.authen.currentUser.subscribe(value => {
      this.currentUser = value;
      this.getAllPlaylistByUsername(this.currentUser.username);
    });
    this.sub = this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      this.song.id = Number(paramMap.get('id'));
      console.log(this.song.id);
      this.getSongById(this.song.id);
      this.getPlaylistById(this.playlist.id);
      this.getAllCommentByIdSong(this.song.id);
      this.commentForm.get('createdBy')?.setValue(this.authen.currentUserValue);
      ///
      this.likeSongForm.get('user')?.setValue(this.authen.currentUserValue);
      console.log(this.likeSong);
      console.log(this.currentUser);
      console.log(this.statusLike);

    });

  }

  getSongById(id: number): any {
    return this.songService.getSongById(id).subscribe(song => {
      this.song = song;
    });
  }

  ngOnInit(): void {}

  check(): any {
    if (this.authen.currentUserValue == null){
      alert('Mời bạn đăng nhập để comment');
      this.router.navigateByUrl('user/login');
      return this.checkUser = false;
    }else {
      return this.checkUser = true;
  }}
  createComment(): any {
    this.commentForm.get('song')?.setValue(this.song);
    return this.commentService.createComment(this.commentForm.value).subscribe(() => {
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.router.onSameUrlNavigation = 'reload';
      this.router.navigateByUrl('songs/detail/' + this.song.id);
    });
  }

  getAllCommentByIdSong(id: number): any {
    return this.commentService.getAllCommentBySongId(id).subscribe(commentList => {
      this.comments = commentList;
    });
  }
  //
  like(): any{
    localStorage.setItem('statusLike', 'true');
    this.likeSongForm.get('song')?.setValue(this.song);
    return this.likeSongService.likeSong(this.likeSongForm.value).subscribe(() => {
      console.log( this.likeSongForm);
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.router.onSameUrlNavigation = 'reload';
      this.router.navigateByUrl('songs/detail/' + this.song.id);
      console.log(localStorage.getItem('statusLike'));

      //
    });
  }

  unlike(): any {
    // @ts-ignore
    localStorage.setItem('statusLike', null);
    // this.statusLike = localStorage.getItem('statusLike')
    console.log('id song:', this.song.id);
    return this.likeSongService.unlikeSong(this.song.id).subscribe(() => {
      this.likeSongForm.get('canLike')?.setValue(true);
      console.log(this.likeSongForm);
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.router.onSameUrlNavigation = 'reload';
      this.router.navigateByUrl('songs/detail/' + this.song.id);
      console.log(localStorage.getItem('statusLike'));
    });
  }

  getPlaylistById(id: number): any {
    return this.playListService.getPlayListById(id, this.currentUser.username).subscribe(playlist => {
      this.playlist = playlist;
    });
  }

  getAllPlaylistByUsername(username: string): any {
    this.playListService.getPlaylistByUsername(username).subscribe(value => {
      this.listPlaylist = value;
    });
  }

  addSongToPlayList(idSong: number, idPlaylist: number): any {
    this.playListService.addSongToPlaylist(idSong, idPlaylist).subscribe(value => {
      if (value == null) {
        alert('Đã tồn tại bài hát trong playlist');
      } else {
        alert('Đã thêm bài hát vào playlist');
        this.getAllPlaylistByUsername(this.currentUser.username);
      }
    });
  }
  delSong(id: number): any {
    if (confirm('Bạn có chắc muốn xoá bài hát này ?')){
      this.songService.delSong(id).subscribe( () => {
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        alert('Đã xóa bài hát ' + this.song.nameSong);
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigateByUrl('songs/my-song') ;
      });
    }

  }
  playSong(song: any): any {
    // console.log(song);
    this.data.changeData(song);
  }

  // tslint:disable-next-line:typedef
  public delete(id: any) {
    if (confirm('Bạn muốn xóa ?')){
      this.commentService.deleteComment(id).subscribe(() => {
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigateByUrl('songs/detail/' + this.song.id);
      });
    }
  }
}
