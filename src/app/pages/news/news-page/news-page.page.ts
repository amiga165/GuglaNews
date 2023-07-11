import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {NewsPage} from '../news.page';
// import {}

@Component({
  selector: 'app-news-page',
  templateUrl: './news-page.page.html',
  styleUrls: ['./news-page.page.scss'],
})
export class NewsPagePage implements OnInit {
  public ind : number;
  public slideOpts:any= {
    direction: 'vertical',
    initialSlide: 0,
    grabCursor: true,
    cubeEffect: {
      shadow: true,
      slideShadows: true,
      shadowOffset: 20,
      shadowScale: 0.94,
    },

   
  
  };
  news_data:any=[]

  constructor(
    public activeroute: ActivatedRoute,
    public news:NewsPage,
	  ) 
	  {
		  // this.news_data = news.news_data;
		  // console.log(news.news_data);
      this.slideOpts.initialSlide=this.activeroute.snapshot.params['ind'];
      // console.log(typeof(+this.ind));
     
     }



  //flip


  load() {
		this.news.add_more_community_posts();	
	}
  

  ngOnInit() {

    this.news_data=this.news.community_news_data;
    console.log(this.news_data);
    
  }

  ionViewWillLeave() {
    let listaFrames = document.getElementsByTagName("iframe");
    // for (var index = 0; index < listaFrames.length; index++) {
    //     let iframe = listaFrames[index].contentWindow;          
    //     iframe.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
    //  }
}

}
