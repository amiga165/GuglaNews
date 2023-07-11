import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {Location} from '@angular/common';
import { NewsService } from '../../../providers/news/news.service';
@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
  result_list=[];
  suggested_community:any;
  search_key:any;

  categoryData:any = [];
  features:any = [{name:'Polls',avatar:'assets/post/Image.svg'},
                  {name:'Links',avatar:'assets/post/Link.svg'},
                  {name:'Magazines',avatar:'assets/post/Video.svg'},
                  {name:'Quiz',avatar:'assets/post/FullImage.svg'}
                ];

  constructor(
    public news: NewsService,
    public router: Router,
    public location:Location
  ) { 
    this.get_category_data();
  }

  get_category_data(){
    this.news
    .getReq('/categories')
    .then((data:any) => {
      this.categoryData = data.data;
    })
    .catch((err:any) => {})
  } 
  view_category(cat_id,cat_name){
    this.router.navigate(['../news/news-category-view',{id:cat_id,name:cat_name}]);
  }

  myBackButton(){
    this.location.back();
  }
  
  result(key:any){
    key=key.target.value;
    if (key==""){
      this.result_list=[];
      this.search_key = "";
    }
    else{
    this.search_key = key;
    this.news.
    postReq("/community/search",{keyword:key}).then((data:any) => {
      this.result_list=data.data;
      console.log(JSON.stringify(this.result_list) + "commmmmm");
    })
  }
  }

  comm_page(id:any){
    this.router.navigate(['./news/community-page-view',{id:id}]);
  }

  suggested_communities(){
    this.news.postReq("/community/suggested_communities",{}).then((response:any) =>{
      this.suggested_community=response.data;
    })
  }
  ngOnInit() {
    this.suggested_communities();
  }


  



}
