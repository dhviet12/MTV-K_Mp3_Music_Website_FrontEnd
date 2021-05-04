import {Component, OnInit} from '@angular/core';
import {PlayList} from '../play-list';
import {IComment} from '../../comment/icomment';
import {PlayListService} from '../play-list.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {FormBuilder, Validators} from '@angular/forms';
import {CommentService} from '../../comment/comment.service';
import {AuthenService} from '../../user/service/authen.service';
import {Subscription} from 'rxjs';
import {ILikePlaylist} from '../../likeplaylist/ILikePlaylist';
import {LikeplaylistService} from '../../likeplaylist/likeplaylist.service';

import {ISong} from '../../song/isong';
import {SongService} from '../../song/song.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  playList: PlayList = {
    id: 0
  };
  comments: IComment[] = [];
  sub: Subscription;
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

  // code cua Viet
  currentUser: any = localStorage.getItem('user');
  likePlaylist: ILikePlaylist = {
    user: this.authenService.currentUserValue,
    playlist: this.playList
  };

  likePlaylistForm = this.formBuilder.group(
    {
      user: [''],
      playList: ['']
    }
  );

  statusPlaylist: any = localStorage.getItem('statusPlaylist');


  listSong: ISong[] = [];
  // currentUser: any;
  idPlaylist: any;
  listPlaylist: PlayList[] = [];

  checkUser = false;

  constructor(private playlistService: PlayListService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private formBuilder: FormBuilder,
              private commentService: CommentService,
              private authenService: AuthenService,
              private likePlaylistService: LikeplaylistService,
              private songService: SongService) {
    this.authenService.currentUser.subscribe(value => {
      this.currentUser = value;
    });

    this.sub = this.activatedRoute.paramMap.subscribe((p: ParamMap) => {
      this.playList.id = Number(p.get('id'));
      this.getPlaylistById(this.playList.id);
      this.getAllCommentByPlaylistId(this.playList.id);

      // this.commentForm.get('user')?.setValue(this.authenService.currentPlaylistValue);

      // viet
      this.likePlaylistForm.get('user')?.setValue(this.authenService.currentUserValue);


      this.getPlaylistByIdAndUserName(this.playList.id, this.currentUser.username);
      // this.commentForm.get('user')?.setValue(this.authenService.currentPlaylistValue);

      this.getAllCommentByPlaylistId(this.playList.id);
      this.commentForm.get('createdBy')?.setValue(this.authenService.currentUserValue);
      console.log(this.authenService.currentUserValue);
    });
  }

  commentForm = this.formBuilder.group({
    content: ['', [Validators.minLength(1), Validators.maxLength(500)]],
    playList: [''],
    createdBy: ['']
  });

  getAllCommentByPlaylistId(id: number): any {
    return this.commentService.getAllCommentByPlayListId(id).subscribe((listCommnet) => {
      this.comments = listCommnet;
    });
  }

  getPlaylistByIdAndUserName(id: number, username: string): any {
    return this.playlistService.getPlayListById(id, username).subscribe(playlist => {
      this.playList = playlist;
    });
  }

  getPlaylistById(id: number): any {
    return this.playlistService.getPlaylistById(id).subscribe(p => {
      this.playList = p;
    });
  }

  // tslint:disable-next-line:typedef
  check() {
    if (this.authenService.currentUserValue == null) {
      alert('Mời bạn đăng nhập để comment');
      this.router.navigateByUrl('user/login');
      return this.checkUser = false;
    } else {
      return this.checkUser = true;
    }
  }

  // tslint:disable-next-line:typedef
  createComment() {
    this.commentForm.get('playList')?.setValue(this.playList);
    return this.commentService.createCommentPlaylist(this.commentForm.value).subscribe(() => {
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.router.onSameUrlNavigation = 'reload';
      this.router.navigateByUrl('playlist/detail/' + this.playList.id);
    });
  }

  // tslint:disable-next-line:typedef
  public delete(id: any) {
    if (confirm('Bạn muốn xóa ?')) {
      this.commentService.deleteCommentPlaylist(id).subscribe(() => {
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigateByUrl('playlist/detail/' + this.playList.id);
      });
    }
  }

  // tslint:disable-next-line:typedef
  edit(id: any) {
    prompt('Nội dung');
    this.commentService.editCommentPlaylist(id, this.comment).subscribe(() => {
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.router.onSameUrlNavigation = 'reload';
      this.router.navigateByUrl('playlist/detail/' + this.playList.id);
    });
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(paramMap => {
      this.idPlaylist = paramMap.get('id');
      this.songService.getSongsByPlaylistId(this.currentUser.username, this.idPlaylist).subscribe(list => {
        this.listSong = list;
      });
    });
  }

  deleteSong(id: number): any {
    if (confirm('Bạn chắc chắn xoá bài hát khỏi playlist không ?')) {
      this.songService.deleteSongOutPlaylist(this.idPlaylist, this.currentUser.username, id).subscribe(songs => {
        this.listSong = songs;
      });
    }
  }

  getAllPlaylistByUsername(username: string): any {
    this.playlistService.getPlaylistByUsername(username).subscribe(value => {
      this.listPlaylist = value;
    });
  }

  addSongToPlayList(idSong: number, idPlaylist: number): any {
    this.playlistService.addSongToPlaylist(idSong, idPlaylist).subscribe(value => {
      if (value == null) {
        alert('Đã tồn tại bài hát trong playlist');
      } else {
        alert('Đã thêm bài hát vào playlist');
        this.getAllPlaylistByUsername(this.currentUser.username);
      }
    });
  }

  // viet
  like(): any {
    localStorage.setItem('statusPlaylist', 'true');
    this.likePlaylistForm.get('playList')?.setValue(this.playList);
    return this.likePlaylistService.likePlaylist(this.likePlaylistForm.value).subscribe(() => {
      console.log(this.playList);
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.router.onSameUrlNavigation = 'reload';
      this.router.navigateByUrl('playlist/detail/' + this.playList.id);
      console.log(localStorage.getItem('statusPlaylist'));
      //
    });
  }

  unlike(): any {
    // @ts-ignore
    localStorage.setItem('statusPlaylist', null);
    return this.likePlaylistService.unlikePlaylist(this.playList.id).subscribe(() => {
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.router.onSameUrlNavigation = 'reload';
      this.router.navigateByUrl('playlist/detail/' + this.playList.id);
      console.log(localStorage.getItem('statusPlaylist'));
    });
  }


}
