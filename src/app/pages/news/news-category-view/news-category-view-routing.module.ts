import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewsCategoryViewPage } from './news-category-view.page';

const routes: Routes = [
  {
    path: '',
    component: NewsCategoryViewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewsCategoryViewPageRoutingModule {}
