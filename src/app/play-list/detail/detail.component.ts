import { Component, OnInit } from '@angular/core';
import {PlayList} from '../play-list';
import {IComment} from '../../comment/icomment';
import {PlayListService} from '../play-list.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {FormBuilder, Validators} from '@angular/forms';
import {CommentService} from '../../comment/comment.service';
import {AuthenService} from '../../user/service/authen.service';
import {Subscription} from 'rxjs';

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
  checkUser = false;
  constructor(private playlistService: PlayListService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private formBuilder: FormBuilder,
              private commentService: CommentService,
              private authenService: AuthenService) {
    this.sub = this.activatedRoute.paramMap.subscribe((p: ParamMap) => {
      this.playList.id = Number(p.get('id'));
      this.getPlaylistById(this.playList.id);
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

  getAllCommentByPlaylistId(id: number){
    return this.commentService.getAllCommentByPlayListId(id).subscribe((listCommnet) => {
      this.comments = listCommnet;
    });
  }
  getPlaylistById(id: number): any{
    return this.playlistService.getPlaylistById(id).subscribe(p => {
      this.playList = p;
    });
  }
  // tslint:disable-next-line:typedef
  check() {
    if (this.authenService.currentUserValue == null){
      alert('Mời bạn đăng nhập để comment');
      this.router.navigateByUrl('user/login');
      return this.checkUser = false;
    }else {
      return this.checkUser = true;
    }}
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
    if (confirm('Bạn muốn xóa ?')){
      this.commentService.deleteCommentPlaylist(id).subscribe(() => {
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigateByUrl('playlist/detail/' + this.playList.id);
      });
    }
  }
  ngOnInit(): void {
  }

}
