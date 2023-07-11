import { Component, Injectable, OnInit, ViewChild } from '@angular/core';
import { AlertController, MenuController, ModalController } from '@ionic/angular';
import { IonInfiniteScroll } from '@ionic/angular';
import { Network } from '@ionic-native/network/ngx';
import { NewsService } from '../../providers/news/news.service';
// import { Content } from "ionic-angular";
import { AdmobfreeService } from '../../providers/ad/admobfree.service';
import { APIService } from "../../providers/api/api.service";
import { CommonService } from "../../providers/common/common.service";
import { CenterService } from "../../providers/center/center.service";
import { AppVersion } from '@ionic-native/app-version/ngx';
import { UserService } from '../../providers/user/user.service';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { EventsService } from 'src/app/providers/events/events.service';
import { EncryptorService } from 'src/app/providers/encryptor/encryptor.service';
import { ActivatedRoute } from '@angular/router';
import { Platform} from '@ionic/angular';
import { ProfileEditComponent } from 'src/app/components/profile-edit/profile-edit.component';
import { AppupdateComponent } from 'src/app/components/appupdate/appupdate.component';
import * as moment from 'moment';
@Injectable({
  providedIn: 'root',
})
@Component({
  selector: 'app-news',
  templateUrl: './news.page.html',
  styleUrls: ['./news.page.scss'],
})
export class NewsPage implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  selectedTab = 'all';

    public platform_type:any;
  public app_info:any='';


  public news1 = { total: 10, verified: 2, rejected: 2, pending: 6 };
  public ad = { total: 10, verified: 2, rejected: 2, pending: 6 };
  public pages = { mypages: 10, following: 10 };

  public categoryOne = [
    // { title: 'Home', url: '/news/newshome', avatar:'assets/menu/EditFile.svg', icon: 'home' },
    { title: 'Post a News', url: '/news/addnews',avatar:'assets/menu/EditFile.svg', icon: 'newspaper' },
    { title: 'Post local ad', url: '/news/addnews/true', avatar:'assets/menu/GoogleAds.svg', icon: 'add-circle' },
    { title: 'Local News', url: '/news/localnews', avatar:'assets/menu/GoogleNews.svg',icon: 'globe' },
    { title: 'Categories', url: '/news/news-category',avatar:'assets/menu/Diversity.svg', icon: 'folder-open' },
	];
	public categoryTwo = [
		{ title: 'Magazines', url: '/news/magazine-page',avatar:'assets/menu/Magazine.svg', icon: 'document-text' },
		{ title: 'Quizzes', url: '/news/quiz-page',avatar:'assets/menu/Quiz.svg', icon: 'bulb' },
		{ title: 'Learn English', url: '',avatar:'assets/menu/Brick.svg', icon: 'easel' },
		{ title: 'Live Updates', url: '/news/live-updates', avatar:'assets/menu/YoutubeLive.svg',icon: 'easel' },
	];

	// public categoryThree = [
	// 	{ title: 'Local Shops', url: '/app/home/shopping', icon: 'bag-handle' },
	// 	{ title: 'Local Services', url: '/app/home/services', icon: 'bicycle' },
	// 	{ title: 'Local Products', url: '/app/home/products', icon: 'rocket' },
	// ];

	public dark = 'cloudy-night';
	public location = 'location';



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
		// village: "5ffde939528beb352afbbda6",
    	// mandal: "5ffde92b6563fd34c467edc4",
    	// district: "5ffde92b6563fd34c467edc3",
    	// state: "5ffde92916ae1e34a0a6965b"



		// Sample Data in location------->
		// district: "Krishna"
		// district_id: "5ffde92b6563fd34c467edd4"
		// mandal: "Mylavaram"
		// mandal_id: "5ffde92b6563fd34c467ee29"
		// state: "Andhra Pradesh"
		// state_id: "5ffde92916ae1e34a0a6965b"
		// village: "Mylavaram_Town"
		// village_id: "5ffde93a528beb352afbbe0a"
	}
	constructor(
		public router: Router,public modalCtrl: ModalController,
		public news:NewsService,
		public commin: CommonService,
		public center :CenterService,
		public admobFreeService: AdmobfreeService,
		public sanitizer: DomSanitizer,
		public events:EventsService,
		public user:UserService,
		public menu: MenuController,
		public activateroute: ActivatedRoute,
		 public storage: EncryptorService,
		 public api: APIService,public appVersion: AppVersion,public platform: Platform,

	)
	{
		this.platform.ready().then(() => {
      console.log('this.router.url',this.router.url);
        this.platform_type = this.platform.platforms();
        console.log('platform', this.platform_type);
//alert(this.platform_type);
          (window as any).plugins.OneSignal.setAppId("f39d26fb-6181-4555-9fc2-186d8674fddd");
        
          (window as any).plugins.OneSignal.getDeviceState((resp) => { 
          //  alert('resp.userId'+resp);
           if(resp.userId)
           {
           //  alert('resp.userId'+resp.userId);
             console.log('onesingal id',resp.userId);
             this.user.setOneSignalID(resp.userId);
           }
           })

      });

		if (user.isOkay()) {
			         // this.getUserData("1.1.1");
      this.appVersion
        .getVersionNumber()
        .then((app_version) => {

          //alert(app_version);
          
          this.getUserData(app_version);
        })
        .catch((err) => {
//          this.getUserData('');
        });
    }

		localStorage.setItem('landingpage', 'NewsHome');
	//	console.log('hiii'+this.user.userData.details.name);
		if(!localStorage.getItem('userData') && !this.user.isOkay())
		{
			this.router.navigateByUrl('signup', { replaceUrl: true });
		}
		else if(!localStorage.getItem('centerLocation'))
		{
			this.router.navigateByUrl('welcome', { replaceUrl: true });
		}
		else if(!localStorage.getItem('news-token'))
		{
			//alert('raj');
			this.commin.startLoader();
			var token = this.storage.getItem("api-token");
				this.api
          .postReq('/user/authorize/news_user',token)
          .then((data: any) => {
          		this.commin.stopLoader();
              this.user.setnewsToken(data.token);
             	window.location.reload();
             	//this.router.navigateByUrl('news', { replaceUrl: true });
          })
          .catch((err: any) => {
            });

		}
    else
    {
      //open news page
    }

		// console.log("State of the year",this.center.location.state);	
    this.preloader=true;
	//this.user.tabopen=false;
//	this.tabopenclose();

if (localStorage.getItem('theme') === 'dark') {
      document.body.setAttribute('color-theme', 'dark');
      localStorage.setItem('theme', 'dark');
      this.commin.isDarkTheme=true;
    } else {
      document.body.setAttribute('color-theme', 'light');
      localStorage.setItem('theme', 'light');
      this.commin.isDarkTheme=false;
    }


	}

	 closemenu()
  {
    this.menu.close();
   // alert('yes');
  }
  learnenglish()
  {
    this.router.navigate(['../news/news-category-view',{id:"624a9c36af98819f80d73b07",name:"Learn English"}]);
  }

	fetch_following(){
		this.news.postReq("/community/my-communities",{}).then((response:any) =>{
			this.following_community=response.data;
		})
	}
	openshopping()
	{
      this.router.navigateByUrl('app/home/shopping', { replaceUrl: true });
	}
	openservices()
	{
    this.router.navigateByUrl('app/home/services', { replaceUrl: true });
	}
		openproducts()
	{
    this.router.navigateByUrl('app/home/products', { replaceUrl: true });
	}
  newshome()
  {
    this.router.navigateByUrl('news/newshome', { replaceUrl: true });
  }
  newsfeed()
  {
    this.router.navigateByUrl('news/allnews', { replaceUrl: true });
  }



	getUserData(app_version) {
        let onesignal_id=this.user.getOneSignalID();
        let fcm_id=this.user.getFcmID();
        console.log('fcm_id',fcm_id);
    this.api
      .postReq('/user/check', {
        app_version,
        platform_type: this.platform_type,onesignal_id,
        fcm_news_token:fcm_id,
        type:'news'
      })
      .then((res: any) => {
        this.app_info = res.data;
        this.checkupdate();

      })
      .catch((err) => {
      
        if (err.code === 403) {
      
        }
      });
  }
