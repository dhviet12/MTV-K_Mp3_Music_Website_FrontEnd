import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ListCommentComponent} from './list-comment/list-comment.component';

const routes: Routes = [
  {
    path: '',
    component: ListCommentComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommentRoutingModule { }
