import { Component, OnInit,Input } from '@angular/core';
import { UserService } from '../../../../providers/user/user.service';
import { NewsService } from '../../../../providers/news/news.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { CommonService } from 'src/app/providers/common/common.service';


@Component({
  selector: 'app-survey-post',
  templateUrl: './survey-post.component.html',
  styleUrls: ['./survey-post.component.scss'],
})
export class SurveyPostComponent implements OnInit {
@Input() newsData: any;
@Input() type: any;
@Input() news_id: any;
@Input() time:any;
@Input() edit:any;
@Input() postData:any;

  constructor(public user:UserService,
              public news: NewsService,
              public router: Router,
              public location:Location,public common:CommonService) { }




submitSurvey()
{
  let survey=this.newsData._id;
  let questions=this.newsData.questions;
  //  let form={"post_id":id}
    this.
    news.
    postReq("/post/submit/survey",{survey:survey,questions:questions}).then((response:any) =>{
     //this.community_data=response.data;
      console.log('data'+JSON.stringify(response.data));

       this.news.
      postReq("/post",{"post_id":this.news_id})
      .then((response:any) => {
      this.newsData=response.data.news;
console.log('newsdaattaaaa'+JSON.stringify(this.newsData));
      this.checkIsSubmitted(this.newsData);
      
      })
      .catch((error:any) => {
        
      })

    })
    .catch(err=>{
      console.log(err)
    });
}


redirectToViewNews(){
  this.router.navigate(['../news/view-news',{ id: this.news_id, name: 'Survey' }]);
}

back(){
  this.location.back();
}

checkIsSubmitted(newsdata){
 // this.newsData=response.data[0].news;
  if(newsdata.submissions.length)
  {
    return true;
  }
  else{
    return false;
  }
}

stringAsDate(dateStr: string) {

  let now = new Date().getTime();

  let past = new Date(dateStr).getTime();

  let time = now - past;

  let diffDay = Math.floor(time / 86400000);

  let diffHour = Math.floor((time % 86400000) / 3600000);

  let diffMinute = Math.floor(((time % 86400000) % 3600000) / 60000);

  let diffSecs = Math.floor((((time % 86400000) % 3600000) % 60000) / 1000 ); 

  let diffMonths = Math.floor(diffDay/30);

  let diffyears = Math.floor(diffMonths/12);

  if (diffSecs >= 1 && diffMinute < 1){

    return diffSecs + " seconds ago";

  }else if(diffMinute >= 1 && diffHour < 1){

    return diffMinute + " minutes ago"    

  }else if(diffHour >= 1 && diffDay < 1){

    return diffHour + " hours ago";
    
  }else if(diffDay >= 1 && diffMonths < 1){

    return diffDay + " days ago";

  }
  else if(diffMonths >= 1 && diffyears < 1){

    return diffMonths + " months ago";
    
  }
  else if(diffyears >= 1){

    return diffyears + " years ago";
    
  }
  else{
    return new Date(dateStr);
  } 
}

  ngOnInit() {
    this.news_id=this.news_id;
    console.log('news idddd'+this.news_id);


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
}
