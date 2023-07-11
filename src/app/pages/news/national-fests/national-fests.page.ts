import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CenterService } from 'src/app/providers/center/center.service';
import { NewsService } from 'src/app/providers/news/news.service';

@Component({
  selector: 'app-national-fests',
  templateUrl: './national-fests.page.html',
  styleUrls: ['./national-fests.page.scss'],
})
export class NationalFestsPage implements OnInit {
  public EventsList = [];
  public WorkshopsList = [];
  public formdata: any;
  public all_news_data = [];

  optionsForSlides = {
    initialSlide: 0,
    slidesPerView: 1.5,
    spaceBetween: 20,
  };

  options = {
    slidesPerView: 4,
    spaceBetween: 10,
    slidesOffsetBefore: 0,
  };

  constructor(
    public location: Location,
    public router: Router,
    public http: HttpClient,
    public center: CenterService,
    public news: NewsService
  ) {
    this.fetchEvents('forall');
    this.fetchWorkshops();
  }

  ngOnInit() {
    this.formdata = {
      village: this.center.location.village_id,
      mandal: this.center.location.mandal_id,
      district: this.center.location.district_id,
      state: this.center.location.state_id,
      last_id: '',
    };

    this.add_more_all_posts()
  }

  back() {
    this.location.back();
  }

  redirectToEventPage() {
    this.router.navigateByUrl('national-fests/event-page', {
      replaceUrl: true,
    });
  }

  redirectToWorkshopPage(sno:string){
    this.router.navigate(['national-fests/view-workshop-page',{sno}]);
  }

  // EVENTS
  async fetchEvents(dept: string) {
    this.http
      .get(`https://teckzite.org/restful_apis/events.php?dept=${dept}`)
      .subscribe(
        (resp) => {
          this.EventsList = resp['events'] ? resp['events'] : [];
          console.log('teck', resp['events']);
        },
        (err) => {
          console.log(err);
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
}
