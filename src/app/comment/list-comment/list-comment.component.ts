import { Component, OnInit } from '@angular/core';
import {IComment} from '../icomment';
import {CommentService} from '../comment.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {any} from "codelyzer/util/function";
import {comment} from "postcss";


@Component({
  selector: 'app-list-comment',
  templateUrl: './list-comment.component.html',
  styleUrls: ['./list-comment.component.scss']
})
export class ListCommentComponent implements OnInit {
  sub: Subscription;
  id: any;
  panelOpenState = false;
  commentCreate: IComment = {
    id: 0,
    content: '',
    user: {
      fullName: ''
    }
  };
  commentEdit: IComment = {
    id: 0,
    content: '',
  }
  listComment: IComment[] = [];
  constructor(private commentService: CommentService,
              private router: Router,
              private activateRouter: ActivatedRoute) {
    this.getAllComment();
    this.sub = this.activateRouter.paramMap.subscribe((p: ParamMap) => {
      this.id = p.get('id');
      // this.getCommentById(this.id);
    });
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

  // tslint:disable-next-line:typedef
  create(){
    console.log(this.commentCreate.user.fullName);
    this.commentService.createComment(this.commentCreate).subscribe( c => {
      this.commentCreate = c;
      this.getAllComment();
    });
  }

  // tslint:disable-next-line:typedef
  // private getCommentById(id: any) {
  //   this.commentService.getCommentById(id).subscribe( c => {
  //     this.comment = c;
  //   });
  // }

  // tslint:disable-next-line:typedef
  edit(id: number){
    this.commentService.editComment(id, this.commentEdit  ).subscribe( () => {
      this.getAllComment();
    });
  }
  // tslint:disable-next-line:typedef
  public delete(id: number) {
    if (confirm('you want to delete?')){
      this.commentService.deleteComment(id).subscribe(() => {
         this.getAllComment();
      });
    }
  }
}
