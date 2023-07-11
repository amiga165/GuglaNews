import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CommunityPage } from './community.page';

const routes: Routes = [
  {
    path: '',
    component: CommunityPage,
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./dashboard/dashboard.module').then(
            (m) => m.DashboardPageModule
          ),
      },
      {
        path: 'addpost',
        loadChildren: () =>
          import('./addpost/addpost.module').then((m) => m.AddpostPageModule),
      },
      {
        path: 'create-post',
        loadChildren: () =>
          import('./create-post/create-post.module').then(
            (m) => m.CreatePostPageModule
          ),
      },
      {
        path: 'user',
        loadChildren: () =>
          import('./user/user.module').then((m) => m.UserPageModule),
      },
    ],
  },
  {
    path: 'profile',
    loadChildren: () =>
      import('./profile/profile.module').then((m) => m.ProfilePageModule),
  },
  {
    path: 'search',
    loadChildren: () =>
      import('../search/search.module').then((m) => m.SearchPageModule),
  },
  {
    path: 'create-post',
    loadChildren: () =>
      import('./create-post/create-post.module').then(
        (m) => m.CreatePostPageModule
      ),
  },
  {
    path: 'community-page',
    loadChildren: () =>
      import('./community-page/community-page.module').then(
        (m) => m.CommunityPagePageModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CommunityPageRoutingModule {}
