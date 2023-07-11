import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { CenterService } from 'src/app/providers/center/center.service';
import { CommonService } from 'src/app/providers/common/common.service';
import { NewsService } from 'src/app/providers/news/news.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { TermsComponent } from 'src/app/components/terms/terms.component';
import { ModalController } from '@ionic/angular';
import { Base64 } from '@ionic-native/base64/ngx';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/providers/user/user.service';
import { Platform } from '@ionic/angular';

import { ImageCroppedEvent } from 'ngx-image-cropper';

@Component({
  selector: 'app-community-page-view',
  templateUrl: './community-page-view.page.html',
  styleUrls: ['./community-page-view.page.scss'],
})
export class CommunityPageViewPage implements OnInit {
  local_news = [];
  local_last_id = '';

imgs: any = [];
imgs1: any = [];
  titleRemaining: number = 75;
  descRemaining: number = 400;

  valueChange(value, type) {
    if (type == 'title') this.titleRemaining = 75 - value.length;
    else this.descRemaining = 400 - value.length;
  }

  formdata1 = {
    village: this.center.location.village_id,
    mandal: this.center.location.mandal_id,
    district: this.center.location.district_id,
    state: this.center.location.state_id,
    last_id: '',
  };

  selectedTab: any = 'addnews';

  myPostData: any;

  newstype:any='ImagePost';

  preloader: boolean = false;

   croppedImagepath: string;
  value;
  imageChangedEvent: any = '';
    croppedImage: any = '';
  public terms_check = false;
  public isCropping:boolean = false;
  formdata = {
    post_type: 'ImagePost',
    title: '',
    description: '',
    language: 'English',
    level: 'mandal',
    images: [],
    full_size: false,
    // states: this.center.location.state_id,
    // village: this.center.location.village_id,
    // mandal: this.center.location.mandal_id,
    // district: this.center.location.district_id,
    videos: [],
    video_type: '',
    community_id: '',
  };

  community_data: any;
  community_members = [];

  segmentValue: any;
  header: boolean = false;
  isowner: boolean = false;
  constructor(
    public location: Location,
    public news: NewsService,
    public center: CenterService,
    public commin: CommonService,
    public imagePicker: ImagePicker,
    public camera: Camera,
    public modalCtrl: ModalController,
    public base64: Base64,
    public activateroute: ActivatedRoute,
    public user: UserService,
		public platform: Platform,
    public router: Router
  ) {
    this.activateroute.params.subscribe((data: any) => {
      console.log('hiii' + JSON.stringify(data));
      this.formdata.community_id = data.id;
    });
  }

  ngOnInit() {
let community_id = this.activateroute.snapshot.paramMap.get('community_id');
if(community_id)
{
  //alert(post_id);
  this.formdata.community_id = community_id;
}

    this.preloader = true;
    this.communityfeed();
    //   this.my_posts();
    this.fetch_community_data();
    //  console.log(this.checkIsOwner());
    this.fetch();
  }
  swipeEvent(event)
  {

  }

   fileChangeEvent(event: any): void 
    {
        this.imageChangedEvent = event;
    //    alert(JSON.stringify(this.imageChangedEvent));
        this.isCropping=true;
    }
    imageCropped(event: ImageCroppedEvent) {
      this.isCropping = true;
      this.croppedImage = event.base64;
    }
    imageLoaded() {
        // show cropper
    }
    cropperReady() {
        // cropper ready
    }
    loadImageFailed() {
        // show message
    }
    removeImage(index:any)
    {
      
       if(this.newstype=='ImagePost')
     {
            this.imgs.splice(index,1);    
            this.formdata.images=this.imgs;
     }
     if(this.newstype=='FullImagePost')
     {
          this.imgs1.splice(index,1);    
            this.formdata.images=this.imgs1;
     }


    }

    imageCropDone() {
    this.isCropping = false;
    // if (this.selectedPostType == 'PollPost' && this.images.length > 0) {
    //   this.errorSnack('poll post only supports one image');
    //   return;
    // }

     if(this.newstype=='ImagePost')
     {
            this.imgs.push(this.croppedImage.split(',')[1]);      
            this.formdata.images=this.imgs;
     }
     if(this.newstype=='FullImagePost')
     {
        this.imgs1.push(this.croppedImage.split(',')[1]);      
        this.formdata.images=this.imgs1;
     }

       this.croppedImage = '';
       this.imageChangedEvent = '';
  }

  back() {
    this.location.back();
  }

  communityfeed() {
    this.formdata1.last_id = this.local_last_id;
    // console.log(this.local_news_data);
    this.news
      .postReq('/community/feed', { community_id: this.formdata.community_id })
      .then((data: any) => {
        console.log(data);
        if (data.data.length) {
          for (var i of data.data) {
            this.local_news.push(i);
          }
          this.local_last_id = this.local_news[this.local_news.length - 1]._id;
          //  //this.commin.toastMsg("News Fetched succesfully");
        } else {
          // //this.commin.toastMsg("That's all for now.");
          return;
        }
      })
      .catch((error: any) => {
        //  //this.commin.toastMsg("There was an error fecting the news");
      });
  }

  // ===================USERS================

  fetch() {
    this.news
      .postReq('/community/owned-communities', {
        community_id: this.formdata.community_id,
      })
      .then((data: any) => {
        this.community_members = data.data;
        this.preloader = false;
        console.log(JSON.stringify(this.community_members) + 'members');
      });
  }

