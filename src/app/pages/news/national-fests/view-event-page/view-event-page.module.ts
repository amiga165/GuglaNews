import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewEventPagePageRoutingModule } from './view-event-page-routing.module';

import { ViewEventPagePage } from './view-event-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewEventPagePageRoutingModule
  ],
  declarations: [ViewEventPagePage]
})
export class ViewEventPagePageModule {}
