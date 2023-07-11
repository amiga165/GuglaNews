import { NgModule } from '@angular/core';
import { Routes, RouterModule,PreloadAllModules} from '@angular/router';

import { NewsPage } from './news.page';

const routes: Routes = [
  {
    path: '',
    component: NewsPage,
    children: [
      {
        path: 'allnews',
        loadChildren: () =>
          import('./allnews/allnews.module').then((m) => m.AllnewsPageModule),
          data: {preload: true}
      },
      {
        path: 'allnews/:post_id',
        loadChildren: () =>
          import('./allnews/allnews.module').then((m) => m.AllnewsPageModule),
          data: {preload: true}
      },
      {
        path: 'v/:post_id',
        loadChildren: () =>
          import('./allnews/allnews.module').then((m) => m.AllnewsPageModule),
          data: {preload: true}
      },
      {
        path: 'localnews',
        loadChildren: () =>
          import('./localnews/localnews.module').then(
            (m) => m.LocalnewsPageModule
          ),
          data: {preload: true}
      },
      {
        path: 'groupnews',
        loadChildren: () =>
          import('./groupnews/groupnews.module').then(
            (m) => m.GroupnewsPageModule
          ),
          data: {preload: true}
      },
      {
        path: 'newshome',
        loadChildren: () =>
          import('./newshome/newshome.module').then(
            (m) => m.NewshomePageModule
          ),
          data: {preload: true}
      },
      {
        path: '',
        redirectTo: '/news/allnews',
        pathMatch: 'full',
      }
    ],
  },
  // {
  //   path: 'news-page',
  //   loadChildren: () => import('./news-page/news-page.module').then( m => m.NewsPagePageModule)
  // },

  // {
  //   path: 'news-tabs',
  //   loadChildren: () => import('./news-tabs/news-tabs.module').then( m => m.NewsTabsPageModule)
  // },
  {
    path: 'news-category',
    loadChildren: () =>
      import('./news-category/news-category.module').then(
        (m) => m.NewsCategoryPageModule
      ),
      data: {preload: true}
  },
  {
    path: 'community',
    loadChildren: () =>
      import('./community/community.module').then((m) => m.CommunityPageModule),
      data: {preload: true}
  },
  
  {
    path: 'quiz-page',
    loadChildren: () =>
      import('./quiz-page/quiz-page.module').then((m) => m.QuizPagePageModule),
      data: {preload: true}
  },
  {
    path: 'magazine-page',
    loadChildren: () =>
      import('./magazine-page/magazine-page.module').then(
        (m) => m.MagazinePagePageModule
      ),
      data: {preload: true}
  },
  {
    path: 'userProfile',
    loadChildren: () =>
      import('./user-profile/user-profile.module').then(
        (m) => m.UserProfilePageModule
      ),
      data: {preload: true}
  },
  {
    path: 'live-updates',
    loadChildren: () =>
      import('./live-updates/live-updates.module').then(
        (m) => m.LiveUpdatesPageModule
      ),
      data: {preload: true}
  },
  {
    path: 'view-news',
    loadChildren: () =>
      import('./view-news/view-news.module').then((m) => m.ViewNewsPageModule),
      data: {preload: true}
  },
  {
    path: 'view-news/:post_id',
    loadChildren: () =>
      import('./view-news/view-news.module').then((m) => m.ViewNewsPageModule),
      data: {preload: true}
  },
  {
    path: 'addnews',
    loadChildren: () =>
      import('./addnews/addnews.module').then((m) => m.AddnewsPageModule),
      data: {preload: true}
  },
  {
    path: 'addnews/:isad',
    loadChildren: () =>
      import('./addnews/addnews.module').then((m) => m.AddnewsPageModule),
      data: {preload: true}
  },
  {
    path: 'community-page-view',
    loadChildren: () =>
      import('./community-page-view/community-page-view.module').then(
        (m) => m.CommunityPageViewPageModule
      ),
      data: {preload: true}
  },
  {
    path: 'page-view/:community_id',
    loadChildren: () =>
      import('./community-page-view/community-page-view.module').then(
        (m) => m.CommunityPageViewPageModule
      ),
      data: {preload: true}
  },
  {
    path: 'search',
    loadChildren: () =>
      import('./search/search.module').then((m) => m.SearchPageModule),
      data: {preload: true}
  },
  {
    path: 'contact',
    loadChildren: () => import('./contact/contact.module').then( m => m.ContactPageModule),
    data: {preload: true}
  },
  {
    path: 'news-category-view',
    loadChildren: () => import('./news-category-view/news-category-view.module').then( m => m.NewsCategoryViewPageModule),
    data: {preload: true}
  },
  {
    path: 'national-fests',
    loadChildren: () => import('./national-fests/national-fests.module').then( m => m.NationalFestsPageModule)
  },
  {
    path: 'category-settings',
    loadChildren: () => import('./category-settings/category-settings.module').then( m => m.CategorySettingsPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewsPageRoutingModule {}
