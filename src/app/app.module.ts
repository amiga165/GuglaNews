import { FormsModule } from '@angular/forms';
import { SignupComponent } from './components/signup/signup.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
// import { ComponentsModule } from "./components/components.module";
import { APIService } from './providers/api/api.service';
import { CenterService } from './providers/center/center.service';
import { UserService } from './providers/user/user.service';
import { CommonService } from './providers/common/common.service';
//  import { Geolocation } from '@ionic-native/geolocation/ngx';
 import { Geolocation } from '@ionic-native/geolocation/ngx';
 import { NativeGeocoder } from '@ionic-native/native-geocoder/ngx';
// import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';
// import { StatusBar} from '@capacitor/status-bar';
import { OneSignal } from '@ionic-native/onesignal/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { HttpClientModule, HttpHeaders } from '@angular/common/http';
import { BaseLayoutComponent } from './lay-outs/base-layout/base-layout.component';

import { MatButtonModule } from '@angular/material/button';
import { MatStepperModule } from '@angular/material/stepper';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Camera, CameraOptions } from "@ionic-native/camera/ngx";
import { AdMobFree } from '@ionic-native/admob-free/ngx';
import { AdmobfreeService } from './providers/ad/admobfree.service';
import { Screenshot } from '@ionic-native/screenshot/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { Crop } from '@ionic-native/crop/ngx';
import { File } from '@ionic-native/file/ngx';
import { Deeplinks } from '@ionic-native/deeplinks/ngx';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { MobileAccessibility } from '@ionic-native/mobile-accessibility/ngx';
import { AppVersion } from '@ionic-native/app-version/ngx';
//import { AppUpdate } from '@ionic-native/app-update/ngx';
import {Ng2TelInputModule} from 'ng2-tel-input';
// import { FCM } from '@ionic-native/fcm/ngx';
import { FCM } from "cordova-plugin-fcm-with-dependecy-updated/ionic/ngx";
// import { WelcomePipe } from './pages/welcome.pipe';
//import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player/ngx';
@NgModule({
  // const splashScreen: SplashScreenPlugin;
  declarations: [AppComponent, BaseLayoutComponent, SignupComponent],
  entryComponents: [],
  imports: [
    BrowserModule,LazyLoadImageModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MatStepperModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    // ComponentsModule,
    MatFormFieldModule,
    BrowserAnimationsModule,
    Ng2TelInputModule
  ],
  providers: [
    Screenshot,AppVersion,
    APIService,
    CommonService,
    CenterService,
    UserService,
    StatusBar,
    SplashScreen,
    HttpClientModule,
    Geolocation,
    AndroidPermissions,
    Crop,
    FCM,
    File,
    Deeplinks,
    MobileAccessibility,
    OneSignal,
    SocialSharing,
    Camera,
    AdMobFree,
    AdmobfreeService,
    NativeGeocoder,
    // HttpHeaders,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
