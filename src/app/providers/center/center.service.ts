import { Injectable } from '@angular/core';

import { EncryptorService } from '../encryptor/encryptor.service';
import { APIService } from "../api/api.service";
import { CommonService} from "../common/common.service";

@Injectable({
  providedIn: 'root'
})
export class CenterService {
  location: any = {};
	data: any = {};
	village_minimum_order:any;
	public deliveryTimings: Array<{ timing: string; timestamp: number }> = [];
	public deliveryDates: Array<{ timing: string; timestamp: number }> = [];


  constructor(public storage: EncryptorService,
		public api: APIService,
		public commin: CommonService,) {
      this.initCenter();
      console.log("Center Data: ", this.data);
     }

     initCenter() {
      this.data = this.storage.getObject("centerData");
      this.location = this.storage.getObject("centerLocation");
      this.api
        .postReq("/center/status", {})
        .then((res: any) => {
          this.fetchData();
        })
        .catch(err => {
          this.fetchData();
          // this.location = {};
          // this.data = {};
           // this.save();  
            console.log('yes1'); 
            console.log('yes data'+JSON.stringify(this.data));       
        });
    }

    fetchData() {
      this.getDeliveryTimings();
      this.getLocation();
    }

    isOkay() {
      return !!this.location.village && !!this.location.mandal && !!this.location.district;
    }
    save() {
      
        this.storage.setObject("centerData", this.data);
        
      if(Object.keys(this.location).length === 0 && this.location.constructor === Object)
      {

      }
      else
      {
        this.storage.setObject("centerLocation", this.location);        
      }

    }
  getLocation() {
      this.api
        .postReq("/center/location", {})
        .then((res: any) => {
          this.location = res.data;
          console.log(this.location);
            this.save();
        })
        .catch(err => {
          //this.location = {};
           console.log('yes3');
        })
        .then(() => {

        });
    }
  
    setLocation(data) {
      this.location = data;
      this.save();
    }
  
    getDeliveryTimings() {
      this.api
        .postReq("/center/timings/order", {})
        .then((res: any) => {
          this.deliveryTimings = res.data;
        })
        .catch(err => console.log(err));
      this.api
        .postReq("/center/timings/local-products", {})
        .then((res: any) => {
          this.deliveryDates = res.data;
        })
        .catch(err => console.log(err));
    }
  
    setCenterData(data) {
      this.data = data;
      this.save();
    }
  
}
