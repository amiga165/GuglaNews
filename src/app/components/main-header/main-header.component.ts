import { Component, OnInit } from '@angular/core';
import {
  Platform,
  NavController,
  NavParams,
  AlertController,
  ModalController,
} from '@ionic/angular';
import { Network } from '@ionic-native/network/ngx';
// import { Content } from "ionic-angular";
import { Router } from '@angular/router';
import { APIService } from '../../providers/api/api.service';
import { CommonService } from '../../providers/common/common.service';
import { CenterService } from '../../providers/center/center.service';
import { AppVersion } from '@ionic-native/app-version/ngx';
import { UserService } from '../../providers/user/user.service';
import { MenuController } from '@ionic/angular';
@Component({
  selector: 'app-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.scss'],
})
export class MainHeaderComponent implements OnInit {
  pageData = { loadAnim: 'bottom', netswap: '', netmsg: '' };
  selectedTab: number = 1;
  shareMsg = {
    subject: 'MeeBuddy App Link',
    message:
      'Download and Enjoy your Day with MeeBuddy App. My Referral Code is: ' +
      this.user.userData.refferal_code +
      ', Use this code while registering on MeeBuddy App',
    file: null,
    link: 'https://play.google.com/store/apps/details?id=com.meebuddy.android',
  };
  loader = {
    sliders: true,
    dashboards: true,
    categories: true,
  };
  centerData: any = { image_sliders: [] };
  user_roles: any = {};
  app_info: any = { url: '', update: false, status: true, message: '' };
  watch_location: any = { status: false };
  platform_type: any;

  constructor(
    public navCtrl: NavController,
    public commin: CommonService,
    public alertController: AlertController,
    public modalCtrl: ModalController,
    public navParams: NavParams,
    public center: CenterService,
    public user: UserService,
    public api: APIService,
    public network: Network,
    public platform: Platform,
    public appVersion: AppVersion,
    public router: Router,
    public menu: MenuController,
  ) // public events: Events
  {
    //localStorage.setItem('landingpage', 'HomePage');
    if (this.navParams.get('redirect') === 'cart')
      // this.navCtrl.push(CheckoutPage);

      this.platform.ready().then(() => {
        this.platform_type = this.platform.platforms();
        console.log('platform', this.platform_type);
      });

    // events.subscribe('user:created', (time) => {
    // 	this.initHomePage();
    // });

    // if (!user.isOkay()) this.navCtrl.setRoot(SignupPage);
    // if (!center.isOkay()) this.navCtrl.setRoot(WelcomePage);
    this.selectedTab = this.navParams.get('view') || 1;
    this.initHomePage();

    if (user.isOkay()) {
      this.appVersion
        .getVersionNumber()
        .then((app_version) => {
          this.getUserData(app_version);
        })
        .catch((err) => {
          this.getUserData('');
        });
    }
  }
  openmenu()
  {

    this.menu.enable(true, 'shopping');
    this.menu.open('shopping');
    this.menu.enable(false, 'newsMenu');
  }
  getUserData(app_version) {
    let onesignal_id=this.user.getOneSignalID();
    let fcm_id=this.user.getFcmID();
    this.api
      .postReq('/user/check', {
        app_version,
        platform_type: this.platform_type,onesignal_id,
        fcm_news_token:fcm_id,
        type:'news'
      })
      .then((res: any) => {
        this.app_info = res.data;

        this.initHomePage();
        console.log(this.app_info);
      })
      .catch((err) => {
        //this.commin.toastMsg(err.message);
        if (err.code === 403) {
          this.user.logout(false).then(() => {
            // this.navCtrl.setRoot(SignupPage);
          });
        }
      });
  }

  initHomePage() {
     this.getCenterData();
    // this.user.initUser(true);
    // this.setupNetworkToasts();
  }

  changeTab(ind) {
    this.pageData.loadAnim = 'bottom';
    this.selectedTab = ind;
  }


  searchPage() {
    this.router.navigate(['users/search']);
  }

  share() {
    this.user.shareApp();
  }

