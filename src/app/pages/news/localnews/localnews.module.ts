import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LocalnewsPageRoutingModule } from './localnews-routing.module';

import { LocalnewsPage } from './localnews.page';
import { NewsPostsModule } from '../news-posts/news-posts.module';
import { NoDataFoundComponent } from 'src/app/components/no-data-found/no-data-found.component';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LocalnewsPageRoutingModule,NewsPostsModule,
    ComponentsModule
  ],
  declarations: [LocalnewsPage]
})
export class LocalnewsPageModule {}
