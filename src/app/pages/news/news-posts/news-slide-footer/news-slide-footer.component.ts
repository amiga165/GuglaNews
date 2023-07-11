import { Component, OnInit, Input } from '@angular/core';
import { NewsService } from '../../../../providers/news/news.service';
import { NewsCommentsComponent } from '../news-comments/news-comments.component';

import { ModalController } from '@ionic/angular';
import { UserService } from '../../../../providers/user/user.service';
import { Screenshot } from '@ionic-native/screenshot/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { File, DirectoryEntry, FileEntry } from '@ionic-native/file/ngx';
import { CommonService } from "src/app/providers/common/common.service";
import * as moment from 'moment';
import { NewsReportComponent } from '../news-report/news-report.component';
import { DetailsPostComponent } from '../details-post/details-post.component';
import { EventsService } from 'src/app/providers/events/events.service';
@Component({
  selector: 'app-news-slide-footer',
  templateUrl: './news-slide-footer.component.html',
  styleUrls: ['./news-slide-footer.component.scss'],
})
export class NewsSlideFooterComponent implements OnInit {
  @Input() newsData: any;

  news_user_id: any;
  public liked: any;
  public disliked: any;
  liked_icon: any;
  disliked_icon: any;

  constructor(public commin: CommonService,
    public file: File,
    public socialSharing: SocialSharing,
    public androidPermissions: AndroidPermissions,
    public screenshot: Screenshot, 
    public user: UserService,
    public news: NewsService, 
    public modalCtrl: ModalController,
    public events: EventsService) {

    this.news_user_id = this.user.getnewsuserid();
    console.log('timeee' + new Date());

  }

  like(id) {
    this.disliked = false;
    this.liked = !this.liked;
    console.log('like id' + id);
    let form = { "post_id": id }
    this.
      news.
      postReq("/post/like", form).then((response: any) => {
        // this.community_data=response.data;
        //this.community_data=response.data;
        this.newsData.likes = response.data.likes;
        this.newsData.dislikes = response.data.dislikes;
        this.liked = response.data.post.liked_users.includes(this.news_user_id);
        this.disliked = response.data.post.disliked_users.includes(this.news_user_id);

      })
      .catch(err => {
        console.log(err)
      });
  }

  async presentModal() {
    // this.newsData = JSON.stringify(this.newsData);
    console.log('sdds', JSON.stringify(this.newsData));
    const modal = await this.modalCtrl.create({
      component: NewsCommentsComponent,
      //breakpoints: [0, 0.4, 1],
      //initialBreakpoint: 0.4,
      cssClass: 'comments-modal',
      swipeToClose: true,
      componentProps: { 'newsData': this.newsData, 'post_comments': '', text: '' }
    });
    await modal.present();
  }


  async presentReportModal() {
    //this.newsData = JSON.stringify(this.newsData);
    console.log('sdds' + this.newsData);
    const modal = await this.modalCtrl.create({
      component: NewsReportComponent,
      //breakpoints: [0, 0.4, 1],
      //initialBreakpoint: 0.4,
      cssClass: 'reports-modal',
      swipeToClose: true,
      componentProps: { 'newsData': this.newsData, 'post_comments': '', text: '' }
    });
    await modal.present();
  }

  async showDetails() {
    const modal = await this.modalCtrl.create({
      component: DetailsPostComponent,
      cssClass: 'showDetails-modal',
      swipeToClose: true,
    });


    modal.onDidDismiss()
      .then(({ data }) => {
        if (data.role == 'download') {
          this.saveimage();
        } else if (data.role == 'report') {
          this.presentReportModal();
        } else if (data.role == 'share') {
          this.share();
        } else if (data.role == 'block') {

          let form = { "post_id": this.newsData._id };
          this.
            news.
            postReq("/post/block", form).then((response: any) => {
              this.events.triggerBlockedPost(this.newsData._id);
            })
            .catch(err => {
              console.log(err)
            });


          // var blockedPosts: any = localStorage.getItem('blockedPosts');
          // if (blockedPosts) { blockedPosts = JSON.parse(blockedPosts)?.ids }
          // if (blockedPosts && blockedPosts.length != 0) {
          //   !blockedPosts.includes(this.newsData._id) ? blockedPosts.push(this.newsData._id) : null;
          // } else {
          //   blockedPosts = [this.newsData._id];
          // }
          // localStorage.setItem("blockedPosts", JSON.stringify({ ids: blockedPosts }));
         // this.events.triggerBlockedPost(this.newsData._id);
        }
      });
    await modal.present();


  }


  share1() {
    // this.screenshot.URI(80)
    //     .then((res) => {
    //       alert(JSON.stringify(res));
    //      //this.socialSharing.share('df',res.URI,null)
    //      this.socialSharing.share('',null,res.URI,null)
    //        .then(() => {},
    //          () => { 
    //            alert('SocialSharing failed');
    //          });
    //        },
    //       () => {
    //       alert('Screenshot failed');
    //       });

  }
  share() {
    this.
      news.
      postReq("/post/post_action", { post_id: this.newsData._id, action_type: "share" }).then((response: any) => {
        // this.community_data=response.data;
        //this.community_data=response.data;

      })
      .catch(err => {
        console.log(err)
      });


    this.commin.startLoader();
    this.
      news.
      postReq("/image/save", { "post_id": this.newsData._id }).then((response: any) => {
        //alert(JSON.stringify(response));
        this.commin.stopLoader();
        if (this.newsData.type == 'Magazineee') {
          response.data = 'data:application/pdf;base64,' + response.data;
        }
        this.socialSharing.share(this.newsData.news.title, null, response.data, "https://guglanews.com/news/v/" + this.newsData._id)
          .then(() => { },
            () => {
              // alert('SocialSharing failed');
            });

      })
      .catch(err => {
        this.commin.stopLoader();
        console.log(err);
      });
  }

