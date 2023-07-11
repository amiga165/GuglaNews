import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NewsService } from 'src/app/providers/news/news.service';

@Component({
  selector: 'app-live-updates',
  templateUrl: './live-updates.page.html',
  styleUrls: ['./live-updates.page.scss'],
})
export class LiveUpdatesPage implements OnInit {

  newsData:any = [];

  constructor(public location:Location,public news:NewsService) { 
    this.liveUpdatePosts();
  }

  ngOnInit() {
    
  }

  back(){
    this.location.back();
  }

  liveUpdatePosts(){
    this.news.
      postReq("/feed/post_type",{"post_type":"URLPost"})
      .then((response:any) => {
      this.newsData=response.data;
      console.log('live-upadtesdf'+JSON.stringify(response.data));
      })
      .catch((error:any) => {
      
      })
      
  
  }
}
