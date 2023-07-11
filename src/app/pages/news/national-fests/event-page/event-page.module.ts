import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EventPagePageRoutingModule } from './event-page-routing.module';

import { EventPagePage } from './event-page.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { NewsPostsModule } from '../../news-posts/news-posts.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EventPagePageRoutingModule,
    ComponentsModule,
    NewsPostsModule
  ],
  declarations: [EventPagePage]
})
export class EventPagePageModule {}
