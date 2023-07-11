import { Component, OnInit, ViewEncapsulation, ViewChild, Input } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/providers/common/common.service';
import { AlertController } from '@ionic/angular';
import { NewsService } from 'src/app/providers/news/news.service';
import * as moment from 'moment';
import { SwiperComponent } from "swiper/angular";
 
// import Swiper core and required modules
import SwiperCore, {Pagination, EffectCreative} from "swiper";
import { CenterService } from 'src/app/providers/center/center.service';

// install Swiper modules
SwiperCore.use([EffectCreative,Pagination]);


@Component({
  selector: 'app-image-post',
  templateUrl: './image-post.component.html',
  styleUrls: ['./image-post.component.scss']
})
export class ImagePostComponent implements OnInit {
  @Input() newsData: any;
  @Input() type:any;
  @Input() news_id:any;
  @Input() edit:any;
  @Input() time:any;
  @Input() postData:any;
  isDeleted:boolean=false;
  defaultImage = 'assets/imgs/loading.gif';


  constructor(public center:CenterService,public news:NewsService,public alertController: AlertController,public router:Router,public common:CommonService) {

    window.addEventListener('screenshot', function() {
      console.log('screenshot');
      alert('rajjjj');
  }, false);

   }
counter=0;
  ngOnInit() {
   // console.log('viewdedddd');
    this.newsData = this.newsData;
    this.type = this.type;
    this.news_id = this.news_id;
    this.edit = this.edit;
    this.postData=this.postData;
    //console.log("uuuuuuuuu"+ JSON.stringify(this.postData));

    this.
    news.
    postReq("/post/post_action",{post_id:this.postData._id,action_type:"view" }).then((response:any) =>{
      // this.community_data=response.data;
      //this.community_data=response.data;

    })
    .catch(err=>{
      console.log(err)
    });
  }

  redirectToViewNews(){
    this.router.navigate(['../news/view-news',{ id: this.news_id, name: 'ImagePost' }]);
  }
  getdata(e)
  {
    console.log('eeee'+e);
    return e.category.name;
  }
  deletenews(id)
  {
    let form={"post_id":id,"status":"deleted"}
        this.
        news.
        patchReq("/post/delete",form).then((response:any) =>{
        this.isDeleted=true;
          console.log(response.data)
 //         this.fetch_community_data()
        })
        .catch(err=>{
          console.log(err)
        });
  }

  showPager(pages:any){

    if(pages == 1){
      return false;
    }else{
      return true;
    }

  }

  async presentAlertEdit() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
    //  header: 'Edit option Not Available Now',
      subHeader: 'Edit option Not Available Now',
      message: 'Delete and Resubmit the news.',
      buttons: ['OK']
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }
  updateCounter()
  {
    this.counter++
    console.log('count'+this.counter);
  }
  view_category(cat_id,cat_name){
      this.router.navigate(['../news/news-category-view',{id:cat_id,name:cat_name}]);
  }
  view_rep_post(rep_id,rep_name){
    this.router.navigate(['../news/news-category-view',{rep_id:rep_id,rep_name:rep_name}]);
}

  async presentAlertConfirm(id) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirm!',
      message: 'Are you sure to Delete',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Okay',
          handler: () => {
            this.deletenews(id)
            console.log('Confirm Okay');
          }
        }
      ]
    });

    await alert.present();
  }


  datetime(e)
  {
  return moment(e).format("hh:mm A Do-MMM-YY");
  }
  loaded()
  {
   // console.log('loadeddd')
  }
  ngAfterViewInit() {
//alert('raj');
  }
}
