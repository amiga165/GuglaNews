import { Component, OnInit, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/providers/common/common.service';
import { NewsService } from 'src/app/providers/news/news.service';

@Component({
  selector: 'app-url-post',
  templateUrl: './url-post.component.html',
  styleUrls: ['./url-post.component.scss'],
})
export class UrlPostComponent implements OnInit {
  @Input() newsData: any;
  @Input() type:any;
  @Input() news_id:any;
  @Input() edit:any;
  @Input() time:any;
  @Input() postData:any;
  
  constructor(public sanitizer: DomSanitizer,
              public router:Router,
              public common:CommonService,public news:NewsService) { }

  ngOnInit() {


    this.
    news.
    postReq("/post/post_action",{post_id:this.postData._id,action_type:"view" }).then((response:any) =>{
      // this.community_data=response.data;
      //this.community_data=response.data;

    })
    .catch(err=>{
      console.log(err)
    });

// console.log(JSON.stringify(this.newsData) + "wwww");
// if(this.type.type=='large')
// {
//       this.admobFreeService.hideBannerAd();
// }
  }

  get(url:any)
  {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  redirectToViewNews(){
    this.router.navigate(['../news/view-news',{ id: this.news_id, name: 'URLPost' }]);
  }

ionViewWillLeave() {
    let listaFrames = document.getElementsByTagName("iframe");
    // for (var index = 0; index < listaFrames.length; index++) {
    //     let iframe = listaFrames[index].contentWindow;          
    //     iframe.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
    //  }
}
}
