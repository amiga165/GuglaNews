import { Component, OnInit } from '@angular/core';
import { NewsPage } from '../../news.page';
// import { NewsPage } from '../../news.page';
import { NewsService } from "../../../../providers/news/news.service";
import { CommonService } from "../../../../providers/common/common.service";
import { CenterService } from "../../../../providers/center/center.service";
@Component({
  selector: 'app-present-news',
  templateUrl: './present-news.page.html',
  styleUrls: ['./present-news.page.scss'],
})
export class PresentNewsPage implements OnInit {

  local_news=[];
  local_last_id="";
  formdata={
		"village": this.center.location.village_id,
		"mandal": this.center.location.mandal_id,
		"district": this.center.location.district_id,
		"state": this.center.location.state_id,
		"last_id":"",
		// village: "5ffde939528beb352afbbda6",
    // 	mandal: "5ffde92b6563fd34c467edc4",
    // 	district: "5ffde92b6563fd34c467edc3",
    // 	state: "5ffde92916ae1e34a0a6965b"



		// Sample Data in location------->
		// district: "Krishna"
		// district_id: "5ffde92b6563fd34c467edd4"
		// mandal: "Mylavaram"
		// mandal_id: "5ffde92b6563fd34c467ee29"
		// state: "Andhra Pradesh"
		// state_id: "5ffde92916ae1e34a0a6965b"
		// village: "Mylavaram_Town"
		// village_id: "5ffde93a528beb352afbbe0a"
	}
  constructor(
    // public news:NewsPage,
    public news:NewsService,
		public commin: CommonService,
		public center :CenterService
  ) { }

  add_more_local_posts(){
	
    this.formdata.last_id=this.local_last_id;
    // console.log(this.local_news_data);
    this.news.
      postReq("/local/feed",this.formdata)
      .then((data:any) => {
  
      console.log(data);
      if (data.data.length){
      for (var i of data.data){
        this.local_news.push(i);	
      }
      this.local_last_id=this.local_news[this.local_news.length-1]._id;
      //this.commin.toastMsg("News Fetched succesfully");
      this.add_more_local_posts();
    }
    else{
      //this.commin.toastMsg("That's all for now.");
      return
    }
      })
      .catch((error:any) => {
      //this.commin.toastMsg("There was an error fecting the news");
      })
      
  
  }

  ngOnInit() {
    this.add_more_local_posts();
    // this.local_news=this.news.local_news_data;
    // console.log("this is local news to be displayed",this.local_news);
  }

}
