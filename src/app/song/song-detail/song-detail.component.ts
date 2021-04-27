import {Component, OnInit} from '@angular/core';
import {ISong} from '../isong';
import {Subscription} from 'rxjs';
import {SongService} from '../song.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {FormBuilder, Validators} from '@angular/forms';
import {CommentService} from '../../comment/comment.service';
import {IComment} from '../../comment/icomment';

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
    id: 0,
    content: '',
    song: {
      id: 0
    },
    user: {
      fullName: ''
    }
  };
  commentForm = this.formBuider.group({
    content: ['', [Validators.minLength(1), Validators.maxLength(500)]],
    song: [''],
    user: ['']
  });
  comments: IComment[] = [];
  sub: Subscription;

  constructor(private songService: SongService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private formBuider: FormBuilder,
              private commentService: CommentService) {
    this.sub = this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      this.song.id = Number(paramMap.get('id'));
      this.getSongById(this.song.id);
      this.getAllCommentByIdSong(this.song.id);
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

}
