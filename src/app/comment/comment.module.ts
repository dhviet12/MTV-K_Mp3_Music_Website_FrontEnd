import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommentRoutingModule } from './comment-routing.module';
import { ListCommentComponent } from './list-comment/list-comment.component';
import {FormsModule} from '@angular/forms';


@NgModule({
  declarations: [
    ListCommentComponent
  ],
    imports: [
        CommonModule,
        CommentRoutingModule,
        FormsModule
    ]
})
export class CommentModule { }
