import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ModalController, NavController } from '@ionic/angular';
import { ProfileEditComponent } from 'src/app/components/profile-edit/profile-edit.component';
import { CenterService } from 'src/app/providers/center/center.service';
import { UserService } from 'src/app/providers/user/user.service';

import { NewsService } from 'src/app/providers/news/news.service';
import { CommonService } from "src/app/providers/common/common.service";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.page.html',
  styleUrls: ['./user-profile.page.scss'],
})
export class UserProfilePage implements OnInit {

  
  user_details:any;
  public mystatsdata:any={};
  constructor(public navCtrl:NavController,
              public modalCtrl:ModalController,
              public user:UserService,
              public alertController:AlertController,
              public router:Router,
              public center:CenterService,
              public news:NewsService,
              public commin: CommonService
              ) 
  { 
    this.mystatsdata.verified=0;
        this.mystatsdata.rejected=0;
            this.mystatsdata.posted=0;
    this.mystats();
  }

  ngOnInit() {
   // this.user.getUserDetails();
    this.user_details = this.user.userData;
  }
  
  async edit_modal_popup(){
    const modal = await this.modalCtrl.create({
      component: ProfileEditComponent,
      cssClass: 'editprofile',
      componentProps: {'user_details':this.user_details}
    });
    
    modal.onDidDismiss().then((data: any) => {
      
    });
    
    await modal.present();
  }
  
  
  async updating() {
    const alert = await this.alertController.create({
      message: 'updating soon...',
      buttons: [
        {
          text: 'close',
          role: 'cancel'
        }
      ]
    });
    await alert.present();
    const { role } = await alert.onDidDismiss();
  }
  
  navigateToWelcomePage(){
    this.router.navigateByUrl('welcome', { replaceUrl: true });
  }
  mystats() {
    this.news.postReq('/stats', {}).then((response: any) => {
      if(response.data)
      {
              this.mystatsdata.posted = response.data.posted || 0; 
              this.mystatsdata.verified = response.data.verified || 0; 
              this.mystatsdata.rejected = response.data.rejected || 0;        
      }

      console.log(JSON.stringify(this.mystatsdata) + 'stats data');
    });
  }

  
  logout(status) {
    console.log('status',status);
    this.commin.startLoader();
    this.user.logout(status).then(() => {
      this.commin.stopLoader();
      // this.nav.setRoot(SignupPage);
      console.log('logged out');
      this.router.navigate(['signup']);
    });
  }

  back(){this.navCtrl.back();}
  Toggletheme(event) {
    if (event.detail.checked) {
      document.body.setAttribute('color-theme', 'dark');
      localStorage.setItem('theme', 'dark');
      this.commin.isDarkTheme=true;
    } else {
      document.body.setAttribute('color-theme', 'light');
      localStorage.setItem('theme', 'light');
      this.commin.isDarkTheme=false;
    }
  }


  async delete_user() {
    let alert = await this.alertController.create({
			header: "Confirm Delete",
			message: "Are you sure want to delete the Account",
			buttons: [
				{
					text: "Cancel",
					role: "cancel",
				},
				{
					text: "Delete",
					handler: () => {
						this.deleteAccount();
					},
				},
			],
		});
		alert.present();

	}

  deleteAccount()
  {
    this.commin.startLoader();
		this.user.logout(true).then(() => {
		  this.commin.stopLoader();
		  this.router.navigate(['signup']);
		});
  }

} 
