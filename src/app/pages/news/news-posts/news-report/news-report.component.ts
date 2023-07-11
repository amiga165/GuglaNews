import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CommonService } from 'src/app/providers/common/common.service';
import { NewsService } from 'src/app/providers/news/news.service';

@Component({
  selector: 'app-news-report',
  templateUrl: './news-report.component.html',
  styleUrls: ['./news-report.component.scss'],
})
export class NewsReportComponent implements OnInit {
  @Input() newsData: any;

  formData: any = {
    post_id: '',
    issue_type: '',
    description: '',
    contact_info: '',
  };
  comments: any;
  constructor(
    public modalCtrl: ModalController,
    public news: NewsService,
    public commin: CommonService
  ) {
    this.newsData = this.newsData;
  }

  ngOnInit() {
    console.log('mmm', this.newsData);
    this.formData.post_id = this.newsData._id;

  }

  dismissModal() {
    this.modalCtrl.dismiss();
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
  type(event: any) {
    this.formData.issue_type = event.detail.value;
  }
}
