import { Component, OnInit } from '@angular/core';
import {
  NavController,
  Platform,
  NavParams,
  ModalController,
  MenuController,
} from '@ionic/angular';
import { APIService } from '../../providers/api/api.service';
import { CommonService } from '../../providers/common/common.service';
import { CenterService } from '../../providers/center/center.service';
import { AppVersion } from '@ionic-native/app-version/ngx';
import { UserService } from '../../providers/user/user.service';
import { ActivatedRoute } from '@angular/router';
// import { smsRetriever } from
import { Router } from '@angular/router';
import { SignupComponent } from '../../components/signup/signup.component';
import { Location } from '@angular/common';
// import { WelcomePage } from "../welcome/welcome";
// import { HomePage } from "../home/home";

@Component({
  selector: 'app-otpverify',
  templateUrl: './otpverify.page.html',
  styleUrls: ['./otpverify.page.scss'],
})
export class OtpverifyPage implements OnInit {
  formData = {
    mobile_num: '',
    otp: '',
    onesignal_id: '',
    app_version: '',
    password: '',
    txn_id:'',
    type:'news'
  };
  public LandPage: any;
  OTP = [
    { focus: false, value: '' },
    { focus: false, value: '' },
    { focus: false, value: '' },
    { focus: false, value: '' },
    { focus: false, value: '' },
    { focus: false, value: '' },
  ];
  page_type: any = '';
  id: any;
  txn_id:any;
  constructor(
    public navCtrl: NavController,
    public commin: CommonService,
    public user: UserService,
    public api: APIService,
    public platform: Platform,
    public center: CenterService,
    public appVersion: AppVersion,
    public navParams: NavParams,
    public router: Router,
    public viewCtrl: ModalController,
    public menuCtrl: MenuController,
    public activateroute:ActivatedRoute,
    public location: Location,
  ) // pulic events: Events
  {
    this.page_type = this.navParams.get('page_type');
    this.txn_id = this.navParams.get('txn_id');
    this.id = this.navParams.get('id');
    this.formData.password = this.navParams.get('password');
    console.log(this.formData.password);

    if (!this.user.userData.mobile) {
      this.dismiss();
    }

    this.formData.mobile_num = this.user.userData.mobile;
    this.formData.onesignal_id = this.user.getOneSignalID();
    this.appVersion
      .getVersionNumber()
      .then((version) => {
        this.formData.app_version = version;
      })
      .catch((err) => {});
    this.getSMS();
  }
  dismiss() {
    this.navCtrl.pop();
  }
  verify() {
    if (!this.validateOTP()) {
      this.commin.toastMsg('Invalid OTP !');
      return false;
    }
    this.formData.type='news';
    this.api
      .postReq('/common/verify', this.formData)
      .then((res: any) => {
        if (res.status == 'success' && res.token) {
          console.log(res);
          this.user.setToken(res.token);
          this.user.storeData(res.data);
          this.user.login();
          this.user.getUserDetails();
          this.api
            .postReq('/user/authorize/news_user', res.token)
            .then((data: any) => {
              this.user.setnewsToken(data.token);
              console.log('This is the news Token', data.token);
            })
            .catch((err: any) => {
              //this.commin.toastMsg(err.message);
              console.log('This is the news Token', err.message);

            });
          if (this.page_type == '' || this.page_type == undefined) {
           // console.log(this.page_type + 'sdsd');
            this.LandPage = localStorage.getItem('landingpage');
            if (this.center.isOkay()) {
              // this.navCtrl.setRoot(HomePage);
              if(this.center.data.guest===false && this.LandPage===null)
              {
                this.router.navigateByUrl('app/home/shopping', { replaceUrl: true });   
              }
              else if(this.center.data.guest===false && this.LandPage==='NewsHome')
              {
                this.router.navigateByUrl('news', { replaceUrl: true });
              }
              else if(this.center.data.guest===false && this.LandPage==='ShopHome')
              {
                this.router.navigateByUrl('app/home/shopping', { replaceUrl: true });      
              }
              else if(this.center.data.guest===true && this.LandPage===null)
              {
                this.router.navigateByUrl('news', { replaceUrl: true });    
              }
              else if(this.center.data.guest===true && this.LandPage==='NewsHome')
              {
                this.router.navigateByUrl('news', { replaceUrl: true });
              }
              else if(this.center.data.guest===true && this.LandPage==='ShopHome')
              {
                this.router.navigateByUrl('app/home/shopping', { replaceUrl: true });      
              }
              else
              {
                this.router.navigateByUrl('news', { replaceUrl: true });
              }
            } else {
              // this.navCtrl.setRoot(WelcomePage);
              this.router.navigate(['welcome']);
            }
          } else {
            // this.events.publish('user:created', Date.now());
            console.log(this.page_type + 'sdsdsdsds');
            this.dismiss1();
            this.menuCtrl.close();
          }
        } else {
          this.commin.toastMsg('Something error occured !');
        }
      })
      .catch((err) => {
        this.commin.toastMsg(err.message);
      });
  }

  resend() {
    for (var i = 0; i < 6; i++) this.OTP[i].value = '';
    this.api
      .postReq('/common/signup', { mobile_num: this.formData.mobile_num,type:'news' })
      .then((resp: any) => {
        this.commin.toastMsg('OTP sent succesfully !');
      })
      .catch((err) => {
        this.commin.toastMsg(err.message);
      });
  }

  validateOTP() 
  {

   
    if(this.formData.otp.length==6)
      return true;
    else
      return false;
  }

  setOTP(otp) {
    if (/^[0-9]{6}$/.test(otp)) {
      for (var i = 0; i < 6; i++) this.OTP[i].value = otp[i];
    } else {
      return false;
    }
  }

  otpController(event, prev, cur, next, index) {
    console.log(cur, index);
    if (event.key.length === 1) cur.value = event.key;
    // if (index == 6 && cur.value.length === 1) {
    // 	cur.setBlur();
    // }
    if (event.target.value.length < 1 && prev) {
      prev.setFocus();
    } else if (next && event.target.value.length > 0) {
      next.setFocus();
    }
    this.validateOTP();
  }

  focus(index) {
    this.OTP[index].focus = true;
  }
  blur(index) {
    this.OTP[index].focus = false;
  }
  dismiss1() {
    this.viewCtrl.dismiss();
  }
  getSMS() {
    // if (this.platform.ready()) {
    // 	try {
    // 		var smsRetriever: any = window.cordova.plugins.smsRetriever;
    // 		smsRetriever["startWatching"](
    // 			res => {
    // 				var otpMessage = res.Message.match(/[0-9]{6}/g)[0];
    // 				this.setOTP(otpMessage);
    // 				this.verify();
    // 			},
    // 			err => {
    // 				console.warn(err);
    // 			},
    // 		);
    // 	} catch (e) {
    // 		console.warn("Error in get SMS code");
    // 	}
    // }
  }

  back(){
    this.location.back();
  }

  ngOnInit() {
      this.activateroute.params.subscribe((data: any) => {
                 console.log('hiii'+JSON.stringify(data));
                this.formData.password = data.password;
                this.txn_id=data.txn_id;
                this.formData.txn_id=this.txn_id;
                console.log('txnnn'+this.txn_id);
              });


  }
}
