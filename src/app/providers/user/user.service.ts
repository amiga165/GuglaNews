import { Injectable } from '@angular/core';
import { EncryptorService } from '../encryptor/encryptor.service';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
 import { Geolocation } from '@ionic-native/geolocation/ngx';
// import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';
import { APIService } from '../api/api.service';
import { CommonService } from '../common/common.service';
import { NativeGeocoder, NativeGeocoderOptions, NativeGeocoderResult } from '@ionic-native/native-geocoder/ngx';
import { Platform } from '@ionic/angular';
import {EventsService} from '../events/events.service';
import jwt_decode from "jwt-decode";
import { AppVersion } from '@ionic-native/app-version/ngx';
declare var google;

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public userData: any;
  public data = { default_address: '', init_lock: true };
  public wishlist: any;
  public cart: any;
  public roles: any = { list: [] };
  public addresses: Array<any> = [];
  public cartItems: Array<any> = [];
  public location: any = undefined;
  public lat1 =1;
  public lon1 =2;
  public categories:any=[];

  public gps_address:any;
  public gps_pincode:any;
  public gps_village:any;
  public isHome:boolean=false;

  pageData: any = {
    item_loader: true,
    // cat_loader: true,
    // last_amount: 0,
    // loadlock: false,
  };

  userLocation;
  userCity: string='not valid';
  userCity1: string='not validd';
  app_version_id:any='';

  lat;
  lng;
  zone;
  latLngResult;
  userLocationFromLatLng;

  // Readable Address
  address: string='1';

  // Location coordinates
  latitude: number=2;
  longitude: number=3;
  accuracy: number=4;
  address1:any;
  tabopen:boolean=true;
  jwtdata:any;
  //Geocoder configuration
  geoencoderOptions: NativeGeocoderOptions = {
    useLocale: true,
    maxResults: 5
  };
   app_info:any='';
   roleslist:any=[];

  constructor(
    public storage: EncryptorService,
    public api: APIService,
    // public Share: Share,
    public socialSharing: SocialSharing,
    public commin: CommonService,
    public geolocation: Geolocation,
    public nativeGeocoder: NativeGeocoder,
    public platform: Platform,
    public events:EventsService,
    public appVersion: AppVersion
  ) {
    
    const roles1 = localStorage.getItem('roles');
    this.roleslist=roles1?roles1:[];
    this.refershUserAddresses();
    this.refershRoles();
    this.refreshWishList();
    this.refreshUserCart();
    this.getCartItems();
    this.getCartCategories();
    //    this.getjwtdata();
//    this.userData.details='';
    console.log('user data' + this.userData);
    this.initUser(false);
  this.platform.ready().then(() => {

    if (this.isOkay()) {
      this.appVersion
        .getVersionNumber()
        .then((app_version) => {
          this.app_version_id=app_version;
        })
        .catch((err) => {
//          this.getUserData('');
        });
    }

  //  this.getUserData();


    this.getGeolocation();
     setTimeout(function(){      
          this.getGeoencoder(this.latitude, this.longitude);
      }, 3000);
    });
  //   this.events.subscribe('tab:opened', (data: any) => {
  //     this.tabopen=true;
  //     console.log('ddaaa'+data)
  // });
  this.events.getObservable().subscribe((data) => {
    console.log("Data received:", data);
  //  alert(data);
  })
  }
  initUser(lock) {
    if (lock && this.data.init_lock) {
      this.data.init_lock = false;
      return false;
    }
    this.userData = this.storage.getObject('userData');
    console.log('UserData : ', this.userData);
    this.wishlist = new Set();
    this.cart = { count: 0, list: new Set([]), items: [] };
    this.api
      .postReq('/user/status', {})
      .then((res: any) => {
        this.fetchData();
      })
      .catch((err) => {
        console.log('Login expired');
      });
  }

  fetchData() {
    if (!this.isSignedIn()) return false;
    this.getUserDetails();
    if (!this.isOkay()) return false;
    // this.refershUserAddresses();
    // this.refershRoles();
    // this.refreshWishList();
    // this.refreshUserCart();
   // this.fetchGPSLocation();

    return true;
  }

  printData(){
    console.log("This is userdata ", this.userData);
  }
  getnewsuserid()
  {
    const token = this.storage.getItem("news-token");
    this.jwtdata=jwt_decode(token);
    return this.jwtdata.news_user_data.id;   
  }