checkupdate()
{
  let date = new  Date();
  let today_date =moment().format("DD-MM-YYYY");
  let local_date=localStorage.getItem("date");
	if(this.app_info.update && today_date!=local_date)
	{
      localStorage.setItem("date",today_date)
			this.appupdatemodel();
	}

}

async appupdatemodel(){
    const modal = await this.modalCtrl.create({
      component: AppupdateComponent,
      cssClass: 'editprofile',
      componentProps: {'app_info':this.app_info}
    });
    
    modal.onDidDismiss().then((data: any) => {
      
    });
    
    await modal.present();
  }


  Toggletheme(event) {
    if (event.detail.checked) {
      document.body.setAttribute('color-theme', 'dark');
      localStorage.setItem('theme', 'dark');
      this.commin.isDarkTheme=true;
    } else {
      document.body.setAttribute('color-theme', 'light');
      localStorage.setItem('theme', 'light');
      this.commin.isDarkTheme=false;
    }
  }

// 	
getcenterdata()
{
	this.api
              .postReq('/center', {})
              .then((res: any) => {
                if (res.status == 'success') {
                  this.center.setCenterData(res.data);

                } else {
                  this.commin.toastMsg('Something error occured');
                }
              })
              .catch((err) => {
               // this.commin.toastMsg(err.message);
              });
}

