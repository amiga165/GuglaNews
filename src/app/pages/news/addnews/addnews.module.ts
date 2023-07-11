import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { Base64 } from '@ionic-native/base64/ngx';
import { IonicModule } from '@ionic/angular';
import {ComponentsModule} from '../../../components/components.module'

import { AddnewsPageRoutingModule } from './addnews-routing.module';

import { AddnewsPage } from './addnews.page';
import { NewsPostsModule } from '../news-posts/news-posts.module';
import { ImageCropperModule } from 'ngx-image-cropper';

import { MatStepperModule } from '@angular/material/stepper';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ImageCropperModule,
    IonicModule,
    AddnewsPageRoutingModule,
    NewsPostsModule,
    MatStepperModule,
    ComponentsModule
  ],
  providers:[ImagePicker,Base64],
  declarations: [AddnewsPage]
})
export class AddnewsPageModule {}
