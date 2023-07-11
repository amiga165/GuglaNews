import { Injectable } from '@angular/core';
import {
  ToastController,
  LoadingController,
  AlertController,
  ModalController, 
} from '@ionic/angular';

import { EncryptorService } from '../encryptor/encryptor.service';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  public langData: any;
  public internet = { status: '', message: '' };
  public pageData = { modal: undefined };
  public loader: any = false;
  public default_url: string =
    'https://images.meebuddy.com/products/no_image.jpg';

    public isDarkTheme:boolean = false;

  constructor(
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public storage: EncryptorService,
    // public network: Network,
    public alertCtrl: AlertController,
    public modalCtrl: ModalController
  ) {
    this.loadLanguage();

    localStorage.getItem('theme') == 'dark' ? this.isDarkTheme = true : this.isDarkTheme = false;
  }

  loadLanguage() {
    this.langData = this.storage.getObject('langData');
  }

  async toastMsg(msg) {
    let toast =await this.toastCtrl.create({
      message: msg,
      duration: 2000,
      cssClass:'iontoastSuccess'
    });
    toast.present();
  }
  async toastErr(msg) {
    let toast =await this.toastCtrl.create({
      message: msg,
      duration: 2000,
      cssClass:'iontoastError'
    });
    toast.present();
  }

  async presentLoading(msg) {
    let loading =await this.loadingCtrl.create({message:msg});
    loading.present();

    setTimeout(() => {
      loading.dismiss();
    }, 1000);
  }

  async startLoader() {
    this.loader = await this.loadingCtrl.create({
      message: 'Please wait...',
    });
      // .then(() => {
    this.loader.present();
    //   });
    setTimeout(() => {
      this.stopLoader();
    }, 5000);
  }
  
  stopLoader() {
    if (this.loader) this.loader.dismiss();
    this.loader = false;
  }

  closeLoader() {
    if (this.loader) this.toastMsg('Network Problem');
    this.stopLoader();
  }

  imgError(event) {
    event.srcElement.src = this.default_url;
  }

  camelCase(str) {
    if (!str) return '';
    return str
      .trim()
      .split(' ')
      .filter((x) => x)
      .map((a) => a[0].toUpperCase() + a.substring(1).toLowerCase())
      .join(' ');
  }

  networkOn() {
    this.internet.status = 'on';
    this.internet.message = 'We are back !...';
    setTimeout(() => {
      this.internet.status = '';
      this.internet.message = '';
    }, 900);
  }

  networkOff() {
    this.internet.status = 'off';
    this.internet.message = 'Network disconnected';
  }

  nFormatter(num) {
    const lookup = [
      { value: 1, symbol: "" },
      { value: 1e3, symbol: "k" },
      { value: 1e6, symbol: "M" },
      { value: 1e9, symbol: "G" },
      { value: 1e12, symbol: "T" },
      { value: 1e15, symbol: "P" },
      { value: 1e18, symbol: "E" }
    ];
    const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
    var item = lookup.slice().reverse().find(function(item) {
      return num >= item.value;
    });
    return item ? (num / item.value).toFixed(1).replace(rx, "$1") + item.symbol : "0";
  }

  stringAsDate(dateStr: string) {

    let now = new Date().getTime();
  
    let past = new Date(dateStr).getTime();
  
    let time = now - past;
  
    let diffDay = Math.floor(time / 86400000);
  
    let diffHour = Math.floor((time % 86400000) / 3600000);
  
    let diffMinute = Math.floor(((time % 86400000) % 3600000) / 60000);
  
    let diffSecs = Math.floor((((time % 86400000) % 3600000) % 60000) / 1000 ); 
  
    let diffMonths = Math.floor(diffDay/30);
  
    let diffyears = Math.floor(diffMonths/12);
  
    if (diffSecs >= 1 && diffMinute < 1){
  
      return diffSecs + " seconds ago";
  
    }else if(diffMinute >= 1 && diffHour < 1){
  
      return diffMinute + " minutes ago"    
  
    }else if(diffHour >= 1 && diffDay < 1){
  
      return diffHour + " hours ago";
      
    }else if(diffDay >= 1 && diffMonths < 1){
  
      return diffDay + " days ago";
  
    }
    else if(diffMonths >= 1 && diffyears < 1){
  
      return diffMonths + " months ago";
      
    }
    else if(diffyears >= 1){
  
      return diffyears + " years ago";
      
    }
    else{
      return new Date(dateStr);
    } 
  }
}
