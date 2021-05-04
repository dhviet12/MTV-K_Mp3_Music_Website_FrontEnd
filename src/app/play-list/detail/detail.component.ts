import { Component, OnInit } from '@angular/core';
import {PlayList} from '../play-list';
import {IComment} from '../../comment/icomment';
import {PlayListService} from '../play-list.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {FormBuilder, Validators} from '@angular/forms';
import {CommentService} from '../../comment/comment.service';
import {AuthenService} from '../../user/service/authen.service';
import {Subscription} from 'rxjs';
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
    },
    user: {
      id: 0,
      fullName: '',
      avatar: ''
    },
  };
  listSong: ISong[] = [];
  currentUser: any;
  idPlaylist: any;
  listPlaylist: PlayList[] = [];

  constructor(private playListService: PlayListService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private formBuilder: FormBuilder,
              private commentService: CommentService,
              private authenService: AuthenService,
              private songService: SongService) {
    this.authenService.currentUser.subscribe(value => {
      this.currentUser = value;
    });
    this.sub = this.activatedRoute.paramMap.subscribe((p: ParamMap) => {
      this.playList.id = Number(p.get('id'));
      this.getPlaylistById(this.playList.id);
      this.getAllCommentByPlaylist(this.playList.id);
      this.getPlaylistByIdAndUserName(this.playList.id, this.currentUser.username);
      // this.commentForm.get('user')?.setValue(this.authenService.currentPlaylistValue);
    });
  }
  commentForm = this.formBuilder.group({
    content: ['', [Validators.minLength(1), Validators.maxLength(500)]],
    playlist: [''],
    user: ['']
  });

  getAllCommentByPlaylist(id: number): any{
    return this.commentService.getAllCommentByPlayListId(id).subscribe((listCommnet) => {
      this.comments = listCommnet;
    });
  }
  getPlaylistById(id: number): any {
    return this.playListService.getPlaylistById(id).subscribe(p => {
      // @ts-ignore
      this.playList = p;
    });
  }
  getPlaylistByIdAndUserName(id: number, username: string): any {
    return this.playListService.getPlayListById(id, username).subscribe(playlist => {
      this.playList = playlist;
    });
  }
  createComment(): any {
    this.commentForm.get('playList')?.setValue(this.playList);
    return this.commentService.createCommentPlaylist(this.commentForm.value).subscribe(() => {
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

}