fetchGPSLocation()
{

}
  refershRoles() {
    this.api
      .postReq('/user/roles', {})
      .then((res: any) => {
        this.roles = res.data;
        console.log('roles are: ', this.roles);

        localStorage.setItem('roles', JSON.stringify(this.roles));
        var roles:any = localStorage.getItem('roles');
        this.roleslist=roles?roles:[];

      })
      .catch((err) => {
        console.error('Error: while getting wishlist');
      });
  }

  checkRole(role) {
    return this.roles.list.includes(role);
  }

  refreshWishList() {
    this.api
      .postReq('/user/wishlist', {})
      .then((res: any) => {
        this.wishlist = new Set(res.data);
        // console.log("User provider lo wishu"+this.wishlist);
      })
      .catch((err) => {
        console.error('Error: while getting wishlist');
      });
  }

  checkWishList(id) {
    return this.wishlist.has(id);
  }

  addWishList(id) {
    this.wishlist.add(id);
  }

  delWishList(id) {
    this.wishlist.delete(id);
  }

  refreshUserCart() {
    this.api
      .postReq('/user/cart', {})
      .then((res: any) => {
        this.cart.items = res.data;
        this.setCartList();
      })
      .catch((err) => {
        console.error('Error: while getting wishlist');
      });
  }
  getCartItems() {
    this.pageData.item_loader = true;
    this.api
      .postReq('/user/cart/list', {})
      .then((res: any) => {
        this.cartItems = res.data;
        console.log(this.cartItems);
        if (this.cartItems.length !== this.cart.count)
          this.refreshUserCart();
      })
      .catch((err) => {
      //  this.commin.toastMsg(err.message);
      })
      .then(() => {
        this.pageData.item_loader = false;
      });
  }

  getCartCategories() {
    this.api
      .postReq('/user/cart/categories', {})
      .then((res: any) => {
        this.categories = res.data;
        // console.log('cats', this.categories);
      })
      .catch((err) => {
      //  this.commin.toastMsg(err.message);
      })
      .then(() => {
        // this.pageData.cat_loader = false;
      });
  }

  clearCart() {
    return this.api
      .deleteReq('/user/cart')
      .then((res: any) => {
        this.cart = { count: 0, list: new Set([]), items: [] };
      })
      .catch((err) => {
        console.error('Error: while getting wishlist');
      });
  }

  deleteCartCategory(cat_id) {
    return this.api
      .postReq('/user/cart/delete/category', { category_id: cat_id })
      .then((res: any) => {
        this.refreshUserCart();
        return true;
      })
      .catch((err) => {
        //this.commin.toastMsg('Something error occured!');
        return false;
      });
  }

  setCartItems() {
    this.cart.items = this.cart.items.filter((x) =>
      this.checkUserCart(x.quantity)
    );
    this.setCartList();
  }

  setCartList() {
    this.cart.list = new Set(this.cart.items.map((x) => x.quantity));
    this.cart.count = this.cart.list.size;
    this.getCartItems();
  }

  checkUserCart(id) {
    return this.cart.list.has(id);
  }

  getCartItem(id) {
    return this.cart.items.filter((x) => x.quantity === id)[0];
  }

  addUserCart(id) {
    this.cart.list.add(id);
  }

  delUserCart(id) {
    this.cart.list.delete(id);

  }

  incUserCart(id) {
    this.cart.items.filter((x) => x.quantity === id)[0].count += 1;
  }

  decUserCart(id) {
    this.cart.items.filter((x) => x.quantity === id)[0].count -= 1;
  }

  updUserCart(id, cnt) {
    this.cart.items.filter((x) => x.quantity === id)[0].count = cnt;
  }

  refershUserAddresses() {
    this.api
      .postReq('/user/address', {})
      .then((res: any) => {
        if (res.status == 'success') {
          this.addresses = res.data.addresses;
          this.data.default_address = res.data.default;
          // console.log(this.addresses);
        } else {
          //this.commin.toastMsg('Something error occured');
        }
      })
      .catch((err) => {
        //this.commin.toastMsg(err.message);
      });
  }

  addAddress(data) {
    this.addresses.push(data);
    if (!this.data.default_address) this.setDefaultAddress(data);
    // console.log(this.data);
  }

  delAddress(address_id) {
    this.addresses = this.addresses.filter((x) => x._id !== address_id);
    if (!this.getDeafultAddress()._id) this.data.default_address = '';
    console.log(this.data);
  }

  updAddress(data) {
    this.addresses = this.addresses.map((x) => {
      if (data._id === x._id) return data;
      else return x;
    });
  }

  setDefaultAddress(address) {
    if (!this.checkAddress(address._id)) return false;
    this.data.default_address = address._id;
  }

  getDeafultAddress() {
    return this.checkAddress(this.data.default_address) || {};
  }

  checkDefaultAddr(address) {
    return this.data.default_address === address._id;
  }

  checkAddress(id) {
    return this.addresses.filter((x) => x._id === id)[0];
  }

  save() {
    this.storage.setObject('userData', this.userData);
  }

  reset() {
    this.userData = {};
    this.save();
    console.log('User data in reset', this.userData);
  }

  signup(mobile) {
    this.userData.mobile = mobile;
    this.userData.isSignedUp = true;
    this.save();
  }
  login() {
    this.userData.isSignedIn = true;
    this.save();
  }


  logout(status) {
    return this.api
      .postReq('/user/logout', {deactivate:status,type:'news'})
      .then((res: any) => {
        if (res.status == 'success' && res.token) {
          this.setToken(res.token);
        } else {
          //this.commin.toastMsg('Something error occured !');
        }
      })
      .catch((err) => {
        //this.commin.toastMsg(err.message);
      })
      .then(() => {
        this.reset();
      });
  }

  storeData(data) {
    this.userData.refferal_code = data.referral_code;
    this.userData.name = data.name;
    this.save();
  }

  setToken(token) {
    this.storage.setItem('api-token', token);
  }

  setnewsToken(token) {
		this.storage.setItem('news-token', token);
	}

  isSignedUp() {
    return this.userData.isSignedUp;
  }
  isGuestUser()
  {
    try{
        return  this.userData.details.guest_user; 
 
    }
    catch(e)
    {
      return '';
    }
   }
  guest_mobile_num()
  {
    try{
        return  this.userData.details.mobile_num;
    }
    catch(e)
    {
      return '';
    }
 
  }
  isSignedIn() {
    return this.userData.isSignedIn;
  }

  isOkay() {
    // console.log(this.userData.isSignedUp && this.userData.isSignedIn)
    return this.userData.isSignedUp && this.userData.isSignedIn;
  }

  setOneSignalID(id) {
    this.storage.setItem('one-signal-id', id);
  }

  getOneSignalID() {
    return this.storage.getItem('one-signal-id') || '';
  }



  setFcmID(id) {
    this.storage.setItem('fcm-id', id);
  }

  getFcmID() {
    return this.storage.getItem('fcm-id') || '';
  }


  


  getUserData() {
  let onesignal_id=this.getOneSignalID();
  let app_version=this.app_version_id;
  let fcm_id=this.getFcmID();
    this.api
      .postReq('/user/check', {
        app_version,
        platform_type:this.platform.platforms(),onesignal_id,
        fcm_news_token:fcm_id,
        type:'news'
      })
      .then((res: any) => {
        this.app_info = res.data;
       // console.log('app info dataaaaa'+ JSON.stringify(this.app_info));

      })
      .catch((err) => {
      
        if (err.code === 403) {
      
        }
      });
  }

  shareApp() {
    var shareMsg = {
      subject: "Gugla News Short News APP",
      message:
        "Get all updates and Enjoy" +
        this.userData.refferal_code +
        "\nUse this code while registering the Gugla App.",
      file: null,
      link: "https://play.google.com/store/apps/details?id=com.guglanews.android",
    };
    this.socialSharing
      .share(shareMsg.message, shareMsg.subject, shareMsg.file, shareMsg.link)
      .then(() => {})
      .catch(() => {});
  }

  getUserDetails()
  {
    return this.api
      .postReq('/user', {"onsignal_id":this.getOneSignalID()})
      .then((res: any) => {
        if (res.status == 'success') {
          this.userData.details = res.data;
          this.save();
        } else {
          console.error('Error : while fetching location');
        }
      })
      .catch((err) => {
        console.error('Error : while fetching location');
      });
  }

  updateUserDetails(data) {
    return this.api
      .patchReq('/user', data)
      .then((res: any) => {
        if (res.status == 'success') {
          this.userData.details.name = res.data.name;
          this.userData.details.email = res.data.email;
          this.save();
        } else {
          console.error('Error : while fetching location');
        }
      })
      .catch((err) => {
        console.error('Error : while fetching location');
      });
  }
  update_password(data) {
    alert('ok');
    data.type='news';
    return this.api
      .patchReq('/user/update_password', data)
      .then((res: any) => {
        if (res.status == 'success') {
          //
        } else {
          console.error('Error : while fetching location');
        }
      })
      .catch((err) => {
        console.error('Error : while fetching location');
      });
  }

  setLanguageData(lang, data) {
    this.userData.language = lang;
    this.save();
    this.storage.setObject('langData', data);
    this.commin.loadLanguage();
  }



  // fetchGPSLocation() {
  //   console.log("This is location 1",this.location);
    // this.geoLocation
    // .getCurrentPosition()
    // .then(resp => {
    //         console.log("This is location 2",resp);

    //   if (resp.coords.latitude && resp.coords.longitude)
    //     this.location = { lat: resp.coords.latitude, lon: resp.coords.longitude };
    // })
    // .catch(_ => {
    //   return undefined;
    // });

  //   this.geoLocation.getCurrentPosition().then((resp) => {

  //     this.location = resp;
  //     console.log(resp);
  //     this.getGeoencoder(resp.coords.latitude, resp.coords.longitude);
  //     console.log(this.address);
  //     this.lat1 = resp.coords.latitude;
  //     this.lon1 = resp.coords.longitude;

  // },(err)=>{
  //     console.log("error : " + err.message);
  // });




    // this.geoLocation.getCurrentPosition().then((resp) => {
    //   console.log("This is location 3",resp);

    //   // resp.coords.latitude
    //   // resp.coords.longitude
    //  }).catch((error) => {
    //    console.log('Error getting location', error);
    //  });
     
    //  let watch = this.geoLocation.watchPosition();
    //  watch.subscribe((data) => {
    //   console.log("This is location 4",data);

      // data can be a set of coordinates, or an error (if an error occurred).
      // data.coords.latitude
      // data.coords.longitude
    //  });
  //}

    //geocoder method to fetch address from coordinates passed as arguments
    // getGeoencoder(latitude, longitude) {
    //   // this.nativeGeocoder.reverseGeocode(latitude, longitude, this.geoencoderOptions)
    //   //   .then((result: NativeGeocoderResult[]) => {
    //   //     this.address = this.generateAddress(result[0]);
    //   //   })
    //   //   .catch((error: any) => {
    //   //     alert('Error getting location' + JSON.stringify(error));
    //   //   });

    //     this.reverseGeocode(latitude, longitude);

    // }
  
    // //Return Comma saperated address
    // generateAddress(addressObj) {
    //   let obj = [];
    //   let address = "";
    //   for (let key in addressObj) {
    //     obj.push(addressObj[key]);
    //   }
    //   obj.reverse();
    //   for (let val in obj) {
    //     if (obj[val].length)
    //       address += obj[val] + ', ';
    //   }
    //   return address.slice(0, -2);
    // }


    // reverseGeocode(lat, lng) {
    //   if (this.platform.is('cordova')) {
    //   let options: NativeGeocoderOptions = {
    //   useLocale: true,
    //   maxResults: 5
    //   };
    //   this.nativeGeocoder.reverseGeocode(lat, lng, options)
    //   .then((result: NativeGeocoderResult[]) => this.userLocationFromLatLng = result[0])
    //   .catch((error: any) => console.log(error));
    //   } else {
    //   this.getGeoLocation(lat, lng);
    //   }
    //   }
    //   async getGeoLocation(lat: number, lng: number) {
    //   if (navigator.geolocation) {
    //   let geocoder = await new google.maps.Geocoder();
    //   let latlng = await new google.maps.LatLng(lat, lng);
    //   let request = { latLng: latlng };
    //   await geocoder.geocode(request, (results, status) => {
    //   if (status == google.maps.GeocoderStatus.OK) {
    //   let result = results[0];
    //   this.zone.run(() => {
    //   if (result != null) {
    //   this.userCity = result.formatted_address;
      
    //   this.latLngResult = result.formatted_address;
    //   console.log(result);
    //   this.userCity1=result;
      
    //   }
    //   })
    //   }
    //   });
    //   }
    //   }

  //geocoder method to fetch address from coordinates passed as arguments
  getGeoencoder(latitude, longitude) {
    this.nativeGeocoder.reverseGeocode(latitude, longitude, this.geoencoderOptions)
      .then((result: NativeGeocoderResult[]) => {
        this.address = this.generateAddress(result[0]);
        this.gps_pincode=result[0].postalCode;
        this.gps_village=result[0].locality;
        this.gps_address=result[0];
      })
      .catch((error: any) => {
      //  alert('Error getting location' + JSON.stringify(error));
      });
  }



    //Get current coordinates of device
  getGeolocation() {
    this.geolocation.getCurrentPosition().then((resp) => {

      this.latitude = resp.coords.latitude;
      this.longitude = resp.coords.longitude;
      this.location = { lat: resp.coords.latitude, lon: resp.coords.longitude };
      this.accuracy = resp.coords.accuracy;
    }).catch((error) => {
     // alert('Error getting location' + JSON.stringify(error));
    }).then(()=>
    {
      this.getGeoencoder(this.latitude, this.longitude);
    })
  }


  //Return Comma saperated address
  generateAddress(addressObj) {
this.address1=JSON.stringify(addressObj);
    let obj = [];
    let address = "";
    for (let key in addressObj) {
      obj.push(addressObj[key]);
    }
    obj.reverse();
    for (let val in obj) {
      if (obj[val].length)
        address += obj[val] + ', ';
    }
    return address.slice(0, -2);
  }
  
}
