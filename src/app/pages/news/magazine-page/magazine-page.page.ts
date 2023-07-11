import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { NewsService } from 'src/app/providers/news/news.service';

@Component({
  selector: 'app-magazine-page',
  templateUrl: './magazine-page.page.html',
  styleUrls: ['./magazine-page.page.scss'],
})
export class MagazinePagePage implements OnInit {

  newsdata:any;
  preloader:boolean = false;
  categories:any;
  filterposts:any;
  options = {
    slidesPerView: 4.5,
    spaceBetween: 10,
    slidesOffsetBefore:0
  }
  
  pos:any = 'all';
  subpos:any;
  subsubpos:any;
  
  catData = [  
                  {name: 'CSE', 
                  icon:'home', 
                  subSubCat:[
                            {name: 'c1', icon:'home'},
                            {name: 'c2', icon:'home'}
                            ]
                  },
                  {name: 'Mech', 
                  icon:'home', 
                  subSubCat:[
                            {name: 'm1', icon:'home'},
                            {name: 'm2', icon:'home'}
                            ]
                  }
              ];
  subCategories:any = [];
  subSubCategories:any;


  constructor(public location: Location,public navCtrl:NavController, public news:NewsService) { 
    this.getMagazinePosts();
  }

  ngOnInit() {
    this.preloader = true;
  }

  back(){
    this.navCtrl.back() 
  }

  getMagazinePosts(){
	

    // console.log(this.local_news_data);
    this.news.
      postReq("/feed/post_type",{"post_type":"Magazine"})
      .then((response:any) => {
      this.newsdata=response.data;
      this.filterposts=this.newsdata;
      this.preloader = false;
      this.GetCategories();
        console.log('category');
      })
      .catch((error:any) => {
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
  this.subCategories = [];
  this.subSubCategories = null;
  this.subpos = null;
  this.subsubpos = null;

  if(id=='all')
  {
    this.filterposts=this.newsdata;
    this.pos = 'all';

    this.subCategories = this.catData;
  }
  else
  {
    var posts=this.newsdata;   
    this.filterposts = posts.filter(function(obj, index){
  
          if(obj.category)
          {
           return obj.category._id===id;
          }
      })

      this.pos = value;

      this.subCategories.push(this.catData[1]);
   }
}

subFilter(value:any){
  this.subSubCategories = this.catData[value].subSubCat;
  this.subpos = value;
}

subSubFilter(value:any){
  this.subsubpos = value;
}


}