  datetime(e) {
    return moment(e).format("hh:mm A Do-MMM-YY");
  }
  whatsappshare() {
    this.
      news.
      postReq("/post/post_action", { post_id: this.newsData._id, action_type: "share" }).then((response: any) => {
        // this.community_data=response.data;
        //this.community_data=response.data;

      })
      .catch(err => {
        console.log(err)
      });

    this.commin.startLoader();
    this.
      news.
      postReq("/image/save", { "post_id": this.newsData._id }).then((response: any) => {
        //alert(JSON.stringify(response));
        this.commin.stopLoader();
        this.socialSharing.shareViaWhatsApp(this.newsData.news.title, response.data, "https://guglanews.com/news/v/" + this.newsData._id)
          .then(() => { },
            () => {
              // alert('SocialSharing failed');
            });

      })
      .catch(err => {
        this.commin.stopLoader();
        console.log(err);
      });

  }

  saveimage() {
    this.androidPermissions.hasPermission(this.androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE)
      .then(status => {
        if (status.hasPermission) {
          this.save();
        }
        else {
          this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE)
            .then(status => {
              if (status.hasPermission) {
                this.save();
              }
            });
        }
      });
  }
  save() {
    this.
      news.
      postReq("/post/post_action", { post_id: this.newsData._id, action_type: "download" }).then((response: any) => {
        // this.community_data=response.data;
        //this.community_data=response.data;

      })
      .catch(err => {
        console.log(err)
      });

    this.filePermission();
    this.commin.startLoader();
    this.
      news.
      postReq("/image/save", { "post_id": this.newsData._id }).then((response: any) => {

        this.commin.stopLoader();
        //alert(JSON.stringify(response));
        //console.log('likeee data'+JSON.stringify(response));
        let UUID = 'meebuddy-' + (new Date().getTime()).toString(16);
        let realData = response.data.split(",")[1];
        //  alert('helloo'+realData);
        let blob;
        let fileext;
        if (this.newsData.type == 'Magazine') {
          //const imagData = 'data:application/pdf;base64,' + ;
          blob = this.b64toBlob(realData, 'application/pdf');
          fileext = '.pdf';
        }
        else {
          blob = this.b64toBlob(realData, 'image/jpeg');
          fileext = '.jpg'

        }



        this.file.checkDir(this.file.externalRootDirectory + 'Download/', 'MeeBuddy')
          .then(_ => {
            this.file.writeFile(this.file.externalRootDirectory + 'Download/' + 'MeeBuddy/', UUID + fileext, blob).then(response => {
              this.commin.toastMsg("Saved Successfully!");
            }).catch(err => {
              //alert('2');
            })
          })
          .catch(err => {
            this.file.createDir(this.file.externalRootDirectory + 'Download', 'MeeBuddy', false).then(result => {
              this.file.writeFile(this.file.externalRootDirectory + 'Download/' + 'MeeBuddy/', UUID + fileext, blob).then(response => {
                this.commin.toastMsg("Saved Successfully!");
              }).catch(err => {
                //alert('4');
              })
            })
          });


      })
      .catch(err => {
        this.commin.stopLoader();
      });

    //this.screenshot.save().then(this.onSuccess, this.onError); 
  }
  save1() {
    // let path=this.file.externalRootDirectory;
    // this.file.checkDir(path, 'meebuddy1')
    //       .then(_ => {
    //         alert('yes')
    //       })

    //    this.screenshot.save().then(this.onSuccess, this.onError); 
  }

  b64toBlob(base64Data, contentType) {
    contentType = contentType || '';
    var sliceSize = 1024;
    var byteCharacters = atob(base64Data);
    var bytesLength = byteCharacters.length;
    var slicesCount = Math.ceil(bytesLength / sliceSize);
    var byteArrays: any = new Array(slicesCount);

    for (var sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
      var begin = sliceIndex * sliceSize;
      var end = Math.min(begin + sliceSize, bytesLength);

      var bytes = new Array(end - begin);
      for (var offset = begin, i = 0; offset < end; ++i, ++offset) {
        bytes[i] = byteCharacters[offset].charCodeAt(0);
      }
      byteArrays[sliceIndex] = new Uint8Array(bytes);
    }
    return new Blob(byteArrays, { type: contentType });
  }


  onSuccess(success) {
    //         alert(JSON.stringify(success));
    // alert(success);
  }
  onError(err) {
    alert('e' + err);
  }

  filePermission() {
    this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE).then(
      result => console.log('Has permission?', result.hasPermission),
      err => this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE)
    );

  }

  dislike(id) {
    this.disliked = !this.disliked;
    this.liked = false;
    console.log('like id' + id);
    let form = { "post_id": id }
    this.
      news.
      postReq("/post/dislike", form).then((response: any) => {
        // this.community_data=response.data;
        //this.community_data=response.data;
        this.newsData.dislikes = response.data.dislikes;
        this.newsData.likes = response.data.likes;
        this.liked = response.data.post.liked_users.includes(this.news_user_id);
        this.disliked = response.data.post.disliked_users.includes(this.news_user_id);

        //console.log('likeee data'+response.data);
      })
      .catch(err => {
        console.log(err)
      });
  }

  ngOnInit() {

    this.disliked = false;
    this.liked = false;
    this.newsData = this.newsData;
    if (this.newsData.disliked_users[0]) {
      this.disliked = true;
    }
    else if (this.newsData.liked_users[0]) {
      this.liked = true;
    }
    console.log("news posts", this.newsData)
  }

}
