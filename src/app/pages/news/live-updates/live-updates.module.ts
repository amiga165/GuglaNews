import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LiveUpdatesPageRoutingModule } from './live-updates-routing.module';

import { LiveUpdatesPage } from './live-updates.page';
import { NewsPostsModule } from '../news-posts/news-posts.module';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LiveUpdatesPageRoutingModule,
    NewsPostsModule,
    ComponentsModule
  ],
  declarations: [LiveUpdatesPage]
})
export class LiveUpdatesPageModule {}
