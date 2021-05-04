import { Component, OnInit } from '@angular/core';
import {Icategory} from '../../model/icategory';
import {CategoryService} from '../../service/categoryService/category.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  constructor(private cateService: CategoryService) { }
  categories: Icategory[] = [];
  getAllCate(): any{
    this.cateService.getAllCate().subscribe( categories => {
      this.categories = categories;
    });
  }
  onImgError(event: any): any {
    event.target.src = './assets/my_img/test.png';
  }
  ngOnInit(): void {
    this.getAllCate();
  }

}
