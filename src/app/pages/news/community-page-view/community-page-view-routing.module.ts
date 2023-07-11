import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CommunityPageViewPage } from './community-page-view.page';

const routes: Routes = [
  {
    path: '',
    component: CommunityPageViewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CommunityPageViewPageRoutingModule {}
