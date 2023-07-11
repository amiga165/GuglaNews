import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonInfiniteScroll, ModalController, Platform } from '@ionic/angular';
import { CreateCommunityComponent } from 'src/app/components/create-community/create-community.component';
import { CenterService } from 'src/app/providers/center/center.service';
import { NewsService } from 'src/app/providers/news/news.service';
import { UserService } from 'src/app/providers/user/user.service';

@Component({
  selector: 'app-groupnews',
  templateUrl: './groupnews.page.html',
  styleUrls: ['./groupnews.page.scss'],
})
export class GroupnewsPage implements OnInit {
@ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  preloader:boolean = false;

  public isModalOpen = false;
  public files = 'Select Photo or Video';
  public noData = {'name':'Will Update Soon'};

  constructor(
    public center :CenterService,
    public news:NewsService,
    public router:Router,
    public modalCtrl:ModalController,
    public user:UserService,
    public platform: Platform,
  ) {
    this.platform.ready().then(() => {
      if (this.platform.is('ios')) {
        this.noData = {'name':'No data found!'}; 
      }
      else{
      }
    })
  }



  async createCommunityModal() {
    const modal = await this.modalCtrl.create({
      component: CreateCommunityComponent,
      cssClass: 'community-modal'
    });

    modal.onDidDismiss().then((data) => {
      this.my_communities();
      //this.fetch_following();
    });

   return await modal.present();

  }

 
viewpage(com_id)
{
  //this.router.navigate(['news/community-page-view']);
  this.router.navigate(['news/community-page-view',{"id":com_id}]);
}

  


  // =========================================

  newsData:any;

  local_last_id=""
	all_last_id=""
	community_last_id=""

		
	local_news_data=[];
	all_news_data=[];
	community_news_data=[];

	following_community:any;
  suggested_community:any;
  owned_community:any;

  formdata={
		"village": this.center.location.village_id,
		"mandal": this.center.location.mandal_id,
		"district": this.center.location.district_id,
		"state": this.center.location.state_id,
		last_id:""
	}

  ngOnInit() {

   
    this.preloader = true;
    

    this.add_more_community_posts();
    this.fetch_following();
    this.suggested_communities()
    this.my_communities();
		//this.slideChanged3();

  

  }

  ionViewWillEnter(){
    this.user.tabopen = true;
      this.suggested_communities()
    this.my_communities();
  }


  add_more_community_posts(){


    this.formdata.last_id=this.community_last_id;
    
    this.news.
      postReq("/community/feed",this.formdata)
      .then((data:any) => {
  
        this.preloader = false;

        this.newsData = data.data;

      console.log("Coooooooo"+JSON.stringify(this.newsData));

      if (data.data.length){
      for (var i of data.data){
        this.community_news_data.push(i);	
      }
      this.community_last_id=this.community_news_data[this.community_news_data.length-1]._id;

      ////this.commin.toastMsg("News Fetched succesfully");
    //  this.add_more_community_posts()
    }
    else{
      ////this.commin.toastMsg("That's all for now.");
      this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
      return false;
  
    }
    
      })
      .catch((error:any) => {
      // //  //this.commin.toastMsg("There was an error fecting the news");
      this.preloader=false;

      })
    }

    fetch_following(){
  
      this.news.postReq("/community/my-communities",{}).then((response:any) =>{
        this.following_community=response.data;

    
      })

    }

    suggested_communities(){

      this.news.postReq("/community/suggested_communities",{}).then((response:any) =>{
        this.suggested_community=response.data;
        console.log("fffffff"+JSON.stringify(this.suggested_community));

 
      })
    }

    my_communities(){
      
  
      this.news.postReq("/community/owned-communities",{}).then((response:any) =>{
        this.owned_community=response.data;
        
        console.log("jjjjjjjj"+JSON.stringify(this.owned_community));

      })
    }


    
    communitydash() {
      this.router.navigate(['news/community/dashboard']);
    }
  
    communityprofile() {
      this.router.navigate(['news/community/profile']);
    }
  
    communitysearch() {
      this.router.navigate(['news/community/search']);
    }

    search(){
      this.router.navigate(['news/search']);
    }
  
    // doInfinite(event) {
    //   // this.add_more_local_posts();
    //   // this.add_more_all_posts();
    //   this.add_more_community_posts();
    //   console.log('adding more posts');
    // }

    // slideChanged3() {
    //   this.add_more_community_posts();
    // }

    comm_page(id:any){
      this.router.navigate(['news/community/community-page',{"id":id}]);
    }


    navigateToCommunityPage(id){

      this.router.navigate(['../news/community-page-view',{id:id}])

    }


}
 