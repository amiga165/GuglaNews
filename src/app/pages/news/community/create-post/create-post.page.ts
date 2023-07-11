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
  selector: 'app-create-post',
  templateUrl: './create-post.page.html',
  styleUrls: ['./create-post.page.scss'],
})
export class CreatePostPage implements OnInit {
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
    community_id: '',
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

  community_members = [];
  fetch() {
    this.news.postReq('/community/owned-communities', {}).then((data: any) => {
      this.community_members = data.data;
    });
  }

  getPhoto() {
    let options = {
      maximumImagesCount: 1,
    };
    this.imagePicker.getPictures(options).then(
      (results) => {
        for (var i = 0; i < results.length; i++) {
          //  console.log(results[i]);
          this.base64.encodeFile(results[i]).then(
            (base64File: string) => {
              this.formdata.images[0] = base64File;
              console.log(this.formdata);
            },
            (err) => {
              console.log(err);
            }
          );
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }

  submit() {
    if (this.terms_check) {
      this.news
        .postReq('/community/post/add', this.formdata)
        .then((data: any) => {
          this.commin.toastMsg('News posted succesfully');
        })
        .catch((err) => {
          console.log(err);
          //this.commin.toastMsg(err.message);
        });

      console.log(this.formdata);
    } else {
      //this.commin.toastMsg('Accept terms');
    }
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

  level(event) {
    this.formdata.community_id = event.detail.value;
  }

  onImageSelected(event) {
    let me = this;
    let file = event.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.formdata.images[0] = reader.result as string;
      this.formdata.images[0] = this.formdata.images[0].replace(
        /^.+?;base64,/,
        ''
      );
    };
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
        // console.log(imageData);
      },
      (err) => {
        //this.commin.toastMsg('Something Error occured');
      }
    );
  }

  terms_check = false;

  terms() {
    this.terms_check = !this.terms_check;
  }

  //   type(event){

  //     if (event.detail.value=="news"){
  //     this.formdata.post_type="ImagePost";
  //     this.formdata.full_size=false;
  //     this.formdata.video_type="";

  //     }
  //     else if(event.detail.value=="ImagePost"){
  //       this.formdata.post_type="ImagePost";
  //       this.formdata.full_size=true;
  //       this.formdata.video_type="";

  //     }
  //   );
  // }

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
  ngOnInit() {
    this.fetch();
  }
}
