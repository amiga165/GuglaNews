import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NationalFestsPageRoutingModule } from './national-fests-routing.module';

import { NationalFestsPage } from './national-fests.page';
import { NewsPostsModule } from '../news-posts/news-posts.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NationalFestsPageRoutingModule,
    NewsPostsModule
  ],
  declarations: [NationalFestsPage]
})
export class NationalFestsPageModule {}
