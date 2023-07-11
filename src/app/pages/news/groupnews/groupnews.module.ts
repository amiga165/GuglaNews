import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GroupnewsPageRoutingModule } from './groupnews-routing.module';

import { GroupnewsPage } from './groupnews.page';
import { NewsPostsModule } from '../news-posts/news-posts.module';
import { ComponentsModule } from 'src/app/components/components.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GroupnewsPageRoutingModule,NewsPostsModule,ComponentsModule
  ],
  declarations: [GroupnewsPage]
})
export class GroupnewsPageModule {}
