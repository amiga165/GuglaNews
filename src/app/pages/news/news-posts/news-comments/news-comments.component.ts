import { Component, Injectable, OnInit, ViewChild,Input } from '@angular/core';
import { IonContent, ModalController } from '@ionic/angular';
import { NewsService } from '../../../../providers/news/news.service';
import { NewsCommentsReportComponent } from '../news-comments-report/news-comments-report.component';
@Component({
  selector: 'app-news-comments',
  templateUrl: './news-comments.component.html',
  styleUrls: ['./news-comments.component.scss'],
})
export class NewsCommentsComponent implements OnInit {
@Input() newsData:any;
@Input() post_comments:any;
@Input() text:any;

@ViewChild(IonContent) content: IonContent;

formData1:any={text:'',post_id:'',parent_id:''};
comments:any;

  constructor(public modalCtrl: ModalController,public news: NewsService) { 
   console.log('meetings'+this.comments);
  }
  ngOnInit() {
    
    this.post_comments=this.post_comments;
        this.text=this.text;
    this.newsData=this.newsData;
    console.log('dsd'+this.newsData.type);
    this.formData1;
    this.getcomments();

    // this.content.scrollToBottom();

  }
//  commenttext(event) {
//   this.formData1.text = event.target.value;
// }



  sendcomment(id)
  {
    console.log(id);
    this.formData1.post_id=id;
    this.
    news.
    postReq("/post/comment",this.formData1).then((response:any) =>{
      this.comments.push(response.data);
      this.formData1.text = "";

      this.content.scrollToBottom(300);

    })
    .catch(err=>{
      console.log(err)
    });
  }
// onChange(event:any,value:any){
//   console.log(value)
// }
getcomments()
{
    this.
    news.
    postReq("/comments/",{post_id:this.newsData._id}).then((response:any) =>{
      // this.community_data=response.data;
      //this.community_data=response.data;
      //this.newsData.dislikes=response.data;
      //console.log('likeee data'+response.data);
     // console.log('data'+JSON.stringify(response.data));
     // this.post_comments=response.data.comments;
    //  console.log('com'+this.post_comments);
   // console.log('cccoom'+JSON.stringify());
      this.comments=response.data[0].comments;
     // console.log('dsdsdsd'+JSON.stringify(this.comments));
    })
    .catch(err=>{
      console.log(err)
    });
}


  dismissModal()
  {
    this.modalCtrl.dismiss();
  }

  async showDetails(comment_id) {

    const modal = await this.modalCtrl.create({
      component: NewsCommentsReportComponent,
      cssClass: 'reports-modal',
      componentProps: {'post_id':this.newsData._id,'comment_id':comment_id},
      swipeToClose: true,
    });
    await modal.present();
    
  }


}
