import { Component, OnInit } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { CommonService } from 'src/app/providers/common/common.service';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { CenterService } from '../../../providers/center/center.service';
import { Base64 } from '@ionic-native/base64/ngx';
import { NewsService } from '../../../providers/news/news.service';
import { AlertController, ModalController } from '@ionic/angular';
import { TermsComponent } from '../../../components/terms/terms.component';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Crop } from '@ionic-native/crop/ngx';
import { File } from '@ionic-native/file/ngx';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { Router } from '@angular/router';
import { MatStepper } from "@angular/material/stepper";
import { UserService } from 'src/app/providers/user/user.service';
import { ProfileEditComponent } from 'src/app/components/profile-edit/profile-edit.component';
import { APIService } from 'src/app/providers/api/api.service';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-addnews',
  templateUrl: './addnews.page.html',
  styleUrls: ['./addnews.page.scss'],
})
export class AddnewsPage implements OnInit {
  selectedTab: any = 'home';
  time:any;
  myPostData: any;
  titleRemaining: number = 75;
  descRemaining: number = 400;
  add: any;
  newstype:any='ImagePost';
  user_details:any;

  public mystatsdata:any={};

  public terms_check = true;
  public post_ad_checked = false;
  public isCropping:boolean = false;
  public isCroppingforad:boolean = false;
  categoryData:any;
  public mandals:any;
  public selected_mandals:any;
  public districtData:any;
  adsData:any;
  isAd:any;
  selectedDistrict:any;

  imgs: any = [];
  imgsforad:any =[];
  imgs1: any = [];
  formdata = {
    post_type: 'ImagePost',
    title: '',
    description: '',
    category:'',
    language: 'English',
    level: 'mandal',
    images: [],
    ad_image: [],
    full_size: false,
    states: this.center.location.state_id,
    village: this.center.location.village_id,
    mandal: this.center.location.mandal_id,
    district: this.center.location.district_id,
    videos: [],
    video_type: '',
  };
  local_news = [];
  local_last_id = '';
  formdata1 = {
    village: this.center.location.village_id,
    mandal: this.center.location.mandal_id,
    district: this.center.location.district_id,
    state: this.center.location.state_id,
    last_id: '',
  };
   croppedImagepath: string;
  value;
  imageChangedEvent: any = '';
  imageChangedEventforad: any = '';
  croppedImage: any = '';
  croppedImageforad: any = '';

  allmandalsdata:any;
  constructor(
    public camera: Camera,
    public commin: CommonService,
    public imagePicker: ImagePicker,
    public base64: Base64,
    public news: NewsService,
    public center: CenterService,
    public modalCtrl: ModalController,
    public location: Location,
    public activateroute: ActivatedRoute,
    public crop: Crop,
    public file: File,
  public platform: Platform,
    public user:UserService,
    public alertController:AlertController,
    public api: APIService,
    public router:Router
  ) {
    //this.getDistricts();
    //this.allmandals();
    if(this.user.isGuestUser())
    {
      this.router.navigate(['/signup']);
      this.modalCtrl.dismiss();
    }
    this.selected_mandals=this.center.location.mandal_id;
    //console.log('selectedddd'+this.selected_mandals);
    this.getMandals();
    console.log('location data'+JSON.stringify(this.center.location));
    this.get_category_data();
    this.add_more_local_posts();
    this.activateroute.params.subscribe((data: any) => {
      this.add = data.isAdd;
      //alert(this.add);
    });

    this.mystatsdata.verified=0;
        this.mystatsdata.rejected=0;
            this.mystatsdata.posted=0;
    this.mystats();

  }

  
	goForward(stepper: MatStepper) {
		stepper.selected.completed = true;
		stepper.next();
	}
	stopForward(stepper: MatStepper) {
		stepper.selected.completed = false;
	}



  mystats() {
    this.news.postReq('/stats', {}).then((response: any) => {
      if(response.data)
      {
              this.mystatsdata.posted = response.data.posted || 0; 
              this.mystatsdata.verified = response.data.verified || 0; 
              this.mystatsdata.rejected = response.data.rejected || 0;        
      }

      console.log(JSON.stringify(this.mystatsdata) + 'stats data');
    });
  }

