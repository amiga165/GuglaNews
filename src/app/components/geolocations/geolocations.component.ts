import { Component, OnInit,Input } from '@angular/core';
import { APIService } from "../../providers/api/api.service";
import { AlertController, NavParams, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-geolocations',
  templateUrl: './geolocations.component.html',
  styleUrls: ['./geolocations.component.scss'],
})
export class GeolocationsComponent implements OnInit {
@Input() pincode:any;
@Input() village:any;
@Input() address:any;
villages_gps:any=[];
  constructor(public api: APIService,public modalCtrl: ModalController) {
   }

  ngOnInit() {
    this.pincode=this.pincode;
      this.village=this.village;
          this.address=this.address;
          this.getGpsVillages();
  }

   getGpsVillages() {

      this.api
        .postReq('/common/location/select_using_gps', {
          pincode: this.pincode,
          village: this.village,
          address: this.address,
        })
        .then((res: any) => {
          if (res.data) {
            this.villages_gps = res.data;
           // this.villages_search = [];
            //console.log('vv'+this.villages);
            // this.area.district.data = res.data;
            //      console.log("This is the data of Districts"+res.data);
          } else {
           // //this.commin.toastMsg('Something error occured');
          }
        })
        .catch((err) => {
         // //this.commin.toastMsg(err.message);
        })
        .then(() => {
          // Finally block
         // this.commin.stopLoader();
        });
    }

    dismissModal(){
      this.modalCtrl.dismiss({});
    }
    continue(id)
    {
    this.modalCtrl.dismiss({ status: 'success', village_id: id });
    }
}
