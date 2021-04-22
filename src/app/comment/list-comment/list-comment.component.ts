import { Component, OnInit } from '@angular/core';
import {IComment} from '../icomment';
import {CommentService} from '../comment.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-list-comment',
  templateUrl: './list-comment.component.html',
  styleUrls: ['./list-comment.component.scss']
})
export class ListCommentComponent implements OnInit {
  idComment = -1;
  listComment: IComment[] = [];
  currentUser: any;
  numberComment = 5;
  constructor(private commentService: CommentService,
              private router: Router) {
    this.getAllComment();
  }

  ngOnInit(): void {
  }

  // @ts-ignore
  private getAllComment(): IComment[] {
    this.commentService.getAllComment().subscribe(comments => {
      this.listComment = comments;
    });
    return this.listComment;
  }
}
