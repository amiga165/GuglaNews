import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MagazinePagePage } from './magazine-page.page';

const routes: Routes = [
  {
    path: '',
    component: MagazinePagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MagazinePagePageRoutingModule {}
