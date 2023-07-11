import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewshomePageRoutingModule } from './newshome-routing.module';

import { NewshomePage } from './newshome.page';
import { NewsPostsModule } from '../news-posts/news-posts.module';
import { AppVersion } from '@ionic-native/app-version/ngx';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewshomePageRoutingModule,
    NewsPostsModule,
  ],
  providers:[AppVersion],
  declarations: [NewshomePage]
})
export class NewshomePageModule {}
