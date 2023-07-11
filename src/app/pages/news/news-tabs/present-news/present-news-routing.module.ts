import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PresentNewsPage } from './present-news.page';

const routes: Routes = [
  {
    path: '',
    component: PresentNewsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PresentNewsPageRoutingModule {}
