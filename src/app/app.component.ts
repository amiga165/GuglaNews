import { Component, ElementRef, ViewChild } from '@angular/core';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; 
import { ReactiveFormsModule } from '@angular/forms';
import {UserService} from './providers/user/user.service';
import {CenterService} from './providers/center/center.service';
import { Router } from '@angular/router';
import { IonRouterOutlet, Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { JsonPipe, Location } from '@angular/common';
import { Deeplinks } from '@ionic-native/deeplinks/ngx';
import { NgZone } from '@angular/core';
import {NewsPage} from 'src/app/pages/news/news.page';
import { FCM } from "cordova-plugin-fcm-with-dependecy-updated/ionic/ngx";

//import { AppUpdate } from '@ionic-native/app-update/ngx';
import { MobileAccessibility } from '@ionic-native/mobile-accessibility/ngx';
// @NgModule({
//   imports: [
//     FormsModule,
//     ReactiveFormsModule
//   ], 
//   declarations: []
//   }
// )

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

oneSignalID: any = {
    appId: 'f39d26fb-6181-4555-9fc2-186d8674fddd',
    projectId: '386451875047',
  };
LandPage: any;


  routerHidden:any = true;
  // @ViewChild('splash', {static: false}) splash: ElementRef;

  @ViewChild(IonRouterOutlet, {static : false}) routerOutlet: IonRouterOutlet;
  constructor(
    public user: UserService,
    private zone: NgZone,
    public center: CenterService,
    public router: Router,
    public platform: Platform,
    public splashScreen: SplashScreen,
    public statusBar: StatusBar,
    public location: Location,
    public deeplinks: Deeplinks,
    private fcm:FCM,
    // public oneSignal: OneSignal,
    private mobileAccessibility: MobileAccessibility
    ) {

    //  if (
    //   localStorage.getItem('landingpage') === null ||
    //   localStorage.getItem('landingpage') === ''
    // ) {
    //   localStorage.setItem('landingpage', 'NewsHome');
    // }
    this.LandPage = localStorage.getItem('landingpage');
    const OnBoarding = localStorage.getItem('onboarding');
   
    if(!OnBoarding){
      this.router.navigateByUrl('onboarding',{replaceUrl: true});
    }
    else if(!this.user.isOkay())
    {
       this.router.navigateByUrl('signup', { replaceUrl: true });
    }
    else if(this.LandPage==='NewsHome')
    {
      this.router.navigateByUrl('news', { replaceUrl: true });
    }
    else if(this.LandPage==='ShopHome')
    {
      this.router.navigateByUrl('news', { replaceUrl: true });   
    }





    // if(this.user.userData && this.center.isOkay())
    // {
    //    this.router.navigateByUrl('app/home/news', { replaceUrl: true });
    // }
    // else if(this.center.isOkay())
    // {
    //     this.router.navigateByUrl('welcome', { replaceUrl: true });
    // }
    // else
    // {
    //   this.router.navigateByUrl('signup', { replaceUrl: true });
    // }


    this.initializeApp();
    this.backButtonEvent();

  }

  initializeApp(){


    let updateUrl;
    this.platform.ready().then(() => {
this.getToken();

      this.fcm.onNotification().subscribe(data => {

        console.log("Received in background1111");
        if (data.wasTapped) {
          console.log("Received in background");
          if(data.type === 'News')
          {
           this.router.navigateByUrl(data.type1, { replaceUrl: true });
          }
        } else {
          console.log("Received in foreground");
          if(data.type === 'News')
          {
           this.router.navigateByUrl(data.type1, { replaceUrl: true });
          }
        };
      });

      this.fcm.onTokenRefresh().subscribe(token => {
     //   alert('fcm'+token);
        // Register your new token in your back-end if you want
        // backend.registerToken(token);
        this.user.setFcmID(token);
      });

      this.fcm.getToken().then(token => {
       // alert('fcm'+token);
        // Register your new token in your back-end if you want
        // backend.registerToken(token);
      });

     this.startOneSignal()

       this.mobileAccessibility.getTextZoom().then((textZoom)=>{
      if(textZoom>100){
          this.mobileAccessibility.setTextZoom(100); 
          }
       });


        this.setupDeeplinks();
        this.statusBar.styleBlackOpaque();
        this.splashScreen.hide();


    
        // setTimeout(() => {
        //   this.routerHidden = false;
        //   this.splash.nativeElement.style.display = 'none';
        // }, 2000)

        if (this.platform.is('android')) {
          updateUrl = 'https://meebuddy.com/app/android/my_app_update.xml';
        }
        else if (this.platform.is('ios')) {
          updateUrl = 'https://meebuddy.com/app/ios/my_app_update.xml';
        }
        //   this.appUpdate.checkAppUpdate(updateUrl).then(update => {

        // }).catch(error=>{

        // });
     

     

    });

  }

  startOneSignal()
  {
    (window as any).plugins.OneSignal.setAppId("f39d26fb-6181-4555-9fc2-186d8674fddd");
      
    (window as any).plugins.OneSignal.setNotificationOpenedHandler((jsonData) => { 
     //  console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));

      if(jsonData.notification.additionalData.type === 'News')
      {
       this.router.navigateByUrl(jsonData.notification.additionalData.type1, { replaceUrl: true });
      }
  });
  (window as any).plugins.OneSignal.promptForPushNotificationsWithUserResponse(function(accepted) {
      console.log("User accepted notifications: " + accepted);

  });
 
  }
  setupDeeplinks() {
   // alert('raj');
    this.deeplinks.route({ 
      '/news': '',
     '/news/:post_id': '',
     '/news/v/:post_id': '',
    '/news/view-news/:post_id': '',
    '/news/page-view/:community_id':''
   }).subscribe(
      match => {
        console.log('Successfully matched route', match);
     // alert('match'+JSON.stringify(match));
        // Create our internal Router path by hand
        const internalPath = match.$link.path;

      //  alert(internalPath);

       //  this.router.navigateByUrl(internalPath);
      // this.router.navigateByUrl(['news/newshome']);
       
        // Run the navigation in the Angular zone
        this.zone.run(() => {
          //alert('yes')
         // this.router.navigateByUrl(internalPath);
            this.router.navigateByUrl(internalPath);
        });
      },
      nomatch => {
        //alert('nomatch'+JSON.stringify(nomatch));
        // nomatch.$link - the full link data
        console.error("Got a deeplink that didn't match", nomatch);
      }
    );
  }
  getToken() {
    this.fcm.getToken().then(token => {
      this.user.setFcmID(token);
    });
  }

  backButtonEvent(){
    // this.platform.backButton.subscribeWithPriority(10, () => {
    //   if(!this.routerOutlet.canGoBack){
    //     navigator['app'].exitApp();
    //   }else{
    //     this.location.back();
    //   }
    // });

    this.platform.backButton.subscribeWithPriority(5, () => {
      const url = this.router.url;
      if (url === '/signup') {
          navigator['app'].exitApp();
      } else {
        this.location.back();

      }
  });
  }


}
