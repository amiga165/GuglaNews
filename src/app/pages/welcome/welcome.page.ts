import { Component, OnInit } from '@angular/core';

import { CommonService } from '../../providers/common/common.service';
import { APIService } from '../../providers/api/api.service';
import { UserService } from 'src/app/providers/user/user.service';
import { CenterService } from '../../providers/center/center.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

import { ModalController } from '@ionic/angular';
import { EventsService } from 'src/app/providers/events/events.service';
import { GeolocationsComponent } from 'src/app/components/geolocations/geolocations.component';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {
  stateSelected = true;
  area = {
    state: {
      selected: '',
      data: [],
    },
    district: {
      selected: '',
      data: [],
    },
    mandal: {
      selected: '',
      data: [],
    },
    village: {
      selected: '',
      data: [],
    },
  };

  public term = '';
  list = [
    { address: 'vizag', pin: 524006 },
    { address: 'krishna', pin: 524005 },
    { address: 'nellore', pin: 524004 },
  ];
  villages_search: any;
  villages_gps: any;
  villages_recent: any;
  constructor(
    // public navCtrl: NavController,
    public commin: CommonService,
    public api: APIService,
    public user: UserService,
    public center: CenterService,
    public location: Location,
    public router: Router,
    public modalCtrl: ModalController,
    public events:EventsService,
  ) {
   // this.get_location();
    this.getRecentVillages();
    //  this.user.getGeolocation();
  }

  ngOnInit() {
    this.getStates();
    console.log(this.center.isOkay());
    console.log(this.area.state.selected);
  }

  async presentModal(pincode,village,address,lat,lon) {
    const modal = await this.modalCtrl.create({
      component: GeolocationsComponent,
      //breakpoints: [0, 0.4, 1],
      //initialBreakpoint: 0.4,
      cssClass: 'showDetails-modal',
      componentProps: {'pincode':pincode,'village':village,'address':address,'lat':lat,'lon':lon }
    });
    modal.onDidDismiss().then((data: any) => {
//      alert(JSON.stringify(data));
      this.select_location(data.data.village_id);
    });
    await modal.present();
  }

  getLocations(event) {
    let search = event.target.value;
    if (search.length >= 3) {
      //alert(search.length);
      this.api
        .postReq('/common/search', { key: search,type:'news' })
        .then((res: any) => {
          if (res.data) {
            this.villages_search = res.data;
            this.villages_gps = [];
            //console.log('vill'+this.villages);
            // this.area.district.data = res.data;
            //      console.log("This is the data of Districts"+res.data);
          } else {
            //this.commin.toastMsg('Something error occured');
          }
        })
        .catch((err) => {
         // //this.commin.toastMsg(err.message);
        })
        .then(() => {
          // Finally block
          this.commin.stopLoader();
        });
      // if (search && search.trim() != '') {

      //   this.productProvider.getProduct(search).subscribe((products) => {
      //     console.dir(products);
      //   }, (err) => {
      //      console.log(err);
      //   });
    } else {
      this.villages_search = [];
    }
  }

  getGpsVillages() {
     
    //console.log('hi'+this.user.latitude);
    //  let search = event.target.value;
  //  this.user.gps_pincode='521201';
    // this.commin.startLoader();

    if (this.user.gps_pincode) {
      this.presentModal(this.user.gps_pincode,this.user.gps_village,this.user.gps_address,this.user.latitude,this.user.longitude);
      // this.api
      //   .postReq('/common/location/select_using_gps', {
      //     pincode: this.user.gps_pincode,
      //     village: this.user.gps_village,
      //     address: this.user.gps_address,
      //   })
      //   .then((res: any) => {
      //     if (res.data) {
      //       this.villages_gps = res.data;
      //       this.villages_search = [];
      //       //console.log('vv'+this.villages);
      //       // this.area.district.data = res.data;
      //       //      console.log("This is the data of Districts"+res.data);
      //     } else {
      //       //this.commin.toastMsg('Something error occured');
      //     }
      //   })
      //   .catch((err) => {
      //     //this.commin.toastMsg(err.message);
      //   })
      //   .then(() => {
      //     // Finally block
      //     this.commin.stopLoader();
      //   });
    }
    else
    {
      this.user.getGeolocation();
    }
  }

  getRecentVillages() {
    this.api
      .getReq('/user-locations')
      .then((res: any) => {
        if (res.data) {
          this.villages_recent = res.data;
          //this.villages_search=[];
          //console.log('vv'+this.villages);
          // this.area.district.data = res.data;
          //   for (let i = 0; i < 7; i++) {
          //     console.log(
          //       'This is the data of Districts' +
          //         JSON.stringify(res.data[i].village)
          //     );
          //   }
        } else {
          //this.commin.toastMsg('Something error occured');
        }
      })
      .catch((err) => {
       // //this.commin.toastMsg(err.message);
      })
      .then(() => {
        // Finally block
        this.commin.stopLoader();
      });
  }

  getStates() {
    this.api
      .postReq('/common/states', {})
      .then((res: any) => {
        if (res.data) {
          this.area.state.data = res.data;
          console.log('This is the data of states' + res.data);
        } else {
          //this.commin.toastMsg('Something error occured');
        }
      })
      .catch((err) => {
        console.log('welcomeee');
        //this.commin.toastMsg('welcome' + err.message);
      });
  }

  getDistricts() {
    var state_id = this.area.state.selected;
    this.commin.startLoader();
    this.api
      .postReq('/common/districts', { state_id: state_id })
      .then((res: any) => {
        if (res.data) {
          this.area.district.data = res.data;
          console.log('This is the data of Districts' + res.data);
        } else {
          //this.commin.toastMsg('Something error occured');
        }
      })
      .catch((err) => {
        //this.commin.toastMsg(err.message);
      })
      .then(() => {
        // Finally block
        this.commin.stopLoader();
      });
  }

  getMandals() {
    if (!this.area.district.selected) return null;
    this.area.mandal = { selected: '', data: [] };
    this.area.village = { selected: '', data: [] };
    var dist_id = this.area.district.selected;
    this.commin.startLoader();
    this.api
      .postReq('/common/mandals', { district_id: dist_id })
      .then((res: any) => {
        if (res.data) {
          this.area.mandal.data = res.data;
          console.log('This is the data of mandals ' + res.data);
        } else {
          //this.commin.toastMsg('Something error occured');
        }
      })
      .catch((err) => {
        //this.commin.toastMsg(err.message);
      })
      .then(() => {
        // Finally block
        this.commin.stopLoader();
      });
  }
  getVillages() {
    if (!this.area.mandal.selected) return null;
    this.area.village = { selected: '', data: [] };
    var mandal_id = this.area.mandal.selected;
    this.commin.startLoader();
    this.api
      .postReq('/common/villages', { mandal_id: mandal_id })
      .then((res: any) => {
        if (res.data) {
          this.area.village.data = res.data;
        } else {
          //this.commin.toastMsg('Something error occured');
        }
      })
      .catch((err) => {
        //this.commin.toastMsg(err.message);
      })
      .then(() => {
        // Finally block
        this.commin.stopLoader();
      });
  }
  removefav(id)
  {
    this.api
      .patchReq('/user-locations/delete', {village_id:id})
      .then((res: any) => {
        if (res.data) {
         // this.area.state.data = res.data;
       //  alert('raj');
         // //this.commin.toastMsg('Success');
           this.getRecentVillages();
        //  console.log('This is the data of states' + res.data);
        } else {
          //this.commin.toastMsg('Something error occured');
        }
      })
      .catch((err) => {
        console.log('welcomeee');
        //this.commin.toastMsg('welcome' + err.message);
      });
  }
  select_location(id) {
    var vill_id = id;
    this.api
      .postReq('/common/location/select', { village_id: vill_id,type:'news' })
      .then((res: any) => {
        if (res.status == 'success' && res.token) {
          this.user.setToken(res.token);
          this.center.setLocation(res.data);
          console.log('Address change success', res.data, res.token);
          //this.user.setToken(res.token);
          this.center.initCenter();
          this.user.getUserDetails();
          this.api
              .postReq('/center', {})
              .then((res: any) => {
                if (res.status == 'success') {
                  this.center.setCenterData(res.data);
                  console.log('center', res.data);

                  this.api
          .postReq('/user/authorize/news_user', res.token)
          .then((data: any) => {
            this.user.setnewsToken(data.token);
         
            //let LandPage = localStorage.getItem('landingpage');
            this.events.publishSomeData(true);
                 
            //this.router.navigateByUrl('news', { replaceUrl: true });
            console.log('This is the news Token2', this.center.data.guest,this.center.data);
            return this.center.data.guest;
          
       
          }).then((res:any)=>{

            console.log('This is the news Tokenś33', this.center.data.guest,this.center.data,res);
            let LandPage = localStorage.getItem('landingpage');
            if(this.center.data.guest===false && LandPage==='ShopHome')
            {
              this.router.navigateByUrl('news', {replaceUrl: true}).then(() => {
                // this.router.navigateByUrl('news', { replaceUrl: true });
                this.router.navigateByUrl('news', { replaceUrl: true });
                });
                console.log('welcomeee');
              // this.router.navigateByUrl('app/home/shopping', { replaceUrl: true });
            }
            else if(this.center.data.guest===false)
            {
              this.router.navigateByUrl('news', { replaceUrl: true });
              // this.router.navigateByUrl('app/home/shopping', { replaceUrl: true });
            }
            else if(this.center.data.guest===true)
            {
              this.router.navigateByUrl('news', { replaceUrl: true });
            }
            else{
              this.router.navigateByUrl('news', { replaceUrl: true });
            }
          })
          .catch((err: any) => {
           // //this.commin.toastMsg(err.message);
            console.log('This is the news Token', err.message);
          });

                } else {
                  this.commin.toastMsg('Something error occured');
                }
              })
              .catch((err) => {
               // this.commin.toastMsg(err.message);
              });



        } else {
          this.center.initCenter();
          console.log('Address change error');
          //this.commin.toastMsg('Something error occured !');
        }
        console.log('hihi'+res.token);
        
      })
      .catch((err) => {
        console.log(err);
        //this.commin.toastMsg(err.message);
      });
  }
  select_state(ind) {
    if (!this.area.state.data[ind]) return null;
    this.area.state.selected = this.area.state.data[ind]._id;
    this.getDistricts();
  }
  back() {
    // this.navCtrl.setRoot(HomePage);
    this.location.back();
  }

  get_location() {
    //  this.user.fetchGPSLocation();
  //  this.user.getGeolocation();
   // this.getGpsVillages();
  }

  // console.log(this.)
}