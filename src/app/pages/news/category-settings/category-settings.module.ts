import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CategorySettingsPageRoutingModule } from './category-settings-routing.module';

import { CategorySettingsPage } from './category-settings.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CategorySettingsPageRoutingModule
  ],
  declarations: [CategorySettingsPage]
})
export class CategorySettingsPageModule {}
