import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewsCategoryViewPageRoutingModule } from './news-category-view-routing.module';

import { NewsCategoryViewPage } from './news-category-view.page';
import { NewsPostsModule } from '../news-posts/news-posts.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewsCategoryViewPageRoutingModule,
    NewsPostsModule
  ],
  declarations: [NewsCategoryViewPage]
})
export class NewsCategoryViewPageModule {}