  fetch_community_data() {
    this.news
      .postReq('/community', { community_id: this.formdata.community_id })
      .then((response: any) => {
        this.community_data = response.data;
        console.log(JSON.stringify(this.community_data) + 'ffooffoo');
        this.isowner = this.community_data.owner.includes(
          this.user.getnewsuserid()
        );

        this.preloader = false;

        if (this.isowner) {
          this.segmentValue = 'posts';
        } else {
          this.segmentValue = 'home';
        }
      })
      .catch((err) => {
        console.log(err);
         this.location.back();
      });
  }

  search() {
    this.router.navigate(['../news/search']);
  }

  accecpt(id) {
    let data = { request_id: id };
    console.log(id);
    this.news
      .postReq('/community/accept-request', data)
      .then((data: any) => {
        //this.commin.toastMsg('request Accepted');
        console.log(data);
      })
      .catch((error: any) => {
        console.log('error', error);
      });
    // this.fetch();
    this.fetch_community_data();
  }

  decline(id) {
    let data = { request_id: id };
    console.log(id);
    this.news
      .postReq('/community/reject-request', data)
      .then((data: any) => {
        //this.commin.toastMsg('request Declined');
        // console.log(data);
      })
      .catch((error: any) => {
        console.log('error', error);
      });
    // this.fetch();
    this.fetch_community_data();
  }

  remove(user_id, comm_id) {
    let data = {
      community_id: comm_id,
      news_user_id: user_id,
    };
    this.news
      .postReq('/community/remove-user', data)
      .then((data: any) => {
        //this.commin.toastMsg('User removed');
        // this.fetch();
        // console.log(data);
      })
      .catch((error: any) => {
        console.log('error', error);
      });
    // this.fetch();
    this.fetch_community_data();
  }

  // =========================ADD POSTS=================

  terms() {
    this.terms_check = !this.terms_check;
  }

  async terms_modal() {
    let modal = await this.modalCtrl.create({
      component: TermsComponent
      
      // {
      //  enableBackdropDismiss: false,
      // },
    });
    modal.onDidDismiss().then((data) => {
      // console.log("dismissed with : ", data);
    });
    modal.present();
  }

  submit() {
    //  this.formdata.community_id='-';


    this.commin.startLoader();

    if(this.newstype=='ImagePost')
     {    
            this.formdata.images=this.imgs;
     }
     if(this.newstype=='FullImagePost')
     { 
        this.formdata.images=this.imgs1;
     }
    if (this.terms_check) {
      this.news
        .postReq('/community/post/add', this.formdata)
        .then((data: any) => {
          //this.commin.toastMsg('News posted for validation');
          // let element: HTMLElement = document.getElementsByClassName('btn')[0] as HTMLElement;
          // element.click();
          // ('#btn_reset').click();
          this.imgs = [];
          this.formdata = {
            post_type: 'ImagePost',
            title: '',
            description: '',
            language: 'English',
            level: 'mandal',
            images: [],
            full_size: true,
            // village: '5ffde939528beb352afbbda6',
            // mandal: '5ffde92b6563fd34c467edc4',
            // district: '5ffde92b6563fd34c467edc3',
            // states: '5ffde92916ae1e34a0a6965b',
            // states: this.center.location.state_id,
            // village: this.center.location.village_id,
            // mandal: this.center.location.mandal_id,
            // district: this.center.location.district_id,
            videos: [],
            video_type: '',
            community_id: this.formdata.community_id,
          };
          this.commin.stopLoader();
        })
        .catch((err) => {
          this.commin.stopLoader();
          // //this.commin.toastMsg(err.message);
        });
    } else {
      this.commin.stopLoader();
      // //this.commin.toastMsg('Accept terms and coditions');
    }

    console.log(this.formdata);
  }

  level(event) {
    this.formdata.level = event.detail.value;
  }

 



  fromVideoGallery() {
    const options: CameraOptions = {
      //  quality: 100,
  destinationType: this.platform.is('ios') ? this.camera.DestinationType.FILE_URI : this.camera.DestinationType.DATA_URL,
      //  encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.VIDEO,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
    };
    this.camera.getPicture(options).then(
      (imageData) => {
        alert(imageData);
        // this.formdata.image = imageData;
        //this.formdata.videos.push(imageData);
        // this.imgs.push(img);
        // this.formdata.videos=this.videos;
        console.log(imageData);
        this.base64.encodeFile(imageData).then(
          (base64File: string) => {
            // alert(base64File);

            this.formdata.videos.push(base64File.split('base64,')[1]);
            //  alert(this.formdata.videos);
          },
          (err) => {
            //  alert(err);
          }
        );
      },
      (err) => {
        //this.commin.toastMsg('Something Error occured');
      }
    );
  }

 
  type(event) {
    if (event.detail.value == 'news') {
      this.newstype="ImagePost";
      this.formdata.post_type = 'ImagePost';
      this.formdata.full_size = false;
      this.formdata.video_type = '';
    } else if (event.detail.value == 'ImagePost') {
      this.newstype="FullImagePost";
      this.formdata.post_type = 'ImagePost';
      this.formdata.full_size = true;
      this.formdata.video_type = '';
    } else if (
      event.detail.value == 'VideoPost' ||
      event.detail.value == 'youtube'
    ) {
      this.formdata.post_type = 'VideoPost';
      this.formdata.full_size = false;
      if (event.detail.value == 'youtube') {
        this.formdata.video_type = 'youtube';
      } else {
        this.formdata.video_type = '';
      }
    }
  }

  my_posts() {
    this.news.postReq('/post/myposts', {}).then((response: any) => {
      this.myPostData = response.data;
      console.log(JSON.stringify(this.myPostData) + 'posted_data');
    });
  }
}
