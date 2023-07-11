import { Component, OnInit } from '@angular/core';
import { NewsService } from '../../../../providers/news/news.service';
import { CommonService } from '../../../../providers/common/common.service';
@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {
  community_members = [];
  constructor(public news: NewsService, public commin: CommonService) {}

  fetch() {
    this.news.postReq('/community/owned-communities', {}).then((data: any) => {
      this.community_members = data.data;
    });
  }

  accecpt(id) {
    let data = { request_id: id };
    console.log(id);
    this.news
      .postReq('/community/accept-request', data)
      .then((data: any) => {
        //this.commin.toastMsg('request Accepted');
        console.log(data);
      })
      .catch((error: any) => {
        console.log('error', error);
      });
    this.fetch();
  }

  decline(id) {
    let data = { request_id: id };
    console.log(id);
    this.news
      .postReq('/community/reject-request', data)
      .then((data: any) => {
        //this.commin.toastMsg('request Declined');
        // console.log(data);
      })
      .catch((error: any) => {
        console.log('error', error);
      });
    this.fetch();
  }

  remove(user_id, comm_id) {
    let data = {
      community_id: comm_id,
      news_user_id: user_id,
    };
    this.news
      .postReq('/community/remove-user', data)
      .then((data: any) => {
        //this.commin.toastMsg('User removed');
        this.fetch();
        // console.log(data);
      })
      .catch((error: any) => {
        console.log('error', error);
      });
    this.fetch();
  }

  ngOnInit() {
    this.fetch();
  }
}
