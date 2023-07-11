import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewWorkshopPagePageRoutingModule } from './view-workshop-page-routing.module';

import { ViewWorkshopPagePage } from './view-workshop-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewWorkshopPagePageRoutingModule
  ],
  declarations: [ViewWorkshopPagePage]
})
export class ViewWorkshopPagePageModule {}
