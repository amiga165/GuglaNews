import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-workshop-page',
  templateUrl: './view-workshop-page.page.html',
  styleUrls: ['./view-workshop-page.page.scss'],
})
export class ViewWorkshopPagePage implements OnInit {

  Workshop:any = {};

  constructor(
    public activateroute: ActivatedRoute,
    public http: HttpClient,
    public location: Location
  ) { 
    this.activateroute.params.subscribe((data: any) => {
      console.log('teck', data);
      this.fetchSingleWorkshop(data.sno);
    });
  }

  ngOnInit() {
  }

  async fetchSingleWorkshop(sno: string) {
    this.http
      .get(
        `https://teckzite.org/restful_apis/workshops.php?sno=${sno}`
      )
      .subscribe(
        (resp) => {
          this.Workshop = resp['workshops'] ? resp['workshops'][0] : {};
          console.log('teckSingle', this.Workshop);
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
