import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LiveUpdatesPage } from './live-updates.page';

const routes: Routes = [
  {
    path: '',
    component: LiveUpdatesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LiveUpdatesPageRoutingModule {}
