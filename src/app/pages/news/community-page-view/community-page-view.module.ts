import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CommunityPageViewPageRoutingModule } from './community-page-view-routing.module';

import { CommunityPageViewPage } from './community-page-view.page';
import { NewsPostsModule } from '../news-posts/news-posts.module';
import { CommunityPageModule } from '../community/community.module';
import { AddpostPage } from '../community/addpost/addpost.page';
import { UserPage } from '../community/user/user.page';

import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { Base64 } from '@ionic-native/base64/ngx'
import { ImageCropperModule } from 'ngx-image-cropper';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ImageCropperModule,
    CommunityPageViewPageRoutingModule,
    NewsPostsModule
  ],
  
  providers:[ImagePicker,Base64],
  declarations: [CommunityPageViewPage]
})
export class CommunityPageViewPageModule {}
