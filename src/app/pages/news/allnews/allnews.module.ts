import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AllnewsPageRoutingModule } from './allnews-routing.module';

import { AllnewsPage } from './allnews.page';
import { NewsPostsModule } from '../news-posts/news-posts.module';
import { SwiperModule } from 'swiper/angular';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AllnewsPageRoutingModule,NewsPostsModule,
    SwiperModule
  ],
  declarations: [AllnewsPage]
})
export class AllnewsPageModule {}
