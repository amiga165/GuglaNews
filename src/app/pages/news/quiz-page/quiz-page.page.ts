import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NewsService } from 'src/app/providers/news/news.service';

@Component({
  selector: 'app-quiz-page',
  templateUrl: './quiz-page.page.html',
  styleUrls: ['./quiz-page.page.scss'],
})
export class QuizPagePage implements OnInit {

  preloader:boolean = false;

  active:any = 'all';

  options = {
    slidesPerView: 4.5,
    spaceBetween: 10,
    slidesOffsetBefore:0
  }
  categories:any;
  filterposts:any
  newsdata:any;
  constructor(public location: Location,public news:NewsService) { 
    this.getQuizPosts();
  }

  ngOnInit() {
    this.preloader = true;
  }

  back(){
    this.location.back()
  }

  getQuizPosts(){
	

    // console.log(this.local_news_data);
    this.news.
      postReq("/feed/post_type",{"post_type":"Quiz"})
      .then((response:any) => {
      this.newsdata=response.data;
      console.log('quizeeeee'+JSON.stringify(response.data));
      this.filterposts=this.newsdata;
      this.preloader = false;
      this.GetCategories();
    //   if (data.data.length){
    //   for (var i of data.data){
    //     this.local_news_data.push(i);	
    //   }
    //   this.local_last_id=this.local_news_data[this.local_news_data.length-1]._id;
    // //	//this.commin.toastMsg("News Fetched succesfully");
    // }
    // else{
    //   ////this.commin.toastMsg("That's all for now.");
    // }
      })
      .catch((error:any) => {
      //  //this.commin.toastMsg("There was an error fecting the news");
      })
      
  
  }


  GetCategories()
{
  this.categories=[];
  for (var i = 0; i < this.newsdata.length; i++)
   {
    console.log('hihi'+JSON.stringify(this.newsdata[i].category));
      if(this.newsdata[i].category)
      {
        this.categories.push(this.newsdata[i].category);
      }
   }
const key = '_id';
this.categories = [...new Map(this.categories.map(item =>
  [item[key], item])).values() ];
  console.log('categoryyyy0000'+JSON.stringify(this.categories)+this.newsdata.length);

}


PostFilter(id,value)
{
  console.log(id);
  if(id=='all')
  {
    this.filterposts=this.newsdata;
    this.active = value;
  }
  else
  {
    var posts=this.newsdata;
    console.log(JSON.stringify(posts));
    this.filterposts = posts.filter(function(obj, index){
      // console.log('hi'+obj.category);
      this.active = value;
          if(obj.category)
          {
           return obj.category._id===id;
          }
      })

   }
}

}
