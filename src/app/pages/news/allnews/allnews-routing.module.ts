import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AllnewsPage } from './allnews.page';

const routes: Routes = [
  {
    path: '',
    component: AllnewsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AllnewsPageRoutingModule {}