  swipeEvent(event)
  {
    
  }


  fileChangeEvent(event: any): void 
    {
        this.imageChangedEvent = event;
        this.isCropping=true;
    }
      fileChangeEventforad(event: any): void 
    {
        this.imageChangedEventforad = event;
        this.isCroppingforad=true;
    }
    imageCropped(event: ImageCroppedEvent) {
      this.isCropping = true;
      this.croppedImage = event.base64;
    }
    imageCroppedforad(event: ImageCroppedEvent) {
      this.isCroppingforad = true;
      this.croppedImageforad = event.base64;
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
updatemandal(mandal,district)
{
  console.log(mandal,district);
}
  removeImageforad(index:any)
  {
     if(this.newstype=='ImagePost')
     {
        this.imgsforad.splice(index,1);    
        this.formdata.ad_image=this.imgsforad;
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
       this.imageChangedEventforad='';
  }
  imageCropDoneforad() {
    this.isCroppingforad = false;

    this.imgsforad.push(this.croppedImageforad.split(',')[1]);      
    this.formdata.ad_image=this.imgsforad;
    this.croppedImageforad = '';
    this.imageChangedEventforad='';
  }

  valueChange(value, type) {
    if (type == 'title') this.titleRemaining = 75 - value.length;
    else this.descRemaining = 400 - value.length;
  }

  back() {
    this.location.back();
  }

  terms() {
    this.terms_check = !this.terms_check;
  }


  getMandals() {
    this.api
      .postReq('/common/mandals', { district_id: this.center.location.district_id })
      .then((res: any) => {
        if (res.data) {
         // this.area.mandal.data = res.data;
         this.mandals=res.data;
          console.log('This is the data of mandals ' + JSON.stringify(res.data));
        } else {
          //this.commin.toastMsg('Something error occured');
        }
      })
      .catch((err) => {
        //this.commin.toastMsg(err.message);
      })
      .then(() => {
        // Finally block
       // this.commin.stopLoader();
      });
  }

  get_myads(){
    this.news
    .postReq('/ad/get', this.formdata1)
    .then((data: any) => {
      

      this.adsData = data.data;

      
      })
      .catch((error: any) => {
        // //this.commin.toastMsg('There was an error fecting the news');
      });
}

getDistricts() {
  //  var state_id = this.area.state.selected;
   // this.commin.startLoader();
    this.api
      .postReq('/common/districts', { state_id: this.center.location.state_id })
      .then((res: any) => {
        if (res.data) {
          this.districtData = res.data;
          console.log('This is the data of Districts' + JSON.stringify(res.data));
        } else {
          //this.commin.toastMsg('Something error occured');
        }
      })
      .catch((err) => {
        //this.commin.toastMsg(err.message);
      })
      .then(() => {
        // Finally block
        this.commin.stopLoader();
      });
  }

  allmandals() {
  //  var state_id = this.area.state.selected;
   // this.commin.startLoader();
    this.api
      .postReq('/common/all_mandals', { state_id: this.center.location.state_id })
      .then((res: any) => {
        if (res.data) {
          this.allmandalsdata = res.data;
          console.log('This is the data of all mandals' + JSON.stringify(res.data));
        } else {
          //this.commin.toastMsg('Something error occured');
        }
      })
      .catch((err) => {
        //this.commin.toastMsg(err.message);
      })
      .then(() => {
        // Finally block
        this.commin.stopLoader();
      });
  }

  add_more_local_posts() {
    this.formdata1.last_id = this.local_last_id;
    this.news
    .postReq('/local/feed', this.formdata1)
    .then((data: any) => {
      console.log(data);
      if (data.data.length) {
        for (var i of data.data) {
          this.local_news.push(i);
        }
        this.local_last_id = this.local_news[this.local_news.length - 1]._id;
        // //this.commin.toastMsg('News Fetched succesfully');
          // this.add_more_local_posts();
        } else {
          // //this.commin.toastMsg("That's all for now.");
          return;
        }
      })
      .catch((error: any) => {
        // //this.commin.toastMsg('There was an error fecting the news');
      });
  }

  async terms_modal() {
    let modal = await this.modalCtrl.create({
      component: TermsComponent,
      // {
      //  enableBackdropDismiss: false,
      // },
    });
    modal.onDidDismiss().then((data) => {
      // console.log("dismissed with : ", data);
    });
    modal.present();
  }

  get_category_data(){
    this.news
    .getReq('/categories')
    .then((data:any) => {
      this.categoryData = data.data;
      
    })
    .catch((err:any) => {

    })
  }

  submit() {
    //alert(this.terms_check);
    // if(!this.formdata.category)
    // {
    //   this.commin.toastMsg('Please select category');
    //   return false;
    // }
    if(this.formdata.category=='')
    {
      delete this.formdata["category"];
    }
    this.formdata.mandal=this.selected_mandals;
    this.commin.startLoader() ;
     if(this.newstype=='ImagePost')
     {
        if(this.isCropping)
        {
          this.imgs.push(this.croppedImage.split(',')[1]);      
            this.formdata.images=this.imgs;
             this.croppedImage = '';
           this.imageChangedEvent = '';
           this.imageChangedEventforad='';
        }
        this.formdata.images=this.imgs;
     }
     if(this.newstype=='FullImagePost')
     { 
        if(this.isCropping)
        {
          this.imgs1.push(this.croppedImage.split(',')[1]);      
          this.formdata.images=this.imgs1;
           this.croppedImage = '';
           this.imageChangedEvent = '';
           this.imageChangedEventforad='';
        }
        this.formdata.images=this.imgs1;
     }
    if (this.terms_check) {

      let submit_route = '';
      if(this.post_ad_checked){
        submit_route = '/ad/post';
      }
      else{
        submit_route = '/post/add';
      }

      this.news
        .postReq(submit_route, this.formdata)
        .then((data: any) => {
          this.commin.toastMsg('News Successfully posted for validation');
          // let element: HTMLElement = document.getElementsByClassName('btn')[0] as HTMLElement;
          // element.click();
          // ('#btn_reset').click();
          this.my_posts();
          this.get_myads();
          this.imgs = [];
          this.imgsforad = [];
           this.imgs1 = [];

          this.formdata = {
    post_type: 'ImagePost',
    title: '',
    description: '',
    category:'',
    language: 'English',
    level: 'mandal',
    images: [],
    ad_image: [],
    full_size: false,
    states: this.center.location.state_id,
    village: this.center.location.village_id,
    mandal: this.center.location.mandal_id,
    district: this.center.location.district_id,
    videos: [],
    video_type: '',
          };

          this.commin.stopLoader();
        })
        .catch((err) => {
          this.commin.toastMsg(err.message);
          this.commin.stopLoader();
          
        });
    } else {
     // this.commin.stopLoader();
    }

    
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
        // //this.commin.toastMsg('Something Error occured');
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
        this.formdata.video_type = 'uploaded';
      }
    }
  }

  ngOnInit() {
    let isad = this.activateroute.snapshot.paramMap.get('isad');

    if(isad)
    {
      this.isAd=isad;
    }
        this.my_posts();
        this.get_myads();

        this.user_details = this.user.userData;

    if(!this.user.isGuestUser() && (this.user_details.details.name == null || this.user_details.details.name == "" || this.user_details.details.name == "guest" || this.user_details.details.name == "Guest")){
      this.edit_modal_popup();
    }
  }

  my_posts() {
    this.news.postReq('/post/myposts', {}).then((response: any) => {
      this.myPostData = response.data;
    });
  }


  async updating() {
    const alert = await this.alertController.create({
      message: 'updating soon...',
      buttons: [
        {
          text: 'close',
          role: 'cancel'
        }
      ]
    });
    await alert.present();
    const { role } = await alert.onDidDismiss();
  }
  
  async edit_modal_popup(){
    const modal = await this.modalCtrl.create({
      component: ProfileEditComponent,
      cssClass: 'editprofile',
      componentProps: {'user_details':this.user_details}
    });
    
    modal.onDidDismiss().then((data: any) => {
      
    });
    
    await modal.present();
  }

}
