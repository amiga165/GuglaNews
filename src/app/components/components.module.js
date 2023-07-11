var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from "@angular/core";
import { IonicPageModule, IonicModule } from "ionic-angular";
import { MatSelectModule } from "@angular/material";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { Ionic2RatingModule } from "ionic2-rating";
import { FoodItemComponent } from "./food-item/food-item";
import { ShoppingCategoriesComponent } from "./shopping-categories/shopping-categories";
import { ServicesComponent } from "./services/services";
import { LocalProductsComponent } from "./local-products/local-products";
import { AddressPageComponent } from "./address-page/address-page";
import { CartPageComponent } from "./cart-page/cart-page";
import { PaymentPageComponent } from "./payment-page/payment-page";
import { CartButtonComponent } from "./cart-button/cart-button";
import { ServiceRegComponent } from "./service-reg/service-reg";
import { AnyItemComponent } from "./any-item/any-item";
import { ServiceCardComponent } from "./service-card/service-card";
import { OrderCardComponent } from "./order-card/order-card";
import { OrderItemComponent } from "./order-item/order-item";
import { ShopOrderCardComponent } from "./shop-order-card/shop-order-card";
import { AnyOrderItemComponent } from "./any-order-item/any-order-item";
import { ImageOrderCardComponent } from "./image-order-card/image-order-card";
import { ServiceRegCardComponent } from './service-reg-card/service-reg-card';
import { NoDataFoundComponent } from './no-data-found/no-data-found.component';
import { RewardCardComponent } from "./reward-card/reward-card";
var ComponentsModule = /** @class */ (function () {
    function ComponentsModule() {
    }
    ComponentsModule = __decorate([
        NgModule({
            declarations: [
                FoodItemComponent,
                ShoppingCategoriesComponent,
                ServicesComponent,
                LocalProductsComponent,
                AddressPageComponent,
                CartPageComponent,
                PaymentPageComponent,
                CartButtonComponent,
                ServiceRegComponent,
                AnyItemComponent,
                ServiceCardComponent,
                OrderCardComponent,
                OrderItemComponent,
                OrderCardComponent,
                ShopOrderCardComponent,
                AnyOrderItemComponent,
                ImageOrderCardComponent,
                ServiceRegCardComponent,
                RewardCardComponent,
                NoDataFoundComponent
            ],
            imports: [
                IonicPageModule,
                IonicModule,
                MatSelectModule,
                MatFormFieldModule,
                MatInputModule,
                Ionic2RatingModule,
            ],
            exports: [
                FoodItemComponent,
                ShoppingCategoriesComponent,
                ServicesComponent,
                LocalProductsComponent,
                AddressPageComponent,
                CartPageComponent,
                PaymentPageComponent,
                CartButtonComponent,
                ServiceRegComponent,
                AnyItemComponent,
                ServiceCardComponent,
                OrderCardComponent,
                OrderItemComponent,
                OrderCardComponent,
                ShopOrderCardComponent,
                AnyOrderItemComponent,
                ImageOrderCardComponent,
                ImageOrderCardComponent,
                ServiceRegCardComponent,
                RewardCardComponent,
                NoDataFoundComponent
            ],
        })
    ], ComponentsModule);
    return ComponentsModule;
}());
export { ComponentsModule };
//# sourceMappingURL=components.module.js.map