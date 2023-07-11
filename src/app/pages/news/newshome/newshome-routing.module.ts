import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewshomePage } from './newshome.page';

const routes: Routes = [
  {
    path: '',
    component: NewshomePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewshomePageRoutingModule {}
