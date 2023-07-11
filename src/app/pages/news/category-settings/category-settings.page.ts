import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/providers/common/common.service';
import { NewsService } from 'src/app/providers/news/news.service';

@Component({
  selector: 'app-category-settings',
  templateUrl: './category-settings.page.html',
  styleUrls: ['./category-settings.page.scss'],
})
export class CategorySettingsPage implements OnInit {
  public categoryData = [];

  constructor(public news: NewsService, public commin: CommonService, public location: Location) {
    this.get_category_data();
  }

  ngOnInit() {}

  get_category_data() {
    this.news
      .getReq('/categories')
      .then((data: any) => {
        this.categoryData = data.data;
      })
      .catch((err: any) => {});
  }

  blockPushNotice(event: any, id: string) {
    console.log(event);
    this.news
      .postReq('/category/block_push_notify', {
        category_id: id,
        checked: event.detail.checked,
      })
      .then((data: any) => {})
      .catch((err: any) => {});
  }
  blockCategory(event: any, id: string) {
    console.log(event);
    this.news
      .postReq('/category/block_feed', {
        category_id: id,
        checked: event.detail.checked,
      })
      .then((data: any) => {})
      .catch((err: any) => {});
  }

  back(){
    this.location.back();
  }
}


