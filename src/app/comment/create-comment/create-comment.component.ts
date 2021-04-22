import { Component, OnInit } from '@angular/core';
import {IComment} from '../icomment';

@Component({
  selector: 'app-create-comment',
  templateUrl: './create-comment.component.html',
  styleUrls: ['./create-comment.component.scss']
})
export class CreateCommentComponent implements OnInit {
  // listComment: IComment = {
  //
  // };
  currentUser: any;
  numberComment = 5;
  constructor() { }

  ngOnInit(): void {
  }

}