  doRefresh() {
    // this.navCtrl.setRoot(HomePage);
    this.router.navigateByUrl('news', { replaceUrl: true });
  }

  cartPage() {
    // if (!this.user.isOkay())
    // {
    // let profileModal = this.modalCtrl.create(SignupPage, {page_type: 'CheckoutPage',id:''});
    // profileModal.present();
    // }
    // else
    // {

    // this.navCtrl.push(CheckoutPage);
    this.router.navigate(['users/cart']);
    // }
  }

  favItems() {
    // if (!this.user.isOkay())
    // {
    //     // let profileModal = this.modalCtrl.create(SignupPage, {page_type: 'FavitemsPage',id:''});
    //     // profileModal.present();
    // }
    // else
    // {
    // // this.navCtrl.push(FavitemsPage);
    // }
    this.router.navigate(['users/wishlist']);
  }

  imageOrderPage() {
    if (!this.user.isOkay()) {
      // let profileModal = this.modalCtrl.create(SignupPage, {page_type: 'ImageOrderPage',id:''});
      // profileModal.present();
    } else {
      // this.navCtrl.push(ImageOrderPage, { name: "product" });
    }
  }

  donatePage() {
    // this.navCtrl.push(DonationPage);
  }


  updateLocation() {
    // this.navCtrl.push(WelcomePage);
    this.router.navigate(['welcome']);
  }

  getCenterData() {
    this.platform_type = this.platform.platforms();

    this.api
      .postReq('/center', {
        platform_type: this.platform_type,
      })
      .then((res: any) => {
        if (res.status == 'success') {
          this.centerData = res.data;
          //console.log('center data'+this.centerData);
          this.center.setCenterData(this.centerData);
          this.loader.sliders = false;
          this.loader.dashboards = false;
          this.loader.categories = false;
        } else {
          //this.commin.toastMsg('Something error occured');
        }
      })
      .catch((err) => {
        //this.commin.toastMsg(err.message);
      });
  }

  swipeEvent(event) {
    if (event.direction == 2) {
      this.pageData.loadAnim = 'right';
      this.selectedTab += this.selectedTab < 4 ? 1 : 0;
    }
    if (event.direction == 4) {
      this.pageData.loadAnim = 'left';
      this.selectedTab -= this.selectedTab > 1 ? 1 : 0;
    }
  }

  managerPage() {
    // this.navCtrl.setRoot(ManagerPage);
  }

  shopOwnerPage() {
    // this.navCtrl.setRoot(ShopownerPage);
  }

  dboyPage() {
    // this.navCtrl.setRoot(DboyPage);
  }

  serviceOwnerPage() {
    // this.navCtrl.setRoot(ServiceownerPage);
  }

  swapNetwork() {
    if (this.commin.internet.status === 'off') {
      this.commin.networkOn();
    } else {
      this.commin.networkOff();
    }
  }

  setupNetworkToasts() {
    this.platform.ready().then(() => {
      this.network.onConnect().subscribe(() => {
        this.commin.networkOn();
        //this.commin.toastMsg('Network connected');
      });
      this.network.onDisconnect().subscribe(() => {
        this.commin.networkOff();
        //this.commin.toastMsg('Network disconnected');
      });
    });
  }

  silderNavigate(slider) {
    var data;
    if (slider.action === 'home') {
      data = parseInt(slider.action_data.tab || 1);
      this.changeTab(data);
    } else if (
      slider.action === 'shopping-category' &&
      slider.action_data.id &&
      slider.action_data.name
    ) {
      data = { id: slider.action_data.id, name: slider.action_data.name };
      // this.navCtrl.push(FoodPage, data);
      this.router.navigate(['shopping/foodpage', data]);
    } else if (slider.action === 'service' && slider.action_data.id) {
      data = { id: slider.action_data.id };
      // this.navCtrl.push(AboutservicePage, data);
      this.router.navigate(['/services', data]);
    }
  }
  isGuest(){
    return this.user.isGuestUser();
  }
  login() {
    this.router.navigate(['signup']);
  }

  ngOnInit() {
        this.menu.enable(true, 'shopping');
  }
}
