import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ListCommentComponent} from './list-comment/list-comment.component';
import {CreateCommentComponent} from './create-comment/create-comment.component';
import {DeleteCommentComponent} from './delete-comment/delete-comment.component';
import {EditCommentComponent} from './edit-comment/edit-comment.component';

const routes: Routes = [
  {
    path: '',
    component: ListCommentComponent
  },
  {
    path: 'create',
    component: CreateCommentComponent
  },
  {
    path: 'edit/:id',
    component: EditCommentComponent
  },
  {
    path: 'delete/:id',
    component: DeleteCommentComponent
  },
  // {
  //   path: 'detail/:id',
  //   component: DetailComponent
  // },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommentRoutingModule { }
