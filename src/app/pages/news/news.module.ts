import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import {ComponentsModule} from '../../components/components.module'
import { NewsPageRoutingModule } from './news-routing.module';

import { NewsPage } from './news.page';
import { NewsPostsModule } from './news-posts/news-posts.module';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewsPageRoutingModule,
    ComponentsModule,
    NewsPostsModule
  ],
  declarations: [NewsPage]
})
export class NewsPageModule {}
