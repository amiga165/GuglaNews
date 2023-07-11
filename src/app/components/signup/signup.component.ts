import { NavController, Platform, ModalController, AlertController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgModule } from '@angular/core';

import { APIService } from '../../providers/api/api.service';
import { NewsService } from '../../providers/news/news.service';
import { CommonService } from '../../providers/common/common.service';
import { CenterService } from '../../providers/center/center.service';
import { UserService } from '../../providers/user/user.service';
import { OtpverifyPage } from '../../pages/otpverify/otpverify.page';


declare var window;
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  public segment: any = '0';
  formData = {
    mobile_num: '',
    password: '',
    email: '',
    referral_code: '',
    hash_code: '',
    skip:false,
    guest_mobile_num:'',
    onesignal_id: '',
    country_code: '',
    type:'news'
  };

  terms_conditions = false;

  opts: any = {
    cssClass: 'lang'
  };

  page_type: any = '';
  id: any;
  public forget: boolean = false;
  public tab: any = 'login';
  public LandPage: any;
  pageData = { login_lock: false };
  
  public appTheme = localStorage.getItem('theme');

  constructor(
    public commin: CommonService,
    public api: APIService,
    public user: UserService,
    public platform: Platform,
    public center: CenterService,
    public router: Router,
    public modalCtrl: ModalController,
    public news: NewsService,
    public alertController: AlertController,
  ) {

    this.platform.ready().then(() => {
    })





    // this.formData.onesignal_id=this.user.getOneSignalID();
     console.log('guestt'+this.user.isGuestUser());
    console.log('user data'+this.user.userData);
    if (
      localStorage.getItem('landingpage') === null ||
      localStorage.getItem('landingpage') === ''
    ) {
      //localStorage.setItem('landingpage', 'HomePage');
    }

    this.LandPage = localStorage.getItem('landingpage');
    console.log(this.LandPage);

    if(this.user.isGuestUser())
    {

    }
    else
    {
    // if (this.user.isSignedUp() && !this.user.isSignedIn() ) {
    //   // this.navCtrl.push(OtpverifyPage);
    //   this.router.navigateByUrl('otpverify', { replaceUrl: true });
    // } else 
    if (this.user.isOkay() && !this.center.isOkay()) {
      // this.navCtrl.setRoot(WelcomePage);
      this.router.navigateByUrl('welcome', { replaceUrl: true });
    } else if (this.user.isOkay() && this.center.isOkay()) {
      if (this.LandPage === 'ShopHome') {
        // this.navCtrl.setRoot(HomePage);
        this.router.navigateByUrl('news', { replaceUrl: true });
      } else if (this.LandPage === 'NewsHome') {
        // this.navCtrl.setRoot(DboyPage);
        this.router.navigateByUrl('news', { replaceUrl: true });
      } else if (this.LandPage === 'ShopownerPage') {
        // this.navCtrl.setRoot(ShopownerPage);
        this.router.navigateByUrl('', { replaceUrl: true });
      } else if (this.LandPage === 'ServiceownerPage') {
        // this.navCtrl.setRoot(ServiceownerPage);
        this.router.navigateByUrl('', { replaceUrl: true });
      } else if (this.LandPage === 'ManagerPage') {
        // this.navCtrl.setRoot(ManagerPage);
        this.router.navigateByUrl('', { replaceUrl: true });
      } else {
        // this.navCtrl.setRoot(HomePage);
        this.router.navigateByUrl('app/home/news', { replaceUrl: true });
      }
    }
  }
  if(!this.user.isGuestUser())
  {
    this.formData.mobile_num = this.user.userData.mobile || '';
  }
     this.getHashCode();
  }
  changeTab(tab) {
    this.segment = tab;
    this.forget = false;
  }
  forget_reset() {
    this.segment = '0';
    this.forget = true;
  }


  login() {
    console.log(this.formData);
    if (this.formData.mobile_num == '') {
      this.commin.toastMsg('Please fill all required the fields correctly!');
      return false;
    } else if (this.formData.password == '') {
      this.commin.toastMsg('Please fill all required the fields correctly!');
      return false;
    } else {
      this.pageData.login_lock = true;
      this.formData.type = 'news';
      this.api
        .postReq('/common/login', this.formData)
        .then((res: any) => {
          if (res.status == 'success' && res.token) {
            this.user.signup(this.formData.mobile_num);
            this.user.setToken(res.token);
            this.user.storeData(res.data);
            this.user.getUserDetails();
            this.user.login();
            if (this.page_type == '' || this.page_type == undefined) {
              console.log(this.page_type + 'sdsd');
              this.LandPage = localStorage.getItem('landingpage');
              console.log('okay',this.LandPage,'ddd',this.center.data.guest);
                if (this.center.isOkay()) {
                  if(this.center.data.guest===false && this.LandPage===null)
                  {
                    this.router.navigateByUrl('news', { replaceUrl: true });   
                  }
                  else if(this.center.data.guest===false && this.LandPage==='NewsHome')
                  {
                    this.router.navigateByUrl('news', { replaceUrl: true });
                  }
                  else if(this.center.data.guest===false && this.LandPage==='ShopHome')
                  {
                    this.router.navigateByUrl('news', { replaceUrl: true });    
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
                    this.router.navigateByUrl('news', { replaceUrl: true });   
                  }
                  else
                  {
                    this.router.navigateByUrl('news', { replaceUrl: true });
                  }
                  
                } else {
                  // this.navCtrl.setRoot(WelcomePage);
                  this.router.navigateByUrl('welcome', { replaceUrl: true });
                }
            } else {
              // this.events.publish('user:created', Date.now());
              // console.log(this.page_type + 'sdsdsdsds');
            }
          } else {
            //this.commin.toastMsg('Something error occured !');
          }

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
        })
        .catch((err) => {
          console.log(err);
          this.commin.toastMsg(err.message);
        })
        .then(() => {
          this.pageData.login_lock = false;
        });
    }
  }

  async accept_polices(){
    if(this.platform.is('ios') && this.terms_conditions == false && this.formData.mobile_num && this.formData.password){
        let alert = await this.alertController.create({
          header: "Terms & Conditions",
          message: `
                    Please accept the terms and conditions before sign-up <br /> <br/>
                    <p>1. Content ownership: The app will own the rights to the content that is displayed on the app.</p>
                    <p>2. User-generated content: The content should not be violent/biased/harmful/abusive</p>
                    <p>3. There is no tolerance for objectable content or abusive users</p>
                    <p>4. We provide an option to block/report on the posts/users which you don't like</p>
                    <p>5. Privacy policy: The app has the privacy to protect the user details and other sensitive data</p>
                    <p>6. Copyright infringement: Users are not allowed to copy or distribute the content without the app's permission.</p>
                    <p>7. If user doesn't feel comportable with app, can delete the account permanently</p>
                    <p>8. If any user violates the terms and conditions, the admit will revoke the account</p>
                    `,
          buttons: [
            {
              text: "Reject",
              role: "cancel",
            },
            {
              text: "Accept",
              handler: () => {
                this.terms_conditions = true;
              },
            },
          ],
        });
        alert.present();
    }
    else if(this.segment == '1'){
      this.login();
    }
    else{
      this.signup('0');
    }
  }

  signup(skiptype) {
    console.log(skiptype);
    var msg = this.validate();
    if(skiptype==='0')
    {
      if(this.user.isGuestUser())
      {
        this.formData.guest_mobile_num=this.user.guest_mobile_num();
      }
      this.formData.skip=false;
    }
    if(skiptype==='1')
    {
      if(this.user.isGuestUser())
      {
          this.LandPage = localStorage.getItem('landingpage');
          if (this.center.isOkay()) 
          {
            if(this.center.data.guest===false && this.LandPage===null)
            {
              this.router.navigateByUrl('news/allnews', { replaceUrl: true });  
            }
            else if(this.center.data.guest===false && this.LandPage==='NewsHome')
            {
              this.router.navigateByUrl('news/allnews', { replaceUrl: true });
            }
            else if(this.center.data.guest===true && this.LandPage===null)
            {
              this.router.navigateByUrl('news', { replaceUrl: true });    
            }
            else if(this.center.data.guest===true && this.LandPage==='NewsHome')
            {
              this.router.navigateByUrl('news/allnews', { replaceUrl: true });
            }
            else if(this.center.data.guest===true && this.LandPage==='ShopHome')
            {
              this.router.navigateByUrl('news', { replaceUrl: true });  
            }
            else
            {
              this.router.navigateByUrl('news/allnews', { replaceUrl: true });
            }  
          } 
          else {
            // this.navCtrl.setRoot(WelcomePage);
            this.router.navigateByUrl('welcome', { replaceUrl: true });
          }

        return false;
      }
      this.formData.skip=true;
      msg=null;
    }
    if (this.pageData.login_lock) return false;

    // if (this.formData.mobile_num == '') {
    //   this.commin.toastMsg('Please fill all required the fields correctly!');
    //   return false;
    // } else if (this.formData.password == '') {
    //   this.commin.toastMsg('Please fill all required the fields correctly!');
    //   return false;
    // }
    
    if (msg) {
      this.commin.toastMsg(msg);
    } else {
      this.pageData.login_lock = true;
      this.formData.type='news';
      this.api
        .postReq('/common/signup', this.formData)
        .then(async (resp: any) => {

          if(this.formData.skip)
          {
               // console.log(res);
              this.user.signup(resp.data.mobile_num);
              this.user.setToken(resp.token);
              this.user.storeData(resp.data);
              this.user.login();
              this.user.getUserDetails();
              this.api
                .postReq('/user/authorize/news_user', resp.token)
                .then((data: any) => {
                  this.user.setnewsToken(data.token);
                  console.log('This is the news Token', data.token);
                })
                .catch((err: any) => {
                  //this.commin.toastMsg(err.message);
                  console.log('This is the news Token', err.message);

                });
              if (this.page_type == '' || this.page_type == undefined) {
                console.log(this.page_type + 'sdsd');
                if (this.center.isOkay()) {
                  // this.navCtrl.setRoot(HomePage);
                  this.router.navigateByUrl('news', { replaceUrl: true });
                } else {
                  // this.navCtrl.setRoot(WelcomePage);
                  this.router.navigateByUrl('welcome', { replaceUrl: true });
                }
              } else {
                // this.events.publish('user:created', Date.now());
                console.log(this.page_type + 'sdsdsdsds');
               //  profileModal.present();
               // this.modalCtrl.dismiss();
              }
          }
          else
          {
              this.user.signup(this.formData.mobile_num);
              if (this.page_type == '' || this.page_type == undefined) {
                console.log('eerr');
                // this.navCtrl.push(OtpverifyPage, { password: this.formData.password,});
                this.router.navigate([
                  'otpverify',
                  { password: this.formData.password,txn_id:resp.data.txn_id },
                ]);
              } else {
                console.log('eerrsdkjsjdkh' + this.page_type);
                let profileModal = await this.modalCtrl.create({
                  component: OtpverifyPage,
                  componentProps: {
                    password: this.formData.password,
                    page_type: this.page_type,
                    id: this.id,
                    txn_id:resp.data.txn_id
                  },
                });
                profileModal.present();
                this.modalCtrl.dismiss();
              }


          }
        })
        .catch((err) => {
          console.log(err);
          this.commin.toastMsg(err.message);
        })
        .then(() => {
          this.pageData.login_lock = false;
        });
    }
  }

  skip() {
      //  this.formData.onesignal_id=this.user.getOneSignalID();
 
 
    //this.navCtrl.setRoot(HomePage);
    if(!this.center.isOkay()){
    this.router.navigateByUrl('welcome', { replaceUrl: true });

    }
    else{
    this.router.navigateByUrl('app/home/news', { replaceUrl: true });

    }
  }
  dismiss() {
    // this.viewCtrl.dismiss();
    this.modalCtrl.dismiss();
  }

  validate() {
    if (!this.formData.mobile_num) return 'Please enter mobile number';
    if (!/^[6-9]{1}[0-9]{9}$/.test(this.formData.mobile_num))
      return 'Invalid mobile number';
    if (this.formData.email && !/^\S+@\S+\.\S+$/.test(this.formData.email))
      return 'Invalid Email';
    if (
      this.formData.referral_code &&
      !/^MB[0-9A-Z]{5}$/.test(this.formData.referral_code)
    )
      this.formData.referral_code = '';
    return null;
  }

  getHashCode() {
    if (this.platform.ready()) {
      try {
        var smsRetriever: any = window.cordova.plugins.smsRetriever;
        smsRetriever['getAppHash'](
          (res) => {
            this.formData.hash_code = res;
          },
          (err) => {
            console.warn(err);
          }
        );
      } catch (e) {
        console.warn('Error in get hash code');
      }
    }
  }

  onCountryChange(event){
    this.formData.country_code = event.dialCode;
    console.log(event)
  }
  ngOnInit() {}
}
