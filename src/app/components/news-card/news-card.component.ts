import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NewsPage } from '../../pages/news/news.page';
@Component({
  selector: 'app-news-card',
  templateUrl: './news-card.component.html',
  styleUrls: ['./news-card.component.scss'],
})
export class NewsCardComponent implements OnInit {
  // @Input() news: any;

  news_data: any;
  public slideOpts: any = {
    direction: 'vertical',
    initialSlide: 0,
    grabCursor: true,
    cubeEffect: {
      shadow: true,
      slideShadows: true,
      shadowOffset: 20,
      shadowScale: 0.94,
    },
  };
  constructor(
    public router: Router,
    public activeroute: ActivatedRoute,
    public news: NewsPage
  ) {
    this.news_data = news.community_news_data;
  }

  newspage(index) {
    this.router.navigate(['news/news-page', { ind: index }]);
  }

  ngOnInit() {}
}
