import { Component, OnInit } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { CommonService } from 'src/app/providers/common/common.service';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { CenterService } from '../../../../providers/center/center.service';
import { Base64 } from '@ionic-native/base64/ngx';
import { NewsService } from '../../../../providers/news/news.service';
import { ModalController } from '@ionic/angular';
import { TermsComponent } from '../../../../components/terms/terms.component';
import { Platform } from '@ionic/angular';


@Component({
  selector: 'app-news-create',
  templateUrl: './news-create.page.html',
  styleUrls: ['./news-create.page.scss'],
})
export class NewsCreatePage implements OnInit {
  // public type: string="dos";
  public terms_check = false;
  formdata = {
    post_type: 'ImagePost',
    title: '',
    description: '',
    language: 'English',
    level: 'mandal',
    images: [],
    full_size: true,
    states: this.center.location.state_id,
    village: this.center.location.village_id,
		mandal: this.center.location.mandal_id,
		district: this.center.location.district_id,
    videos: [],
    video_type: '',
  };
  constructor(
    public camera: Camera,
    public commin: CommonService,
    public imagePicker: ImagePicker,
    public base64: Base64,
    public news: NewsService,
    public center: CenterService,
    public modalCtrl: ModalController,
		public platform: Platform,
  ) {}

  getPhoto() {
    let options = {
      maximumImagesCount: 4,
    };
    // this.imagePicker.getPictures(options).then((results) => {
    //   for (var i = 0; i < results.length; i++) {
    //       //  console.log(results[i]);
    //       this.base64.encodeFile(results[i]).then((base64File: string) => {
    //         this.formdata.images[0] = base64File;
    //         console.log(this.formdata)
    //       }, (err) => {
    //         console.log(err);
    //       });
    //   }
    // }, (err) => {
    //   console.log(err);
    // });

    this.imagePicker.getPictures(options).then(
      (results) => {
        for (var i = 0; i < results.length; i++) {
          this.imgs.push('data:image/jpeg;base64,' + results[i]);
        }
      },
      (error) => {
       // alert(error);
      }
    );
  }

  terms() {
    this.terms_check = !this.terms_check;
  }

  async terms_modal() {
    let modal = await this.modalCtrl.create({
      component: TermsComponent,
      // {
      // 	enableBackdropDismiss: false,
      // },
    });
    modal.onDidDismiss().then((data) => {
      // console.log("dismissed with : ", data);
    });
    modal.present();
  }

  submit() {
    if (this.terms_check) {
      this.news
        .postReq('/post/add', this.formdata)
        .then((data: any) => {
          this.commin.toastMsg('News posted for validation');
          // let element: HTMLElement = document.getElementsByClassName('btn')[0] as HTMLElement;
          // element.click();
          // ('#btn_reset').click();
          this.imgs=[];
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
		  states: this.center.location.state_id,
      village: this.center.location.village_id,
		  mandal: this.center.location.mandal_id,
		  district: this.center.location.district_id,
      videos: [],
      video_type: '',
    };
        })
        .catch((err) => {
          console.log(err);
          //this.commin.toastMsg(err.message);
        });
    } else {
      //this.commin.toastMsg('Accept terms and coditions');
    }

    console.log(this.formdata);
    
  }

  level(event) {
    this.formdata.level = event.detail.value;
  }

  imgs: any = [];

  onImageSelected(event) {
    let me = this;
    let img
    let file = event.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      let img = reader.result as string;
      img = img.replace(
        /^.+?;base64,/,
        ''
      );
    };
    this.imgs.push(img);
    this.formdata.images=this.imgs;

    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
  }



  fromGallery() {
    const options: CameraOptions = {
      quality: 100,
      destinationType:this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
    };
    this.camera.getPicture(options).then(
      (imageData) => {
        // this.formdata.image = imageData;
        this.imgs.push(imageData);
        // this.imgs.push(img);
        this.formdata.images=this.imgs;
        console.log(imageData);
      },
      (err) => {
        //this.commin.toastMsg('Something Error occured');
      }
    );
  }

  type(event) {
    if (event.detail.value == 'news') {
      this.formdata.post_type = 'ImagePost';
      this.formdata.full_size = false;
      this.formdata.video_type = '';
    } else if (event.detail.value == 'ImagePost') {
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
  ngOnInit() {}
}
