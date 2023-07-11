import { Component, OnInit } from '@angular/core';
import {NewsService } from '../../../../providers/news/news.service';
import { ActivatedRoute } from '@angular/router';
import {Location} from '@angular/common'
@Component({
  selector: 'app-community-page',
  templateUrl: './community-page.page.html',
  styleUrls: ['./community-page.page.scss'],
})
export class CommunityPagePage implements OnInit {
  public community_data:any;
  community_id:any;
  com_mem=0;
  com_mem_pen=0;
  com_post=0;

  constructor(
    public route: ActivatedRoute,
    public news:NewsService,
    public location: Location
    )
    { 
		// this.community_id = this.route.snapshot.params["id"];
    // console.log("This is the id of community",this.community_id);

    }

  fetch_community_data(){
    let form={"community_id":this.community_id};
    console.log("This is the id of community",this.community_id);
    this.
    news.
    postReq("/community",form).then((response:any) =>{
      this.community_data=response.data;
      console.log(this.community_data);
      this.com_mem=this.community_data['members'].length;
      this.com_mem_pen=this.community_data['join_requests'].length;
      this.com_post=this.community_data['posts'].length;

    })
    .catch(err=>{
      console.log(err)
    });

  }

  myBackButton(){
    this.location.back();
  }
  editProfilePage()
  {

  }

  follow(){

    let form={"community_id":this.community_id}
    this.
    news.
    postReq("/community/join-request",form).then((response:any) =>{
      // this.community_data=response.data;
      this.community_data=response.data;
      console.log(response.data);
      // this.com_mem=this.community_data['members'].length;
      // this.com_mem=0;
      // this.com_mem_pen=1;
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
      // this.community_data=response.data;
      console.log(response.data);
      // this.com_mem=this.community_data['members'].length;
      this.com_mem=0;
      this.com_mem_pen=0;
      this.fetch_community_data()
    })
    .catch(err=>{
      console.log(err)
    });
  }

  ngOnInit() {
		this.community_id = this.route.snapshot.params["id"];
    console.log("This is the id of community",this.community_id);
    this.fetch_community_data()
  }

}

