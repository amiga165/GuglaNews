import { Component, Input, OnInit } from '@angular/core';
import { ModalController, Platform } from '@ionic/angular';
import { CenterService } from 'src/app/providers/center/center.service';
import { CommonService } from 'src/app/providers/common/common.service';
import { NewsService } from 'src/app/providers/news/news.service';
import { NavParams} from '@ionic/angular';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { ImageCroppedEvent } from 'ngx-image-cropper';

@Component({
  selector: 'app-create-community',
  templateUrl: './create-community.component.html',
  styleUrls: ['./create-community.component.scss'],
})
export class CreateCommunityComponent implements OnInit {

   formdata={
    name:"",
    description:"",
    type:"private",
   // images:[],
    icon:""
  }

  imgs:any;
  public isCropping:boolean = false;
  croppedImagepath: string;
  value;
  imageChangedEvent: any = '';
  croppedImage: any = '';
  displayIcon=false;

  constructor(
		public news:NewsService,
     public camera: Camera,
    public imagePicker: ImagePicker,
    public commin: CommonService,
    public center:CenterService,
    public modalCtrl:ModalController,
    public navParams : NavParams,
    public platform: Platform
  ) 
  {
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
         this.formdata.icon = imageData;
       
      //  this.formdata.icon=this.imgs;
        console.log(imageData);
      },
      (err) => {
        this.commin.toastMsg('Something Error occured');
      }
    );
  }
  removeImage(i)
  {
    
  }

  // getPhoto() {
  //   let options = {
  //     maximumImagesCount: 4,
  //   };


  //   this.imagePicker.getPictures(options).then(
  //     (results) => {
  //       for (var i = 0; i < results.length; i++) {
  //         this.imgs.push('data:image/jpeg;base64,' + results[i]);
  //       }
  //     },
  //     (error) => {
  //      // alert(error);
  //     }
  //   );
  // }


  ngOnInit() {
  
  }


  

  // onImageSelected(event) {
  //   let me = this;
  //   let img
  //   let file = event.target.files[0];
  //   let reader = new FileReader();
  //   reader.readAsDataURL(file);
  //   reader.onload = () => {
  //     let img = reader.result as string;
  //     img = img.replace(
  //       /^.+?;base64,/,
  //       ''
  //     );
  //   };
  //   this.imgs.push(img);
  //   this.formdata.images=this.imgs;

  //   reader.onerror = function (error) {
  //     console.log('Error: ', error);
  //   };
  // }

  Community_type(event:any){
    this.formdata.type=event.detail.value;
  }

  submit(){
   // console.log(this.formdata);";
   // this.formdata.images=[];
   this.commin.startLoader();

    this.news.
    postReq("/community/create",this.formdata)
    .then((data:any) => {
     // this.dismiss();
      this.commin.toastMsg("Community created succesfully");
      this.dismiss();

      this.commin.stopLoader();

    })
    .catch((error:any) => {
      this.commin.stopLoader();
      this.commin.toastMsg("There was an error creating community fill all fields");
    })

  }

  fileChangeEvent(event: any): void 
    {
        this.imageChangedEvent = event;
    //    alert(JSON.stringify(this.imageChangedEvent));
        this.isCropping=true;
        // alert('hihi');
    }
    imageCropped(event: ImageCroppedEvent) {

      this.croppedImage = event.base64;
      //alert(this.croppedImage);
      this.isCropping = true;
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
    // removeImage(index:any)
    // {
      
    //    if(this.newstype=='ImagePost')
    //  {
    //         this.imgs.splice(index,1);    
    //         this.formdata.images=this.imgs;
    //  }
    //  if(this.newstype=='FullImagePost')
    //  {
    //       this.imgs1.splice(index,1);    
    //         this.formdata.images=this.imgs1;
    //  }


    // }

    imageCropDone() {
  
    this.formdata.icon=this.croppedImage.split(',')[1];      
    // this.formdata.images=this.imgs;
    
      this.isCropping=false;
       this.croppedImage = '';
       this.imageChangedEvent = '';
       this.displayIcon = true;
  }


  location()
  {
     this.center.getLocation()
  }


// ==========Dismissing the Modal ===========
      dismiss() {
        this.modalCtrl.dismiss({
          'dismissed': true
        });
      }

}
