import { Component, Injectable, OnInit, ViewChild } from '@angular/core';
import { AlertController, MenuController, ModalController } from '@ionic/angular';
import { IonInfiniteScroll } from '@ionic/angular';
import { Network } from '@ionic-native/network/ngx';
import { NewsService } from '../../../providers/news/news.service';
// import { Content } from "ionic-angular";
import { AdmobfreeService } from '../../../providers/ad/admobfree.service';
import { APIService } from "../../../providers/api/api.service";
import { CommonService } from "../../../providers/common/common.service";
import { CenterService } from "../../../providers/center/center.service";
import { AppVersion } from '@ionic-native/app-version/ngx';
import { UserService } from '../../../providers/user/user.service';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { EventsService } from 'src/app/providers/events/events.service';

@Component({
  selector: 'app-localnews',
  templateUrl: './localnews.page.html',
  styleUrls: ['./localnews.page.scss'],
})
export class LocalnewsPage implements OnInit {
 @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
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

  slidechanged=false;
  newMenu = false;
  preloader=true

  local_last_id=""
  all_last_id=""
  community_last_id=""

    
  local_news_data=[];
  all_news_data=[];
  community_news_data=[];

  following_community=""
  formdata={
    "village": this.center.location.village_id,
    "mandal": this.center.location.mandal_id,
    "district": this.center.location.district_id,
    "state": this.center.location.state_id,
    last_id:""
  };

  constructor(
        public router: Router,
    public news:NewsService,
    public commin: CommonService,
    public center :CenterService,
    public admobFreeService: AdmobfreeService,
    public sanitizer: DomSanitizer,
  public events:EventsService,
  public user:UserService,
  public menu: MenuController
  ) {
    this.preloader=true;
  this.user.tabopen=true;

  //  alert('rajjjjj');
   }


slideChanged(e)
{
  this.user.tabopen=false;
  this.slidechanged=true;
}

doRefresh(event) {
    this.local_news_data=[];
    this.local_last_id='';
    
    this.add_more_local_posts();
   // console.log('Begin async operation');
    setTimeout(() => {
     // console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }

moreData(e)
{
  console.log('adding more posts1');
  
  // this.slideloadcount=this.slideloadcount+1;
  // if(this.slideloadcount==this.all_news_data.length-1)
  // {
    if(this.slidechanged==true)
    {
      this.slidechanged=false;
        this.add_more_local_posts();
    }

  // }
  //alert('raj');
//  alert('raj');
}

slideChanged1()
{
  //recently added 
}

  add_more_local_posts(){
  if(!this.local_last_id)
  {
   this.preloader=true;
  }

  this.formdata.last_id=this.local_last_id;
  // console.log(this.local_news_data);
  this.news.
    postReq("/local/feed",this.formdata)
    .then((data:any) => {
    this.preloader=false;
    // console.log(data);
    if (data.data.length){
    for (var i of data.data){
      this.local_news_data.push(i); 
    }
    this.local_last_id=this.local_news_data[this.local_news_data.length-1]._id;
  //  //this.commin.toastMsg("News Fetched succesfully");
  }
  else{
    ////this.commin.toastMsg("That's all for now.");
  }
    })
    .catch((error:any) => {
    //  //this.commin.toastMsg("There was an error fecting the news");
    })
    

}

 doInfinite(event) {
    // this.add_more_local_posts();
     this.add_more_local_posts();
    //this.add_more_community_posts();
    console.log('adding more posts');
  }



ngOnInit() {
  // setTimeout(() => {
  //     this.admobFreeService.showBannerAd();
  //     }, 5000);  
}

  tabopenclose()
  { 
    this.user.tabopen = !this.user.tabopen;
  }
  newsMenuOpen(){
    this.newMenu = !this.newMenu;
    this.menu.toggle();
  }

  
ionViewWillEnter()
{
  this.user.isHome=false;
  this.add_more_local_posts();
//alert('raaaa');
}
}
