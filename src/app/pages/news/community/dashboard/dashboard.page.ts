import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NewsService } from 'src/app/providers/news/news.service';
import { Location } from '@angular/common';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  community_data = [];
  constructor(
    public router: Router,
    public news: NewsService,
    public location: Location
  ) {}

  fetch() {
    this.news.postReq('/community/owned-communities', {}).then((data: any) => {
      this.community_data = data.data;
    });
  }

  myBackButton() {
    this.location.back();
  }

  createpost() {
    this.router.navigate(['news/community/create-post']);
  }

  ngOnInit() {
    this.fetch();
  }
}
