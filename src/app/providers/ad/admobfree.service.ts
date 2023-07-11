import { Injectable } from '@angular/core';
import {
  AdMobFree,
  AdMobFreeBannerConfig,
  AdMobFreeInterstitialConfig
} from '@ionic-native/admob-free/ngx';
import { Platform } from '@ionic/angular';
@Injectable({
  providedIn: 'root'
})
export class AdmobfreeService {
  banner_id:any;
  constructor(
    public admobFree: AdMobFree,
    public platform: Platform
  ) { 
    platform.ready().then(() => {
      // this.admobFree.interstitial.config(this.interstitialConfig);
      // this.admobFree.interstitial.prepare()
      //   .then(() => { }).catch(e => console.log(e));

      if (this.platform.is('android')) {
          this.banner_id='ca-app-pub-6001377970808084/4875229607';
        }
        if (this.platform.is('ios')) {
          this.banner_id='ca-app-pub-6001377970808084/2363782189';
        }

    });

    
    
    this.admobFree.on('admob.interstitial.events.CLOSE').subscribe(() => {
      this.admobFree.interstitial.prepare()
        .then(() => {}).catch(e => console.log(e));
    });
  }


  showBannerAd() {
    let bannerConfig: AdMobFreeBannerConfig = {
       //isTesting: true, // Remove in production
        autoShow: true,
        bannerAtTop: false,
        id: this.banner_id
    };
    this.admobFree.banner.config(bannerConfig);
  
    this.admobFree.banner.prepare().then(() => {
        // success
    }).catch(e => console.log(e));
  }

    hideBannerAd() {
    this.admobFree.banner.hide();
  }

  // showInterstitialAd() {
  //   this.admobFree.interstitial.isReady().then(() => {
  //     this.admobFree.interstitial.show().then(() => {
  //     })
  //       .catch(e =>console.log("show "+e));
  //   })
  //     .catch(e =>console.log("isReady "+e));
  // }

  interstitialConfig: AdMobFreeInterstitialConfig = {
   //isTesting: true, // Remove in production
    autoShow: false,
    id: "ca-app-pub-3940256099942544/1033173712"
};
}
