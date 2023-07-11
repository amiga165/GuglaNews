import { Component, OnInit } from '@angular/core';
import { UserService } from '../../providers/user/user.service';
import { AlertController, ModalController, Platform } from '@ionic/angular';
import { OneSignal } from '@ionic-native/onesignal/ngx';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser'; 

import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

import { APIService } from '../../providers/api/api.service';
import { CommonService } from '../../providers/common/common.service';
import { CenterService } from '../../providers/center/center.service';

import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { MenuController } from '@ionic/angular';

// import { SignupPage } from "../../pages/signup/signup";

// import { TestPage } from 'src/app/pages/test/test.page';

@Component({
  selector: 'app-base-layout',
  templateUrl: './base-layout.component.html',
  styleUrls: ['./base-layout.component.scss'],
})
// @NgModule({
//   imports: [CommonModule, BrowserModule],
//   // declarations: [BaseLayoutComponent]
// })
export class BaseLayoutComponent implements OnInit {
  oneSignalID: any = {
    appId: 'f39d26fb-6181-4555-9fc2-186d8674fddd',
    projectId: '386451875047',
  };
  isDarkTheme:any;

  constructor(
    public menu: MenuController,
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public commin: CommonService,
    public user: UserService,
    // public oneSignal: OneSignal,
    public alertCtrl: AlertController,
    public api: APIService,
    public center: CenterService,
    public modalCtrl: ModalController,
    public router: Router,
    public route: ActivatedRoute
  ) {

    console.log(center.location);
    try {
      this.initializeApp();
    } catch (e) {
      alert('Error in InitAPP : ' + e);
    }
    if (localStorage.getItem('langData') === null) {
      this.user.userData.language = 'none';
      this.user.save();
      this.setLanguage('english');
    }

    if (localStorage.getItem('theme') === 'dark') {
      document.body.setAttribute('color-theme', 'dark');
      localStorage.setItem('theme', 'dark');
      this.isDarkTheme=true;
    } else {
      document.body.setAttribute('color-theme', 'light');
      localStorage.setItem('theme', 'light');
      this.isDarkTheme=false;
    }
  }

  initializeApp() {
    this.platform.ready().then(() => {
    //  this.statusBar.styleDefault();
      this.splashScreen.hide();

      this.platform.ready().then(() => {
        (window as any).plugins.OneSignal.setAppId("f39d26fb-6181-4555-9fc2-186d8674fddd");
      
        (window as any).plugins.OneSignal.getDeviceState((resp) => { 
         if(resp.userId)
         {
        //   console.log('onesingal id',resp.userId);
           this.user.setOneSignalID(resp.userId);
         }
         })
       });
      
    });
  }

toggleMenu(){ // this function will toggle your menu. 
    this.menu.toggle();
  }

