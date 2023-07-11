import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OtpverifyPageRoutingModule } from './otpverify-routing.module';

import { OtpverifyPage } from './otpverify.page';
import { AppVersion } from "@ionic-native/app-version/ngx";


import { NavController, Platform,NavParams,ModalController,MenuController} from "@ionic/angular";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OtpverifyPageRoutingModule,
  
  ],
  providers:[NavController, Platform,NavParams,ModalController,MenuController,  AppVersion,],
  declarations: [OtpverifyPage]
})
export class OtpverifyPageModule {}
