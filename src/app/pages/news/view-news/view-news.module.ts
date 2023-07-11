import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewNewsPageRoutingModule } from './view-news-routing.module';

import { ViewNewsPage } from './view-news.page';
import { NewsPostsModule } from '../news-posts/news-posts.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewNewsPageRoutingModule,
    NewsPostsModule
  ],
  declarations: [ViewNewsPage]
})
export class ViewNewsPageModule {}
