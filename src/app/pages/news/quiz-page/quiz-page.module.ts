import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QuizPagePageRoutingModule } from './quiz-page-routing.module';

import { QuizPagePage } from './quiz-page.page';
import { NewsPostsModule } from '../news-posts/news-posts.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QuizPagePageRoutingModule,NewsPostsModule
  ],
  declarations: [QuizPagePage]
})
export class QuizPagePageModule {}
