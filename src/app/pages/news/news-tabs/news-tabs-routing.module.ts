import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewsTabsPage } from './news-tabs.page';

const routes: Routes = [
  {
    path: '',
    component: NewsTabsPage,

    children: [
      {
        path: 'news-create',
        loadChildren: () =>
          import('./news-create/news-create.module').then(
            (m) => m.NewsCreatePageModule
          ),
      },
      {
        path: 'news-dashboard',
        loadChildren: () =>
          import('./news-dashboard/news-dashboard.module').then(
            (m) => m.NewsDashboardPageModule
          ),
      },
      {
        path: 'present-news',
        loadChildren: () =>
          import('./present-news/present-news.module').then(
            (m) => m.PresentNewsPageModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewsTabsPageRoutingModule {}
