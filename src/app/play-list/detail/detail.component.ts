import { Component, OnInit } from '@angular/core';
import {PlayList} from "../play-list";
import {IComment} from "../../comment/icomment";

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  playList: PlayList = {
    id: 0
  };
  // comment1: IComment = {
  //   content: '',
  //   user: {
  //
  //   }
  //
  // }
  constructor() { }

  ngOnInit(): void {
  }

}
