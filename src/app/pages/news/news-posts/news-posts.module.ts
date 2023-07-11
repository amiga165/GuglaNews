import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImagePostComponent } from './image-post/image-post.component';
import { VideoPostComponent } from './video-post/video-post.component';
import { UrlPostComponent } from './url-post/url-post.component';
import { PollPostComponent } from './poll-post/poll-post.component';
import { MagazinePostComponent } from './magazine-post/magazine-post.component';
import { SurveyPostComponent } from './survey-post/survey-post.component';
import { NewsSlideFooterComponent } from './news-slide-footer/news-slide-footer.component';
import { NewsCommentsComponent } from './news-comments/news-comments.component';
import { FormsModule } from '@angular/forms';
import { CommunityFollowButtonComponent } from './community-follow-button/community-follow-button.component';
import { QuizPostComponent } from './quiz-post/quiz-post.component';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { Base64 } from '@ionic-native/base64/ngx';
import { IonicModule } from '@ionic/angular';
import { CreateCommunityComponent } from '../../../components/create-community/create-community.component';
import { ImageCropperModule } from 'ngx-image-cropper';
import { ComponentsModule } from 'src/app/components/components.module';
import { LazyLoadImageModule, LAZYLOAD_IMAGE_HOOKS, ScrollHooks } from 'ng-lazyload-image';

import { SwiperModule } from 'swiper/angular'
import { ImageLazyLoadDirective } from 'src/app/image-lazy-load.directive';
import { DetailsPostComponent } from './details-post/details-post.component';
import { NewsReportComponent } from './news-report/news-report.component';
import { NewsCommentsReportComponent } from './news-comments-report/news-comments-report.component';
@NgModule({
  declarations: [ImagePostComponent, 
    VideoPostComponent, 
    UrlPostComponent,
    QuizPostComponent,
    SurveyPostComponent,
    MagazinePostComponent,
    PollPostComponent,
    NewsSlideFooterComponent,
    NewsCommentsComponent,
    CommunityFollowButtonComponent,
    CreateCommunityComponent,
    ImageLazyLoadDirective,
    DetailsPostComponent,
    NewsReportComponent,
    NewsCommentsReportComponent
  ],
  imports: [
    CommonModule,FormsModule,IonicModule,ImageCropperModule,ComponentsModule,LazyLoadImageModule,SwiperModule
  ],
  providers:[ImagePicker,Base64,{ provide: LAZYLOAD_IMAGE_HOOKS, useClass: ScrollHooks }],
  exports: [ImagePostComponent, 
    VideoPostComponent, 
    NewsCommentsComponent,
    UrlPostComponent,
    PollPostComponent,
    QuizPostComponent,
    MagazinePostComponent,
    SurveyPostComponent,
    NewsSlideFooterComponent,
    CommunityFollowButtonComponent,
    CreateCommunityComponent,
    ImageLazyLoadDirective,
    DetailsPostComponent,
    NewsReportComponent,
    NewsCommentsReportComponent
  ],
})
export class NewsPostsModule { }
