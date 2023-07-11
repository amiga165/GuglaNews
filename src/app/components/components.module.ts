//import { ShopregisterationPage } from './../pages/shopregisteration/shopregisteration.page';
import { ProfilepopupComponent } from './profilepopup/profilepopup.component';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
// import { Ionic2RatingModule } from "ionic2-rating";
// import { PaymentPageComponent } from "./payment-page/payment-page";
import { MainHeaderComponent } from './main-header/main-header.component';
import { NewsCardComponent } from './news-card/news-card.component';
import { CommonModule } from '@angular/common';
import { ImageCropperModule } from 'ngx-image-cropper';
import { ProfileEditComponent } from './profile-edit/profile-edit.component';
import { AppupdateComponent } from './appupdate/appupdate.component'
import { TermsComponent } from './terms/terms.component';
import { GeolocationsComponent } from './geolocations/geolocations.component';
import { NoDataFoundComponent } from './no-data-found/no-data-found.component';

@NgModule({
  declarations: [

    // PaymentPageComponent,
    MainHeaderComponent,
    NewsCardComponent,
    ProfilepopupComponent,
   // ShopregisterationPage,
    ProfileEditComponent,AppupdateComponent,TermsComponent,GeolocationsComponent,NoDataFoundComponent
  ],
  imports: [
    // IonicPageModule,
    CommonModule,
    IonicModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ImageCropperModule
    // Ionic2RatingModule,
  ],
  exports: [
    // PaymentPageComponent,
    MainHeaderComponent,
    NewsCardComponent,
    AppupdateComponent,
    TermsComponent,

    ProfileEditComponent,GeolocationsComponent,NoDataFoundComponent

  ],
})
export class ComponentsModule {}
