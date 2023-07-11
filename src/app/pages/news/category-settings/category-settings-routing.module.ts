import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CategorySettingsPage } from './category-settings.page';

const routes: Routes = [
  {
    path: '',
    component: CategorySettingsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CategorySettingsPageRoutingModule {}
