import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PresentNewsPageRoutingModule } from './present-news-routing.module';

import { PresentNewsPage } from './present-news.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PresentNewsPageRoutingModule
  ],
  declarations: [PresentNewsPage]
})
export class PresentNewsPageModule {}
