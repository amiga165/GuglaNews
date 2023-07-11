import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { NewsService } from 'src/app/providers/news/news.service';
@Component({
  selector: 'app-news-category',
  templateUrl: './news-category.page.html',
  styleUrls: ['./news-category.page.scss'],
})
export class NewsCategoryPage implements OnInit {

  categoryData:any = [];

  constructor(public location:Location,
              public router:Router,
              public news:NewsService) { }

  ngOnInit() {
    this.get_category_data();
  }
  back(){
    this.location.back();
  }

  view_category(cat_id,cat_name){
      this.router.navigate(['../news/news-category-view',{id:cat_id,name:cat_name}]);
  }

  get_category_data(){
    this.news
    .getReq('/categories')
    .then((data:any) => {
      this.categoryData = data.data;
    })
    .catch((err:any) => {

    })
  } 

}
