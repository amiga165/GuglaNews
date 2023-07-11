import { SignupComponent } from './components/signup/signup.component';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { BaseLayoutComponent } from './lay-outs/base-layout/base-layout.component';
import { GaurdGuard } from '../app/auth/gaurd.guard';
import { LoginGuard } from '../app/auth/login/login.guard';

// import { CouponsPageRoutingModule } from './pages/coupons/coupons-routing.module';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'onboarding',
    pathMatch: 'full',
  },

  {
    path: 'app',
    component: BaseLayoutComponent,
  },
  {
      path: 'welcome',
    loadChildren: () =>
      import('./pages/welcome/welcome.module').then((m) => m.WelcomePageModule),
  },
    {
    path: 'signup',
    component: SignupComponent,
    canLoad: [LoginGuard],
  },
  {
      path: 'news',
    loadChildren: () =>
      import('./pages/news/news.module').then((m) => m.NewsPageModule),
      // data: {preload: true}
  },
    {
    path: 'otpverify',
    loadChildren: () =>
      import('./pages/otpverify/otpverify.module').then(
        (m) => m.OtpverifyPageModule
      ),
  },
  {
    path: 'onboarding',
    loadChildren: () => import('./pages/onboarding/onboarding.module').then( m => m.OnboardingPageModule),

  },
  {
    path: 'national-fests',
    loadChildren: () => import('./pages/news/national-fests/national-fests.module').then(m => m.NationalFestsPageModule),
  },




  // {
  //   path: 'shopping',
  //   loadChildren: () =>
  //     import('./pages/local/local.module').then((m) => m.LocalPageModule),
  // },

  // {
  //   path: 'services',
  //   loadChildren: () =>
  //     import('./pages/service/service.module').then((m) => m.ServicePageModule),
  // },

  // {
  //   path: 'product',
  //   loadChildren: () =>
  //     import('./pages/product/product.module').then((m) => m.ProductPageModule),
  // },

  // {
  //   path: 'myorders',
  //   loadChildren: () =>
  //     import('./pages/myorders/myorders.module').then(
  //       (m) => m.MyordersPageModule
  //     ),
  // },

  // {
  //   path: 'manager',
  //   loadChildren: () =>
  //     import('./pages/manager/manager.module').then((m) => m.ManagerPageModule),
  // },
  // {
  //   path: 'shop-owner',
  //   loadChildren: () =>
  //     import('./pages/shopowner/shopowner.module').then(
  //       (m) => m.ShopownerPageModule
  //     ),
  // },
  // {
  //   path: 'dboy',
  //   loadChildren: () =>
  //     import('./pages/dboy/dboy.module').then((m) => m.DboyPageModule),
  // },
  // {
  //   path: 'SellerPage',
  //   loadChildren: () =>
  //     import('./pages/seller/seller.module').then((m) => m.SellerPageModule),
  // },
  // {
  //   path: 'service-owner',
  //   loadChildren: () =>
  //     import('./pages/serviceowner/serviceowner.module').then(
  //       (m) => m.ServiceownerPageModule
  //     ),
  // },
  // // {
  // //   path: 'referals',
  // //   loadChildren: () =>
  // //     import('./pages/referals/referals.module').then(
  // //       (m) => m.ReferalsPageModule
  // //     ),
  // // },
  // {
  //   path: 'news',
  //   loadChildren: () =>
  //     import('./pages/news/news.module').then((m) => m.NewsPageModule),
  //     // data: {preload: true}
  // },
  //  {
  //   path: 'news/:post_id',
  //   loadChildren: () =>
  //     import('./pages/news/news.module').then((m) => m.NewsPageModule),
     
  // },
  // // {
  // //   path: 'notifications',
  // //   loadChildren: () =>
  // //     import('./pages/notifications/notifications.module').then(
  // //       (m) => m.NotificationsPageModule
  // //     ),
  // // },
  // // {
  // //   path: 'addresses',
  // //   loadChildren: () =>
  // //     import('./pages/addresses/addresses.module').then(
  // //       (m) => m.AddressesPageModule
  // //     ),
  // // },
  // // {
  // //   path: 'wishlist',
  // //   loadChildren: () =>
  // //     import('./pages/wishlist/wishlist.module').then(
  // //       (m) => m.WishlistPageModule
  // //     ),
  // // },
  // // {
  // //   path: 'cart',
  // //   loadChildren: () =>
  // //     import('./pages/cart/cart.module').then((m) => m.CartPageModule),
  // // },
  // // {
  // //   path: 'wallet',
  // //   loadChildren: () =>
  // //     import('./pages/wallet/wallet.module').then((m) => m.WalletPageModule),
  // // },
  // // {
  // //   path: 'profile',
  // //   loadChildren: () =>
  // //     import('./pages/profile/profile.module').then((m) => m.ProfilePageModule),
  // // },
  // {
  //   path: 'dailyservices',
  //   loadChildren: () =>
  //     import('./pages/dailyservices/dailyservices.module').then(
  //       (m) => m.DailyservicesPageModule
  //     ),
  // },
  // {
  //   path: 'medicines',
  //   loadChildren: () =>
  //     import('./pages/medicines/medicines.module').then(
  //       (m) => m.MedicinesPageModule
  //     ),
  // },
  // {
  //   path: 'account',
  //   loadChildren: () =>
  //     import('./pages/account/account.module').then((m) => m.AccountPageModule),
  // },
  // {
  //   path: 'sellproducts',
  //   loadChildren: () =>
  //     import('./pages/sellproducts/sellproducts.module').then(
  //       (m) => m.SellproductsPageModule
  //     ),
  // },
  // {
  //   path: 'mycart',
  //   loadChildren: () =>
  //     import('./pages/mycart/mycart.module').then((m) => m.MycartPageModule),
  // },

  // {
  //   path: 'signup',
  //   component: SignupComponent,
  //   canLoad: [LoginGuard],

  // },

  // {
  //   path: 'otpverify',
  //   loadChildren: () =>
  //     import('./pages/otpverify/otpverify.module').then(
  //       (m) => m.OtpverifyPageModule
  //     ),
  // },
  // {
  //   path: 'dboy',
  //   loadChildren: () =>
  //     import('./pages/dboy/dboy.module').then((m) => m.DboyPageModule),
  // },
  // {
  //   path: 'shopowner',
  //   loadChildren: () =>
  //     import('./pages/shopowner/shopowner.module').then(
  //       (m) => m.ShopownerPageModule
  //     ),
  // },
  // // {
  // //   path: 'managerpage',
  // //   loadChildren: () => import('./pages/managerpage/managerpage.module').then( m => m.ManagerpagePageModule)
  // // },
  // {
  //   path: 'serviceowner',
  //   loadChildren: () =>
  //     import('./pages/serviceowner/serviceowner.module').then(
  //       (m) => m.ServiceownerPageModule
  //     ),
  // },
  // {
  //   path: 'checkout',
  //   loadChildren: () =>
  //     import('./pages/checkout/checkout.module').then(
  //       (m) => m.CheckoutPageModule
  //     ),
  // },
  // {
  //   path: 'food',
  //   loadChildren: () =>
  //     import('./pages/food/food.module').then((m) => m.FoodPageModule),
  // },
  // {
  //   path: 'edit-profile',
  //   loadChildren: () =>
  //     import('./pages/edit-profile/edit-profile.module').then(
  //       (m) => m.EditProfilePageModule
  //     ),
  // },
  // {
  //   path: 'image-order',
  //   loadChildren: () =>
  //     import('./pages/image-order/image-order.module').then(
  //       (m) => m.ImageOrderPageModule
  //     ),
  // },
  // {
  //   path: 'gmaps-tracking',
  //   loadChildren: () =>
  //     import('./pages/gmaps-tracking/gmaps-tracking.module').then(
  //       (m) => m.GmapsTrackingPageModule
  //     ),
  // },
  // {
  //   path: 'orderinfo',
  //   loadChildren: () =>
  //     import('./pages/orderinfo/orderinfo.module').then(
  //       (m) => m.OrderinfoPageModule
  //     ),
  // },
  // // {
  // //   path: 'orderslist',
  // //   loadChildren: () => import('./pages/orderslist/orderslist.module').then( m => m.OrderslistPageModule)
  // // },
  // // {
  // //   path: 'search',
  // //   loadChildren: () => import('./pages/search/search.module').then( m => m.SearchPageModule)
  // // },
  // // {
  // //   path: 'track',
  // //   loadChildren: () => import('./pages/track/track.module').then( m => m.TrackPageModule)
  // // },
  // // {
  // //   path: 'subcategory',
  // //   loadChildren: () => import('./pages/subcategory/subcategory.module').then( m => m.SubcategoryPageModule)
  // // },
  // {
  //   path: 'theme',
  //   loadChildren: () =>
  //     import('./pages/theme/theme.module').then((m) => m.ThemePageModule),
  // },
  // {
  //   path: 'donation',
  //   loadChildren: () =>
  //     import('./pages/donation/donation.module').then(
  //       (m) => m.DonationPageModule
  //     ),
  // },
  // // {
  // //   path: 'add-new-time',
  // //   loadChildren: () => import('./pages/add-new-time/add-new-time.module').then( m => m.AddNewTimePageModule)
  // // },
  // {
  //   path: 'food-menu',
  //   loadChildren: () =>
  //     import('./pages/food-menu/food-menu.module').then(
  //       (m) => m.FoodMenuPageModule
  //     ),
  // },
  // {
  //   path: 'order-done',
  //   loadChildren: () =>
  //     import('./pages/order-done/order-done.module').then(
  //       (m) => m.OrderDonePageModule
  //     ),
  // },
  // {
  //   path: 'shop-category-edit',
  //   loadChildren: () =>
  //     import('./pages/shop-category-edit/shop-category-edit.module').then(
  //       (m) => m.ShopCategoryEditPageModule
  //     ),
  // },
  // {
  //   path: 'shop-item-edit',
  //   loadChildren: () =>
  //     import('./pages/shop-item-edit/shop-item-edit.module').then(
  //       (m) => m.ShopItemEditPageModule
  //     ),
  // },
  
  // // {
  // //   path: 'shop-itemimage-edit',
  // //   loadChildren: () =>
  // //     import('./pages/shop-itemimage-edit/shop-itemimage-edit.module').then(
  // //       (m) => m.ShopItemimageEditPageModule
  // //     ),
  // // },
  // {
  //   path: 'users',
  //   loadChildren: () =>
  //     import('./pages/users/users.module').then((m) => m.UsersPageModule),
  //   canLoad: [GaurdGuard],
  // },
  // // {
  // //   path: 'api-service',
  // //   loadChildren: () => import('./pages/api-service/api-service.module').then( m => m.ApiServicePageModule)
  // // },
  // {
  //   path: 'product-buy',
  //   loadChildren: () =>
  //     import('./pages/product-buy/product-buy.module').then(
  //       (m) => m.ProductBuyPageModule
  //     ),
  // },
  // {
  //   path: 'product-sell',
  //   loadChildren: () =>
  //     import('./pages/product-sell/product-sell.module').then(
  //       (m) => m.ProductSellPageModule
  //     ),
  // },
  // // {
  // //   path: 'manageshop',
  // //   loadChildren: () => import('./pages/manageshop/manageshop.module').then( m => m.ManageshopPageModule)
  // // },
  // // {
  // //   path: 'manageshop-item',
  // //   loadChildren: () => import('./pages/manageshop-item/manageshop-item.module').then( m => m.ManageshopItemPageModule)
  // // },
  // {
  //   path: 'aboutservice',
  //   loadChildren: () =>
  //     import('./pages/aboutservice/aboutservice.module').then(
  //       (m) => m.AboutservicePageModule
  //     ),
  // },
  // {
  //   path: 'any',
  //   loadChildren: () =>
  //     import('./pages/any/any.module').then((m) => m.AnyPageModule),
  // },
  // {
  //   path: 'add-new-item',
  //   loadChildren: () =>
  //     import('./pages/add-new-item/add-new-item.module').then(
  //       (m) => m.AddNewItemPageModule
  //     ),
  // },
  // {
  //   path: 'order-tracking',
  //   loadChildren: () =>
  //     import('./pages/order-tracking/order-tracking.module').then(
  //       (m) => m.OrderTrackingPageModule
  //     ),
  // },
  // {
    
  //   path: 'welcome',
  //   loadChildren: () =>
  //     import('./pages/welcome/welcome.module').then((m) => m.WelcomePageModule),
  // },
  // {
  //   path: 'product-buy-confirm',
  //   loadChildren: () =>
  //     import('./pages/product-buy-confirm/product-buy-confirm.module').then(
  //       (m) => m.ProductBuyConfirmPageModule
  //     ),
  // },
  // {
  //   path: 'seller',
  //   loadChildren: () =>
  //     import('./pages/seller/seller.module').then((m) => m.SellerPageModule),
  // },
  // {
  //   path: 'shopregisteration',
  //   loadChildren: () =>
  //     import('./pages/shopregisteration/shopregisteration.module').then(
  //       (m) => m.ShopregisterationPageModule
  //     ),
  // },
  // {
  //   path: 'shop-item-edit',
  //   loadChildren: () =>
  //     import('./pages/shop-item-edit/shop-item-edit.module').then(
  //       (m) => m.ShopItemEditPageModule
  //     ),
  // },
  // // {
  // //   path: 'shop-itemimage-edit',
  // //   loadChildren: () =>
  // //     import('./pages/shop-itemimage-edit/shop-itemimage-edit.module').then(
  // //       (m) => m.ShopItemimageEditPageModule
  // //     ),
  // // },
  // {
  //   path: 'users',
  //   loadChildren: () =>
  //     import('./pages/users/users.module').then((m) => m.UsersPageModule),
  //   canLoad: [GaurdGuard],
  // },
  // // {
  // //   path: 'api-service',
  // //   loadChildren: () => import('./pages/api-service/api-service.module').then( m => m.ApiServicePageModule)
  // // },
  // {
  //   path: 'product-buy',
  //   loadChildren: () =>
  //     import('./pages/product-buy/product-buy.module').then(
  //       (m) => m.ProductBuyPageModule
  //     ),
  // },
  // {
  //   path: 'product-sell',
  //   loadChildren: () =>
  //     import('./pages/product-sell/product-sell.module').then(
  //       (m) => m.ProductSellPageModule
  //     ),
  // },
  // // {
  // //   path: 'manageshop',
  // //   loadChildren: () => import('./pages/manageshop/manageshop.module').then( m => m.ManageshopPageModule)
  // // },
  // // {
  // //   path: 'manageshop-item',
  // //   loadChildren: () => import('./pages/manageshop-item/manageshop-item.module').then( m => m.ManageshopItemPageModule)
  // // },
  // {
  //   path: 'aboutservice',
  //   loadChildren: () =>
  //     import('./pages/aboutservice/aboutservice.module').then(
  //       (m) => m.AboutservicePageModule
  //     ),
  // },
  // {
  //   path: 'any',
  //   loadChildren: () =>
  //     import('./pages/any/any.module').then((m) => m.AnyPageModule),
  // },
  // {
  //   path: 'add-new-item',
  //   loadChildren: () =>
  //     import('./pages/add-new-item/add-new-item.module').then(
  //       (m) => m.AddNewItemPageModule
  //     ),
  // },
  // {
  //   path: 'order-tracking',
  //   loadChildren: () =>
  //     import('./pages/order-tracking/order-tracking.module').then(
  //       (m) => m.OrderTrackingPageModule
  //     ),
  // },
  // {
  //   path: 'welcome',
  //   loadChildren: () =>
  //     import('./pages/welcome/welcome.module').then((m) => m.WelcomePageModule),
  // },
  // {
  //   path: 'product-buy-confirm',
  //   loadChildren: () =>
  //     import('./pages/product-buy-confirm/product-buy-confirm.module').then(
  //       (m) => m.ProductBuyConfirmPageModule
  //     ),
  // },
  // {
  //   path: 'add-team',
  //   loadChildren: () =>
  //     import('./pages/add-team/add-team.module').then(
  //       (m) => m.AddTeamPageModule
  //     ),
  // }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
    // CouponsPageRoutingModule,
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
