import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommentRoutingModule } from './comment-routing.module';
import { CreateCommentComponent } from './create-comment/create-comment.component';
import { ListCommentComponent } from './list-comment/list-comment.component';
import { DeleteCommentComponent } from './delete-comment/delete-comment.component';
import { EditCommentComponent } from './edit-comment/edit-comment.component';
import {FormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    CreateCommentComponent,
    ListCommentComponent,
    DeleteCommentComponent,
    EditCommentComponent
  ],
    imports: [
        CommonModule,
        CommentRoutingModule,
        FormsModule
    ]
})
export class CommentModule { }
