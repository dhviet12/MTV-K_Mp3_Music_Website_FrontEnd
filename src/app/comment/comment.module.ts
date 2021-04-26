import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommentRoutingModule } from './comment-routing.module';
import { ListCommentComponent } from './list-comment/list-comment.component';
import {FormsModule} from '@angular/forms';
import {MatSliderModule} from '@angular/material/slider';
import {MatExpansionModule} from '@angular/material/expansion';


@NgModule({
  declarations: [
    ListCommentComponent
  ],
  imports: [
    CommonModule,
    CommentRoutingModule,
    FormsModule,
    MatSliderModule,
    MatExpansionModule
  ]
})
export class CommentModule { }
