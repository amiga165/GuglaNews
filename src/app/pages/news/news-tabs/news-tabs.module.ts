import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewsTabsPageRoutingModule } from './news-tabs-routing.module';

import { NewsTabsPage } from './news-tabs.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewsTabsPageRoutingModule
  ],
  declarations: [NewsTabsPage]
})
export class NewsTabsPageModule {}
