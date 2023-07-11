
import { Component,ViewEncapsulation, OnInit,Input, ViewChild, ElementRef} from '@angular/core';
import { Router } from '@angular/router';
import {CommonService} from 'src/app/providers/common/common.service';
import { IonSlides } from '@ionic/angular';

// import Swiper core and required modules
import SwiperCore, { EffectCreative} from "swiper";
import { NewsService } from 'src/app/providers/news/news.service';

// install Swiper modules
SwiperCore.use([EffectCreative]);

declare var document;
@Component({
  selector: 'app-magazine-post',
  templateUrl: './magazine-post.component.html',
  styleUrls: ['./magazine-post.component.scss']
})
export class MagazinePostComponent implements OnInit {

@Input() newsData: any;
@Input() type: any;
@Input() news_id: any;
@Input() time:any;
@Input() edit:any;
@Input() postData:any;

a:any;
counter=0;

@ViewChild(IonSlides, {static: false}) slides: IonSlides;

  constructor(public news:NewsService, public router:Router,public common:CommonService) { }

  updateCounter()
  {
    this.counter++
    console.log('count'+this.counter);
  }

  ngOnInit() {

    this.newsData=this.newsData;
    this.type=this.type;
    this.news_id=this.news_id;
    this.edit = this.edit;
    
    //console.log("magazine"+JSON.stringify(this.newsData))

    this.
    news.
    postReq("/post/post_action",{post_id:this.postData._id,action_type:"view" }).then((response:any) =>{
      // this.community_data=response.data;
      //this.community_data=response.data;

    })
    .catch(err=>{
      console.log(err)
    });
  }

  next(){
    const swiper = document.querySelector('.swiper').
    swiper;
    swiper.slideNext();
  }
  prev(){
    const swiper = document.querySelector('.swiper').
    swiper;
    swiper.slidePrev();
  }


  redirectToViewNews(){
    this.router.navigate(['../news/view-news',{ id: this.news_id, name: 'Magazine' }]);
  }

}
