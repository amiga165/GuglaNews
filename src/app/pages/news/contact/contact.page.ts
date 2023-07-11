import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NewsService } from 'src/app/providers/news/news.service';
import { CommonService } from 'src/app/providers/common/common.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.page.html',
  styleUrls: ['./contact.page.scss'],
})
export class ContactPage implements OnInit {

  formdata:any={};
  constructor(public location:Location,public news:NewsService,public commin: CommonService) { }

  ngOnInit() {
  }

  back(){
    this.location.back();
  }
    submit(){

    if(this.formdata && this.formdata?.message_type && this.formdata?.message){
      this.commin.startLoader();

      this.news.
      postReq("/contact-us",this.formdata)
      .then((data:any) => {
        this.formdata={};
        this.commin.stopLoader();
        this.commin.toastMsg(data.data);
        this.location.back();
      })
      .catch((error:any) => {
        this.commin.stopLoader();
        //this.commin.toastMsg("There was an error, fill all fields");
      })
    }else{
         this.commin.toastErr("Please fill all the fields!");
    }



  }
}
