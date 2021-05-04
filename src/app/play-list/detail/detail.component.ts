import { Component, OnInit } from '@angular/core';
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

  //code cua Viet
  currentUser: any = localStorage.getItem('user');
  likePlaylist: ILikePlaylist = {
    user: this.authenService.currentUserValue,
    playlist: this.playList
  }

  likePlaylistForm = this.formBuilder.group(
    {
      user: [''],
      playlist: ['']
    }
  );

  statusPlaylist: any = localStorage.getItem('statusPlaylist');

  constructor(private playlistService: PlayListService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private formBuilder: FormBuilder,
              private commentService: CommentService,
              private authenService: AuthenService,
              private likePlaylistService: LikeplaylistService) {
    this.sub = this.activatedRoute.paramMap.subscribe((p: ParamMap) => {
      this.playList.id = Number(p.get('id'));
      this.getPlaylistById(this.playList.id);
      this.getAllCommentByPlaylist(this.playList.id);
      // this.commentForm.get('user')?.setValue(this.authenService.currentPlaylistValue);

      // viet
      this.likePlaylistForm.get('user')?.setValue(this.authenService.currentUserValue);
      console.log(this.playList.name);

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
    return this.playlistService.getPlaylistById(id).subscribe(p => {
      // @ts-ignore
      this.playList = p;
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
  }

  //viet
  like(): any{
    localStorage.setItem('statusPlaylist', 'true');
    this.likePlaylistForm.get('playlist')?.setValue(this.playList);
    return this.likePlaylistService.likePlaylist(this.likePlaylistForm.value).subscribe(() => {
      console.log( this.likePlaylistForm);
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
