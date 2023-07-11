import { Component, OnInit,Input } from '@angular/core';
import { NewsService } from 'src/app/providers/news/news.service';
import { UserService } from '../../../../providers/user/user.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { CommonService } from 'src/app/providers/common/common.service';
@Component({
  selector: 'app-poll-post',
  templateUrl: './poll-post.component.html',
  styleUrls: ['./poll-post.component.scss'],
})
export class PollPostComponent implements OnInit {
@Input() newsData: any;
@Input() type:any;
@Input() news_id: any;
@Input() time:any;
@Input() edit:any;
@Input() postData:any;

  calc_width = [];
  isOptionChecked:boolean = false;
  submitted:boolean=false;

  constructor(public user:UserService,public news:NewsService,public router:Router,public location:Location,
    public common:CommonService) {
    
   }

  ngOnInit() {
  this.newsData=this.newsData;
  this.news_id=this.postData._id;
  console.log('newsid'+this.news_id);
  console.log('dsd'+ JSON.stringify(this.newsData));


  this.
    news.
    postReq("/post/post_action",{post_id:this.postData._id,action_type:"view" }).then((response:any) =>{
      // this.community_data=response.data;
      //this.community_data=response.data;

    })
    .catch(err=>{
      console.log(err)
    });

 // this.getPollData();
      if(this.newsData.submissions)
      {
        this.submitted=true;

      }
      else
      {
      this.submitted=false;
      }
  }



submit(poll,option){
  this.
  news.
  postReq("/post/submit/poll",{"poll":poll,"option":option}).then((response:any) =>{
    // this.community_data=response.data;
   ;
    this.isOptionChecked = true;
    this.submitted=true;
    

     this.news.
      postReq("/post",{"post_id":this.news_id})
      .then((response:any) => {
      this.newsData=response.data.news;
     // this.newsData.options=response.data;
      //this.newsData.submissions[0].option=option;
      this.ischecked1(option);
      this.setTime();
      })
      .catch((error:any) => {
        
      })

  })
  .catch(err=>{
    console.log(err)
  });

}


tabopen()
{
  this.user.tabopen=true;
}
closetab()
{
  this.user.tabopen=false;
}

tabclose(){
  this.user.tabopen = false;
}


// Option Validation and Calculation
ischecked1(id){
  console.log('newsssss'+JSON.stringify(this.newsData));
  if(this.newsData.submissions.length)
  {
      console.log('newsssss11'+JSON.stringify(this.newsData));
      if(this.newsData.submissions[0].option==id)
      {
          this.setTime();
          return true;    
      }
      else{
        return false;
      }

  }
}

setTime(){
  var totalVotesCount = 0;
  for(let i=0; i<this.newsData.options.length; i++){
      totalVotesCount += this.newsData.options[i].votes_count;
  }
  for(let i=0; i<this.newsData.options.length; i++){
    this.calc_width[i] = ((this.newsData.options[i].votes_count / totalVotesCount) * 100).toFixed(2);
    console.log(this.calc_width[i] + "calc");
  }
}

optionWidth(i){
  return this.calc_width[i];
}





redirectToViewNews(){
    this.router.navigate(['../news/view-news',{ id: this.news_id, name: 'Poll' }]);
  }


  back(){
    this.location.back();
  }


  
  

}
