import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NationalFestsPage } from './national-fests.page';

const routes: Routes = [
  {
    path: '',
    component: NationalFestsPage,
  },
  {
    path: 'event-page',
    loadChildren: () => import('./event-page/event-page.module').then( m => m.EventPagePageModule),
    data: {preload: true}
  },
  {
    path: 'view-event-page',
    loadChildren: () => import('./view-event-page/view-event-page.module').then( m => m.ViewEventPagePageModule),
    data: {preload: true}
  },
  {
    path: 'view-event-page/:post_id',
    loadChildren: () => import('./view-event-page/view-event-page.module').then( m => m.ViewEventPagePageModule),
    data: {preload: true}
    
  },
  {
    path: 'view-workshop-page',
    loadChildren: () => import('./view-workshop-page/view-workshop-page.module').then( m => m.ViewWorkshopPagePageModule),
    data: {preload: true}
  },
  {
    path: 'view-workshop-page/:post_id',
    loadChildren: () => import('./view-workshop-page/view-workshop-page.module').then( m => m.ViewWorkshopPagePageModule),
    data: {preload: true}
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NationalFestsPageRoutingModule {}
