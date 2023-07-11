import { Component, OnInit } from '@angular/core';
import { NewsService } from 'src/app/providers/news/news.service';
import { CommonService } from 'src/app/providers/common/common.service';
import { Location } from '@angular/common';
@Component({
  selector: 'app-news-dashboard',
  templateUrl: './news-dashboard.page.html',
  styleUrls: ['./news-dashboard.page.scss'],
})
export class NewsDashboardPage implements OnInit {
  stats = [];
  constructor(
    public news: NewsService,
    public commin: CommonService,
    public location: Location
  ) {}

  stat() {
    this.news
      .postReq('/stats', {})
      .then((data: any) => {
        this.stats = data.data;
      })
      .catch((error: any) => {
        //this.commin.toastMsg('Stats we unable to fetch');
      });
  }
  myBackButton() {
    this.location.back();
  }

  ngOnInit() {
    this.stat();
  }
}
