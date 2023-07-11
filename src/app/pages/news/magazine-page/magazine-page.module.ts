import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MagazinePagePageRoutingModule } from './magazine-page-routing.module';

import { MagazinePagePage } from './magazine-page.page';
import { NewsPostsModule } from '../news-posts/news-posts.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MagazinePagePageRoutingModule,
    NewsPostsModule
  ],
  declarations: [MagazinePagePage]
})
export class MagazinePagePageModule {}
