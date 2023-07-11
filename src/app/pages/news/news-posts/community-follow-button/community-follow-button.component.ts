import { Component, Input, OnInit } from '@angular/core';
import { NewsService } from 'src/app/providers/news/news.service';
import { UserService } from '../../../../providers/user/user.service';


@Component({
  selector: 'app-community-follow-button',
  templateUrl: './community-follow-button.component.html',
  styleUrls: ['./community-follow-button.component.scss'],
})
export class CommunityFollowButtonComponent implements OnInit {

  @Input() community_id:any;
  
news_user_id:any;
  community_data:any=[];
  com_mem:any;
  com_mem_pen:any;
  com_owner:any;
  com_post = 0;

  constructor(public news:NewsService,public user: UserService
              ) { }

  ngOnInit() {
    this.community_id = this.community_id;
    this.fetch_community_data();
    console.log(this.community_id+"uuuu");
    this.news_user_id=this.user.getnewsuserid();
    
  }


  fetch_community_data(){
    let form={"community_id":this.community_id};
    console.log("This is the id of community",this.community_id);
    this.
    news.
    postReq("/community",form).then((response:any) =>{
      this.community_data=response.data;
      this.com_mem=this.community_data.members.includes(this.news_user_id);
      this.com_mem_pen=this.community_data.join_requests.length;
      this.com_owner=this.community_data.owner.includes(this.news_user_id);
      this.com_post=this.community_data['posts'].length;

    })
    .catch(err=>{
      console.log(err)
    });

  }

  follow(){

    let form={"community_id":this.community_id}
    this.
    news.
    postReq("/community/join-request",form).then((response:any) =>{
      this.community_data=response.data;
      console.log(response.data)
      this.fetch_community_data()
    })
    .catch(err=>{
      console.log(err)
    });
  }

  unfollow(){
    let form={"community_id":this.community_id}
    this.
    news.
    postReq("/community/leave",form).then((response:any) =>{
      console.log(response.data);
      // this.com_mem=0;
      // this.com_mem_pen=0;
      this.fetch_community_data()
    })
    .catch(err=>{
      console.log(err)
    });
  }




}