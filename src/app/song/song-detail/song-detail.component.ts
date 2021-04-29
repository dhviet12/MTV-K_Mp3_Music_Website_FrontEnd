import {Component, OnInit} from '@angular/core';
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

@Component({
  selector: 'app-song-detail',
  templateUrl: './song-detail.component.html',
  styleUrls: ['./song-detail.component.scss']
})
export class SongDetailComponent implements OnInit {
  song: ISong = {
    id: 0
  };
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
  commentForm = this.formBuider.group({
    content: ['', [Validators.minLength(1), Validators.maxLength(500)]],
    song: [''],
    createdBy: ['']
  });
  comments: IComment[] = [];
  sub: Subscription;

  // @ts-ignore
  //


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

  constructor(private songService: SongService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private formBuider: FormBuilder,
              private commentService: CommentService,
              private authen: AuthenService,
              private likeSongService: LikeSongService) {
    this.sub = this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      this.song.id = Number(paramMap.get('id'));
      this.getSongById(this.song.id);
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

  ngOnInit(): void {
  }

  createComment() {
    this.commentForm.get('song')?.setValue(this.song);
    return this.commentService.createComment(this.commentForm.value).subscribe(() => {
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.router.onSameUrlNavigation = 'reload';
      this.router.navigateByUrl('songs/detail/' + this.song.id);
    });
  }

  getAllCommentByIdSong(id: number) {
    return this.commentService.getAllCommentBySongId(id).subscribe(commentList => {
      this.comments = commentList;
    });
  }

  //
  like() {
    localStorage.setItem('statusLike', 'true');
    this.likeSongForm.get('song')?.setValue(this.song);
    return this.likeSongService.likeSong(this.likeSongForm.value).subscribe(() => {
      console.log( this.likeSongForm);
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.router.onSameUrlNavigation = 'reload';
      this.router.navigateByUrl('songs/detail/' + this.song.id);
      console.log(localStorage.getItem('statusLike'))

      //
    });
  }

  unlike() {
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
      console.log(localStorage.getItem('statusLike'))
    });

  }


}