slideChanged()
{
	this.user.tabopen=false;
}

ionViewDidEnter()
{
  console.log("The",this.router.url)
  if (this.user.isOkay()) {
     
  }else{
    this.router.navigateByUrl('signup', { replaceUrl: true });
  }

}




isGuest(){
  return this.user.isGuestUser();
}
login() {
  this.router.navigateByUrl('signup', { replaceUrl: true });
}
 

	  

  homePage() {
    this.router.navigate(['news/quiz-page']);
  }

 
  create() {
    this.router.navigate(['news/news-tabs/news-dashboard']);
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
  openaddnews()
  {
  	 this.router.navigate(['news/addnews']);	
  }

  categorySettingsPage()
  {
    this.router.navigate(['news/category-settings']);	

  }

  tabopenclose()
  {	
	  this.user.tabopen = !this.user.tabopen;
  }
  // newsMenuOpen(){
	 //  this.newMenu = !this.newMenu;
	 //  this.menu.toggle();
  // }

  
	comm_page(id){
		this.router.navigate(['news/community/community-page',{"id":id}]);
	}



	logout() {
		this.commin.startLoader();
		this.user.logout(false).then(() => {
		  this.commin.stopLoader();
		  console.log('logged out');
      this.router.navigateByUrl('signup', { replaceUrl: true });
		});
	  }

	welcomePage(){
		this.router.navigate(['welcome']);
	}

	teckziteEventsPage(){
		this.router.navigate(['national-fests/event-page']);
	}




	
	  ngOnInit() {
	  	//console.log('hiidsdsdi'+this.user.userData.details.name);
	  	this.getcenterdata();
		//this.user.getUserDetails();
		this.center;
		this.user;
    this.menu.enable(true, 'newsMenu');
		this.fetch_following();
		setTimeout(() => {
  if(this.center.data.ads_display===true)
  {
    this.admobFreeService.showBannerAd();
  }

		  }, 5000);
		// this.slideChanged3();
		// this.slideChanged3();
		// this.slideChanged3();

  // comm_page(id) {
  //   this.router.navigate(['news/community/community-page', { id: id }]);
  // }

  // ngOnInit() {
  //   this.fetch_following();
  //   this.slideChanged3();
  //   // this.slideChanged3();
  //   // this.slideChanged3();
  //   // this.slideChanged3();
  // }
}
themechangealert()
{
	//alert('raj');
	//this.commin.toastMsg("Dark theme will be available on next version");
}
checkurl()
{
  console.log("urll",this.router.url)
}
ionViewWillEnter()
{
  console.log("The",this.router.url)
//	console.log('hiidsdsdi'+this.user.userData.details.name);
    this.menu.enable(true, 'newsMenu');
    this.menu.enable(false, 'shopping');
  //this.add_more_all_posts();
//alert('raaaa');
}
}