  addName() {
    this.alertCtrl
      .create({
        header: 'Enter Your Name',
        inputs: [
          {
            name: 'name',
            placeholder: 'Your Name',
          },
        ],
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
          },
          {
            text: 'Confirm',
            handler: (data) => {
              this.user.updateUserDetails(data);
            },
          },
        ],
      })
      .then((data) => {
        data.present();
      });
  }

  welcomePage() {
    // this.nav.push(WelcomePage);
    this.router.navigate(['welcome']);
  }

  signup(pagetype, id) {
    // let profileModal = this.modalCtrl.create(SignupPage, {
    //   page_type: pagetype,
    //   id:id
    // });
    // profileModal.present();
  }

  homePage() {
    // this.nav.setRoot(HomePage);
    this.router.navigate(['app/home/shopping']);
  }

  servicesPage() {
    // this.nav.setRoot(HomePage, { view: 2 });
    this.router.navigate(['app/home/services']);
  }

  anyitemPage() {
    this.router.navigate(['shopping/any']);
  }

  localProductPage() {
    // this.nav.setRoot(HomePage, { view: 3 });
    this.router.navigate(['app/home/products']);


  }

  sellLocalProductPage() {
    // this.nav.push(LocalProductSellPage);
    this.router.navigate(['app/home/products']);
  }

  medicianPage() {
    // this.nav.push(ImageOrderPage, { name: 'medicine' });
    this.router.navigate(['shopping/img-order',{name:'medicine'}]);

  }
  
  myAccountPage() {
    // this.nav.push(MyaccountPage);
    this.router.navigate(['users/profile']);
  }

  mycoupons() {
    // this.nav.push(MyoffersPage);
    this.router.navigate(['users/coupons']);
  }

  myreferral() {
    // this.nav.push(MyreferralPage);
    this.router.navigate(['users/referal']);
  }

  ordersPage() {
    // this.nav.push(OrderslistPage);
    this.router.navigate(['users/order']);
  }

  walletPage() {
    // this.nav.push(WalletPage);
    this.router.navigate(['users/wallet']);
  }

  cartPage() {
    // this.nav.push(CheckoutPage);
    this.router.navigate(['users/cart']);
  }

  wishlistPage() {
    // this.nav.push(FavitemsPage);
    this.router.navigate(['users/wishlist']);
  }

  newsPage() {
    // this.nav.setRoot(HomePage, { view: 2 });
 //   this.router.navigate(['news'],);
                  this.router.navigateByUrl('news', { replaceUrl: true });
 // window.location.assign('/news');
  }

  addressesPage() {
    // this.nav.push(MyaddressessPage);
    this.router.navigate(['users/address']);
  }

  offers() {
    // this.nav.push(MyoffersPage);
  }

  changeLanguage() {
    console.log('change language');
    const langType = this.user.userData.language;
    this.alertCtrl
      .create({
        header: 'Change language',
        inputs: [
          {
            type: 'radio',
            label: 'English',
            value: 'english',
            checked: 'english' === langType,
          },
          {
            type: 'radio',
            label: 'Khasi',
            value: 'khasi',
            checked: 'khasi' === langType,
          },
          {
            type: 'radio',
            label: 'Garo',
            value: 'garo',
            checked: 'garo' === langType,
          },
        ],

        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
          },
          {
            text: 'Confirm',
            handler: (lang) => {
              this.setLanguage(lang);
            },
          },
        ],
      })
      .then((data) => {
        data.present();
      });
  }
  mynotifications() {
    // this.nav.push(NotificationsPage);
    this.router.navigate(['users/notifications']);
  }

  setLanguage(lang) {
    if (this.user.userData.language === lang) {
      return false;
    }
    this.api
      .getReq('/common/language/' + lang)
      .then((res: any) => {
        if (res.status === 'success') {
          this.user.setLanguageData(lang, res.data);
        } else {
          //this.commin.toastMsg('Something error occured');
        }
      })
      .catch((err) => {
        //this.commin.toastMsg(err.message);
      });
  }

  Toggletheme(event) {
    // if (event.detail.checked) {
    //   document.body.setAttribute('color-theme', 'dark');
    //   localStorage.setItem('theme', 'dark');
    //   this.isDarkTheme=true;
    // } else {
    //   document.body.setAttribute('color-theme', 'light');
    //   localStorage.setItem('theme', 'light');
    //   this.isDarkTheme=false;
    // }
    if (event.detail.checked) { this.commin.toastMsg("Dark theme will be available on next version"); }
  }

  share() {
    this.user.shareApp();
  }

  logout() {
    this.commin.startLoader();
    this.user.logout(false).then(() => {
      this.commin.stopLoader();
      // this.nav.setRoot(SignupPage);
      console.log('logged out');
      this.router.navigate(['signup']);
    });
  }
  login() {
    this.router.navigate(['signup']);
  }
ionDidOpen()
{
  //alert('hi');
}
  ngOnInit() {

    this.menu.enable(true, 'shopping');
  }
  ionViewWillEnter()
{
    this.menu.enable(false, 'newsMenu');
        this.menu.enable(true, 'shopping');
  //this.add_more_all_posts();
//alert('raaaa');
}

isGuest(){
  return this.user.isGuestUser();
}

}
