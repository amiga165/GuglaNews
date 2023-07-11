import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { NewsService } from 'src/app/providers/news/news.service';
import { EventsService } from 'src/app/providers/events/events.service';
@Component({
  selector: 'app-view-news',
  templateUrl: './view-news.page.html',
  styleUrls: ['./view-news.page.scss'],
})
export class ViewNewsPage implements OnInit {

  data: any = {};
  newsData:any=[];
    preloader:boolean;

  constructor(public activateroute: ActivatedRoute,
              public news:NewsService,
              public events:EventsService,
              public navCtrl:NavController,
              public location:Location) {

                this.events.triggerBlockedPostsToRemove().subscribe((id:any) => {
                  console.log('id',id);
          // this.add_more_all_posts();
           this.navCtrl.back() 
           
                  
                })
          

    this.activateroute.params.subscribe((data: any) => {
      // console.log(data);
      this.data.id = data.id;
      this.data.name = data.name;

    });
  }

  ngOnInit(): void {
let post_id = this.activateroute.snapshot.paramMap.get('post_id');
if(post_id)
{
  //alert(post_id);
  this.data.id = post_id;
}
    this.getNewsPostItem();
}

  getNewsPostItem(){
	    this.preloader = true;
    // console.log(this.local_news_data);
    this.news.
      postReq("/post",{"post_id":this.data.id})
      .then((response:any) => {
        this.preloader = false;
      this.newsData=[response.data];
        console.log('hello'+this.newsData);
         if(!this.newsData)
         {
            this.location.back();
        } 

        
      })
      .catch((error:any) => {
      this.location.back();
      })
  }

  back(){
    this.location.back();
  }
  

}
