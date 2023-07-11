import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-event-page',
  templateUrl: './view-event-page.page.html',
  styleUrls: ['./view-event-page.page.scss'],
})
export class ViewEventPagePage implements OnInit {
  Event:any = {};

  constructor(
    public activateroute: ActivatedRoute,
    public http: HttpClient,
    public location: Location
  ) {
    this.activateroute.params.subscribe((data: any) => {
      console.log('teck', data);
      this.fetchSingleEvent(data.dept, data.sno);
    });
  }

  ngOnInit() {}

  async fetchSingleEvent(dept: string, sno: string) {
    this.http
      .get(
        `https://teckzite.org/restful_apis/events.php?dept=${dept}&sno=${sno}`
      )
      .subscribe(
        (resp) => {
          this.Event = resp['events'] ? resp['events'][0] : {};
          console.log('teckSingle', this.Event);
        },
        (err) => {
          console.log(err);
        }
      );
  }

  back() {
    this.location.back();
  }
}
