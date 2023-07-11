import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { Base64 } from '@ionic-native/base64/ngx';
import { IonicModule } from '@ionic/angular';
import {ComponentsModule} from '../../../../components/components.module'

import { NewsCreatePageRoutingModule } from './news-create-routing.module';

import { NewsCreatePage } from './news-create.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewsCreatePageRoutingModule,
    ComponentsModule
  ],
  providers:[ImagePicker,Base64],
  declarations: [NewsCreatePage]
})
export class NewsCreatePageModule {}
