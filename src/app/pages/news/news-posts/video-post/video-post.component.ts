import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
// import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player/ngx';
import { CommonService } from 'src/app/providers/common/common.service';
import { AlertController } from '@ionic/angular';
import { NewsService } from 'src/app/providers/news/news.service';
import { CenterService } from 'src/app/providers/center/center.service';
import * as moment from 'moment';

@Component({
  selector: 'app-video-post',
  templateUrl: './video-post.component.html',
  styleUrls: ['./video-post.component.scss'],
})
export class VideoPostComponent implements OnInit {
  @Input() newsData: any;
  @Input() type:any;
  @Input() news_id:any;
  @Input() edit:any;
  @Input() time:any;
  @Input() postData:any;
    isDeleted:boolean=false;

  constructor(public center:CenterService, public news:NewsService,public alertController: AlertController,public common:CommonService,public router:Router,public sanitizer: DomSanitizer) { }

  ngOnInit() {

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
    this.router.navigate(['../news/view-news',{ id: this.news_id, name: 'VideoPost' }]);
  }

    view_category(cat_id,cat_name){
      this.router.navigate(['../news/news-category-view',{id:cat_id,name:cat_name}]);
  }

    get(url:any)
  {
  let url_id=this.youtube_parser(url);
  let final_url='https://www.youtube.com/embed/'+url_id;
   //console.log('urlll'+url);
    return this.sanitizer.bypassSecurityTrustResourceUrl(final_url);
  }
  // playVideo(url) {
  //   //alert(url);
  //   let url_id=this.youtube_parser(url);
  //  // alert(url_id);
  //   this.player.openVideo(url_id);
  // }
  youtube_parser(url){
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    var match = url.match(regExp);
    return (match&&match[7].length==11)? match[7] : false;
}
getyoutubevideoimage(url)
{
  let url_id=this.youtube_parser(url);
  let image ="https://img.youtube.com/vi/"+url_id+"/0.jpg";
  return image;
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
ionViewWillLeave() {
    let listaFrames = document.getElementsByTagName("iframe");
    // for (var index = 0; index < listaFrames.length; index++) {
    //     let iframe = listaFrames[index].contentWindow;          
    //     iframe.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
    //  }
}

datetime(e)
{
return moment(e).format("hh:mm A Do-MMM-YY");
}

}
