import { Component, OnInit } from '@angular/core';
import { NewsService } from "../../../../providers/news/news.service";
import { CommonService } from 'src/app/providers/common/common.service';
import { CenterService } from 'src/app/providers/center/center.service';
@Component({
  selector: 'app-addpost',
  templateUrl: './addpost.page.html',
  styleUrls: ['./addpost.page.scss'],
})
export class AddpostPage implements OnInit {

  constructor(
		public news:NewsService,
    public commin: CommonService,
    public center:CenterService
  ) { }
  formdata={
    name:"",
    description:"",
    type:"private",
    image:[]
  }

  onImageSelected(event) {
    let me = this;
    let file = event.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.formdata.image[0] = reader.result as string;
      this.formdata.image[0] = this.formdata.image[0].replace(/^.+?;base64,/, '');
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
  }

  Community_type(event){
    this.formdata.type=event.detail.value;
  }

  Create(){
    console.log(this.formdata);
    this.news.
    postReq("/community/create",this.formdata)
    .then((data:any) => {
      //this.commin.toastMsg("Community created succesfully");

    })
    .catch((error:any) => {
      //this.commin.toastMsg("There was an error creating community fill all fields");
    })





    // this.news
    // .postReq('/post/add',this.formdata)
    // .then((data:any)=>{
    //   //this.commin.toastMsg("News posted succesfully");
  
    // })
    // .catch((err) => {
    //   console.log(err);
    //   //this.commin.toastMsg(err.message);
    // })
  }


  location()
  {
    this.center.getLocation()
  }

  ngOnInit() {
  }

}
