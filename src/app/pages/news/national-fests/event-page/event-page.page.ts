import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NewsService } from 'src/app/providers/news/news.service';
import axios from 'axios';
import { CenterService } from 'src/app/providers/center/center.service';

@Component({
  selector: 'app-event-page',
  templateUrl: './event-page.page.html',
  styleUrls: ['./event-page.page.scss'],
})
export class EventPagePage implements OnInit {

  public segmentTabActive:String = "events";
  public EventsList = [];
  public WorkshopsList = [];
  public DeptActive = 'forall';
  public formdata: any;
  public all_news_data = [];

  options = {
    slidesPerView: 4.5,
    spaceBetween: 5,
    slidesOffsetBefore: 0,
  };

  public EventsListIcons = [
    {
      name: 'FOR ALL',
      dept: 'forall',
      img: 'assets/fests/teckzite/cse.jpg',
    },
    {
      name: 'ROBOTICS',
      dept: 'robotics',
      img: 'assets/fests/teckzite/cse.jpg',
    },
    {
      name: 'PUC',
      dept: 'puc',
      img: 'assets/fests/teckzite/cse.jpg',
    },
    {
      name: 'CSE',
      dept: 'cse',
      img: 'assets/fests/teckzite/cse.jpg',
    },
    {
      name: 'ECE',
      dept: 'ece',
      img: 'assets/fests/teckzite/cse.jpg',
    },
    {
      name: 'MECH',
      dept: 'mech',
      img: 'assets/fests/teckzite/cse.jpg',
    },
    {
      name: 'EEE',
      dept: 'eee',
      img: 'assets/fests/teckzite/cse.jpg',
    },
    {
      name: 'MME',
      dept: 'mme',
      img: 'assets/fests/teckzite/cse.jpg',
    },
    {
      name: 'CIVIL',
      dept: 'civil',
      img: 'assets/fests/teckzite/cse.jpg',
    },
    {
      name: 'CHEM',
      dept: 'chem',
      img: 'assets/fests/teckzite/cse.jpg',
    }
  ];

  public SubEventsList:any;

  constructor(
    public router: Router,
    public news: NewsService,
    public http: HttpClient,
    public center: CenterService,
  ) { }

  ngOnInit() {
    this.fetchEvents('forall');
    this.fetchWorkshops();

    this.formdata = {
      village: this.center.location.village_id,
      mandal: this.center.location.mandal_id,
      district: this.center.location.district_id,
      state: this.center.location.state_id,
      last_id: '',
    };

    this.add_more_all_posts()
  }

    // EVENTS
  async fetchEvents(dept:string){   
    this.DeptActive = dept; 
    this.http
    .get(`https://teckzite.org/restful_apis/events.php?dept=${dept}`)
    .subscribe(
      (resp) => {
        this.EventsList = resp['events'] ? resp['events'] : [];
        console.log("teck",resp['events'])
      },
      (err) => {
        console.log(err)
      }
    );
  }

  // WORKSHOPS
  async fetchWorkshops() {
    this.http
      .get(`https://teckzite.org/restful_apis/workshops.php`)
      .subscribe(
        (resp) => {
          this.WorkshopsList = resp['workshops'] ? resp['workshops'] : [];
          console.log('teckworkshops', resp['workshops']);
        },
        (err) => {
          console.log(err);
        }
      );
  }

  all_last_id = '';
  add_more_all_posts() {
    this.formdata.last_id = this.all_last_id;
    this.formdata.category='64201502c971928306b2181c';
    this.news
      .postReq('/feed', this.formdata)
      .then((data: any) => {
        console.log('teckkkk',data)
        if (data.data.length) {
          for (var i of data.data) {
            this.all_news_data.push(i);
          }
          this.all_last_id =
            this.all_news_data[this.all_news_data.length - 1]._id;
        }
      })
      .catch((error: any) => {});
  }

  onIonInfinite(event) {
    this.add_more_all_posts();
    // console.log('Begin async operation');
    setTimeout(() => {
      // console.log('Async operation has ended');
      event.target.complete();
    }, 500);
  }

  redirectToViewEvent(dept:string, sno:string){
    this.router.navigate(['national-fests/view-event-page',{dept,sno}]);
  }
  redirectToViewWorkshop(sno:string){
    this.router.navigate(['national-fests/view-workshop-page',{sno}]);
  }

  back(){
    this.router.navigateByUrl('news/allnews', { replaceUrl: true });
  }

  
}
