import { Location } from '@angular/common';
import { Component, OnInit,ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CenterService } from 'src/app/providers/center/center.service';
import { NewsService } from 'src/app/providers/news/news.service';
import { UserService } from 'src/app/providers/user/user.service';
import { AlertController, IonSlides, MenuController, ModalController } from '@ionic/angular';
import { IonInfiniteScroll } from '@ionic/angular';
@Component({
  selector: 'app-news-category-view',
  templateUrl: './news-category-view.page.html',
  styleUrls: ['./news-category-view.page.scss'],
})
export class NewsCategoryViewPage implements OnInit {
@ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
@ViewChild(IonSlides, {static: false}) slides: IonSlides;

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
all_last_id='';
rep_id:any;
rep_name:any;
preloader=true;
  slidechanged=false;
  category = {
    id:''
  }
  category_name:any;
  formdata={
    "village": this.center.location.village_id,
    "mandal": this.center.location.mandal_id,
    "district": this.center.location.district_id,
    "state": this.center.location.state_id,
     "category":"",
     "last_id":"",
     "posted_by":""
  };

  category_data=[];

  constructor(public location:Location,
              public activeRoute:ActivatedRoute,
              public news:NewsService,public center:CenterService,
              public user:UserService) { }

  ngOnInit() {
    this.activeRoute.params.subscribe((data:any)=>{

        this.category.id = data.id;
         this.formdata.category=this.category.id;
         this.category_name=data.name;
          this.rep_id=data.rep_id
         this.formdata.posted_by = this.rep_id;
         this.rep_name=data.rep_name;

    });

    this.get_category_data();
  }


  back(){
    this.location.back();
  }
  slideChanged(e)
  {
     this.user.tabopen=false;
  this.slidechanged=true;
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
        this.get_category_data();
    }

  // }
  //alert('raj');
//  alert('raj');
}

    doRefresh(event) {
    this.formdata.last_id='';
    this.get_category_data();
   // console.log('Begin async operation');
    setTimeout(() => {
     // console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }

  get_category_data(){

  if(!this.all_last_id)
  {
   this.preloader=true;
  }
  this.formdata.last_id=this.all_last_id;
//  this.formdata.post_id='61c8105fc944fc30f80777ac';
  this.news.
    postReq("/feed",this.formdata)
    .then((data:any) => {
    this.preloader = false;
    // console.log(data);
    if (data.data.length){
    for (var i of data.data){
      this.category_data.push(i); 
    }
    this.all_last_id=this.category_data[this.category_data.length-1]._id;
    ////this.commin.toastMsg("News Fetched succesfully");
    // setTimeout(()=>{
   
    // },1000);
    
    // console.log(this.all_news_data);

  }
  else{
    //this.commin.toastMsg("That's all for now.");
 //   this.infiniteScroll.disabled = !this.infiniteScroll.disabled;

  }
  // this.preloader=false;
    })
    .catch((error:any) => {
    //  //this.commin.toastMsg("There was an error fecting the news");
    })




   
  }

  tabopenclose()
  { 
    this.user.tabopen = !this.user.tabopen;
  }

}
