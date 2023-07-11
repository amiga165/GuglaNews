import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GroupnewsPage } from './groupnews.page';

const routes: Routes = [
  {
    path: '',
    component: GroupnewsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GroupnewsPageRoutingModule {}
