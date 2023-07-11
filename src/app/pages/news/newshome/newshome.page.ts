import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CenterService } from 'src/app/providers/center/center.service';
import { CommonService } from 'src/app/providers/common/common.service';
import { NewsService } from 'src/app/providers/news/news.service';
import { UserService } from 'src/app/providers/user/user.service';
import { APIService } from 'src/app/providers/api/api.service';
import { AppVersion } from '@ionic-native/app-version/ngx';
import { Platform} from '@ionic/angular';
import { EventsService } from 'src/app/providers/events/events.service';
@Component({
  selector: 'app-newshome',
  templateUrl: './newshome.page.html',
  styleUrls: ['./newshome.page.scss'],
})
export class NewshomePage implements OnInit {
  public news1 = { total: 10, verified: 2, rejected: 2, pending: 6 };
  public ad = { total: 10, verified: 2, rejected: 2, pending: 6 };
  public pages = { mypages: 10, following: 10 };

  preloader: boolean;
  refresh: boolean = false;
  public formdata: any;

  public liveData: any = [];
  public platform_type: any;
  public app_info: any = '';
  public categoryData: any = [];

  referral_code: any;

  constructor(
    public router: Router,
    public api: APIService,
    public appVersion: AppVersion,
    public center: CenterService,
    public platform: Platform,
    public user: UserService,
    public commin: CommonService,
    
    public events:EventsService,
    public news: NewsService) {


      this.events.triggerBlockedPostsToRemove().subscribe((id:any) => {
        console.log('id',id);
      this.all_last_id='';
      this.all_news_data=[];
        this.add_more_all_posts();

        
      })


      this.get_category_data();
     this.platform.ready().then(() => {
        this.platform_type = this.platform.platforms();
        console.log('platform', this.platform_type);
      });

    if (user.isOkay()) {
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
  }

  optionsForSlides = {
    initialSlide: 0,
    slidesPerView: 3,
    spaceBetween: 20,
  };

  options = {
    slidesPerView: 4,
    spaceBetween: 10,
    slidesOffsetBefore: 0,
  };

  public filterSlides = [
    {
      name: 'Local News',
      img: 'assets/news-imgs/News.png',
      url: '/news/localnews',
    },
    {
      name: 'News Feed',
      img: 'assets/news-imgs/Activity_Feed.png',
      url: '/news/allnews',
    },
    {
      name: 'Quizzes',
      img: 'assets/news-imgs/Test.png',
      url: '/news/quiz-page',
    },
    {
      name: 'Magazines',
      img: 'assets/news-imgs/Magazine.png',
      url: '/news/magazine-page',
    },
    // { name: 'Community', img:'assets/news-imgs/User_Groups.png',url: '/news/groupnews' },
  ];

  all_last_id = '';

  all_news_data = [];

  ngOnInit() {
    console.log('centerrr' + JSON.stringify(this.center.data));
    this.liveUpdatePosts();
    this.getMyreferraldata();
    this.formdata = {
      village: this.center.location.village_id,
      mandal: this.center.location.mandal_id,
      district: this.center.location.district_id,
      state: this.center.location.state_id,
      last_id: '',
    };

    // this.add_more_all_posts();
  }

  //  Referral code
  getMyreferraldata() {
    this.api
      .postReq('/user/myreferrals', {})
      .then((res: any) => {
        this.referral_code = res.data.referral_code;
      })
      .catch((err) => {
        //this.commin.toastMsg(err.message);
      })
      .then(() => {});
  }

  getUserData(app_version) {
        let onesignal_id=this.user.getOneSignalID();
        let fcm_id=this.user.getFcmID();
    this.api
      .postReq('/user/check', {
        app_version,
        platform_type: this.platform_type,onesignal_id,
        fcm_news_token:fcm_id,
        type:'news'
      })
      .then((res: any) => {
        this.app_info = res.data;
      })
      .catch((err) => {
        if (err.code === 403) {
        }
      });
  }

  learnenglish(id, name) {
    this.router.navigate([
      '../news/news-category-view',
      { id: id, name: name },
    ]);
  }

  get_category_data() {
    this.news
      .getReq('/categories_for_home')
      .then((data: any) => {
        this.categoryData = data.data;
      })
      .catch((err: any) => {});
  }

  redirectToViewNews(id, type) {
    this.router.navigate(['news/view-news', { id: id, name: type }]);
  }

  add_more_all_posts() {
    if (this.refresh) {
      this.preloader = true;
    }

    this.formdata.last_id = this.all_last_id;
    this.news
      .postReq('/feed', this.formdata)
      .then((data: any) => {
        this.preloader = false;

        // console.log(JSON.stringify(data)+"hello");
        if (data.data.length) {
          for (var i of data.data) {
            this.all_news_data.push(i);
          }
          this.all_last_id =
            this.all_news_data[this.all_news_data.length - 1]._id;

          this.refresh = false;
        } else {
          // //this.commin.toastMsg("That's all for now.");
        }
      })
      .catch((error: any) => {
        this.preloader = false;
      });
  }

  ionViewWillEnter() {
    this.user.isHome=true;
    this.user.tabopen = true;
    this.formdata.last_id = '';
    this.add_more_all_posts();
  }

  share() {
    this.user.shareApp();
  }

  navigateToSearch() {
    this.router.navigate(['./news/search']);
  }

  addNews(type) {
    this.router.navigate(['news/addnews', { isAdd: type }]);
  }

  liveUpdatePosts() {
    this.news
      .postReq('/feed/post_type', { post_type: 'URLPost' })
      .then((response: any) => {
        this.liveData = response.data;
        console.log('live-upadtesdf' + JSON.stringify(response.data));
      })
      .catch((error: any) => {});
  }

  doRefresh(event) {
    this.refresh = true;
    this.formdata.last_id = '';
    this.add_more_all_posts();
    // console.log('Begin async operation');
    setTimeout(() => {
      // console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }

  teckziteEventsPage(){
		this.router.navigate(['national-fests/event-page']);
	}



  onIonInfinite(event) {
    this.add_more_all_posts();
    // console.log('Begin async operation');
    setTimeout(() => {
      // console.log('Async operation has ended');
      event.target.complete();
    }, 500);
  }
}
