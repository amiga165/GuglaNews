import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CommonService } from 'src/app/providers/common/common.service';
import { NewsService } from 'src/app/providers/news/news.service';

@Component({
  selector: 'app-news-comments-report',
  templateUrl: './news-comments-report.component.html',
  styleUrls: ['./news-comments-report.component.scss'],
})
export class NewsCommentsReportComponent implements OnInit {

  @Input() post_id: any;
  @Input() comment_id: any;
  formData: any = {
    post_id: '',
    comment_id: '',
    issue_type: '',
    description: '',
    contact_info: '',
  };
  constructor(
    public modalCtrl: ModalController,
    public news: NewsService,
    public commin: CommonService
  ) { 
    this.comment_id = this.comment_id;
    this.post_id = this.post_id;
  }

  ngOnInit() {
    this.formData.post_id = this.post_id;
    this.formData.comment_id = this.comment_id;
  }

  submit() {
    console.log(this.formData)
    if (this.formData.issue_type) {
      this.commin.startLoader();
      this.news
        .postReq('/report_news', this.formData)
        .then((data: any) => {
          this.formData = {
            post_id: '',
            comment_id:'',
            issue_type: '',
            description: '',
            contact_info: '',
          };
          this.commin.stopLoader();
          this.commin.toastMsg(data.data);
        })
        .catch((error: any) => {
          this.commin.stopLoader();
        });

      
      this.modalCtrl.dismiss();
    } else {
      this.commin.toastErr('Please provide the issue type!');
    }
  }

  dismissModal(){
    this.modalCtrl.dismiss();
  }

  type(event: any) {
    this.formData.issue_type = event.detail.value;
  }
}
