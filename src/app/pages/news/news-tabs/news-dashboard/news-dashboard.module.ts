import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewsDashboardPageRoutingModule } from './news-dashboard-routing.module';

import { NewsDashboardPage } from './news-dashboard.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewsDashboardPageRoutingModule
  ],
  declarations: [NewsDashboardPage]
})
export class NewsDashboardPageModule {}
