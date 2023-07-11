import { Component, Injectable, OnInit, ViewChild } from '@angular/core';
import {
  AlertController,
  IonSlides,
  MenuController,
  ModalController,
} from '@ionic/angular';
import { IonInfiniteScroll } from '@ionic/angular';
import { Network } from '@ionic-native/network/ngx';
import { NewsService } from '../../../providers/news/news.service';
import { AdmobfreeService } from '../../../providers/ad/admobfree.service';
import { APIService } from '../../../providers/api/api.service';
import { CommonService } from '../../../providers/common/common.service';
import { CenterService } from '../../../providers/center/center.service';
import { AppVersion } from '@ionic-native/app-version/ngx';
import { UserService } from '../../../providers/user/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { EventsService } from 'src/app/providers/events/events.service';
import SwiperCore, { EffectCoverflow } from 'swiper';

SwiperCore.use([EffectCoverflow]);

@Component({
  selector: 'app-allnews',
  templateUrl: './allnews.page.html',
  styleUrls: ['./allnews.page.scss'],
})
export class AllnewsPage implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  @ViewChild(IonSlides, { static: false }) slides: IonSlides;

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
  preloader = true;
  refresh = false;

  local_last_id = '';
  all_last_id = '';
  community_last_id = '';

  local_news_data = [];
  all_news_data = [];
  community_news_data = [];

  following_community = '';
  slideloadcount: any;
  formdata = {
    village: this.center.location.village_id,
    mandal: this.center.location.mandal_id,
    district: this.center.location.district_id,
    state: this.center.location.state_id,
    post_id: '',
    last_id: '',
  };
  infscrollcount: any = 0;

  slidechanged = false;

  constructor(
    public router: Router,
    public activateroute: ActivatedRoute,
    public news: NewsService,
    public commin: CommonService,
    public center: CenterService,
    public admobFreeService: AdmobfreeService,
    public sanitizer: DomSanitizer,
    public events: EventsService,
    public user: UserService,
    public menu: MenuController
  ) {

    this.events.triggerBlockedPostsToRemove().subscribe((id:any) => {
      this.hideBlockedPosts(id);
    })

    this.events.getObservable().subscribe((data: any) => {
      this.formdata = {
        village: this.center.location.village_id,
        mandal: this.center.location.mandal_id,
        district: this.center.location.district_id,
        state: this.center.location.state_id,
        post_id: '',
        last_id: '',
      };
      this.all_news_data = [];
      this.refresh = false;
      this.all_last_id = '';
      this.add_more_all_posts();
    });
    this.preloader = true;
    this.user.tabopen = true;
  }

  nextSlide() {
    this.slides.slideNext();
  }
  prevSlide() {
    this.slides.slidePrev();
  }

  tabopenclose() {
    this.user.tabopen = !this.user.tabopen;
  }
  tabclose() {
    this.user.tabopen = !this.user.tabopen;
  }
  newsMenuOpen() {
    this.newMenu = !this.newMenu;
    this.menu.toggle();
  }

  doRefresh(event) {
    this.all_news_data = [];
    this.all_last_id = '';
    this.add_more_all_posts();
    setTimeout(() => {
      event.target.complete();
    }, 2000);
  }

  async add_more_all_posts() {
    if (!this.all_last_id && !this.refresh) {
      this.preloader = true;
    }
    this.formdata.last_id = this.all_last_id;
    await this.news
      .postReq('/feed', this.formdata)
      .then((data: any) => {
        this.preloader = false;

        if (data.data.length) {
          for (var i of data.data) {
            this.all_news_data.push(i);
          }
          this.all_last_id =
            this.all_news_data[this.all_news_data.length - 1]._id;

          console.log(JSON.stringify(this.all_news_data));
        } else {
          this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
        }
      })
      .catch((error: any) => {
      });
  }


  slideChanged(e: any) {
    this.user.tabopen = false;
    this.slidechanged = true;
  }
  moreData(e) {
    console.log('adding more posts1');
    this.formdata.post_id = '';
    if (this.slidechanged == true) {
      this.slidechanged = false;
      this.add_more_all_posts();
    }

  }


  ngOnInit() {
    this.center;
    this.user;
    console.log('hiii');
    let post_id = this.activateroute.snapshot.paramMap.get('post_id');
    if (post_id) {
      this.formdata.post_id = post_id;
    }
   
  }

  refreshnew(e) {
    this.refresh = true;
    this.add_more_all_posts();
  }
  ionViewWillEnter() {
    this.user.isHome=false;
    let post_id = this.activateroute.snapshot.paramMap.get('post_id');
    if (post_id) {
      this.formdata.post_id = post_id;

      this.news
        .postReq('/post/post_action', {
          post_id: post_id,
          action_type: 'push_view',
        })
        .then((response: any) => {
        })
        .catch((err) => {
        });
    }
    this.all_news_data = [];
    this.refresh = false;
    this.all_last_id = '';
    this.add_more_all_posts();
  }

  hideBlockedPosts(id) {
    const hiddenPosts = localStorage.getItem('blockedPosts');
    const blockedPosts = JSON.parse(hiddenPosts)?.ids
      ? JSON.parse(hiddenPosts)?.ids
      : [];
    this.all_news_data = this.all_news_data.filter(
      (post) => {
        return post._id !== id;
      }
    );

    this.commin.toastMsg("The post is blocked!")
  }
}
