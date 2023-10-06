import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { PostListComponent } from './post-list/post-list.component';
import { PostItemComponent } from './post-item/post-item.component';
import { PostService } from './post.service';
import { LoadingIndicatorComponent } from './loading-indicator/loading-indicator.component';
import { InfiniteScrollIntersectionDirective } from './infinite-scroll-intersection.directive';

@NgModule({
  declarations: [
    AppComponent,
    PostListComponent,
    PostItemComponent,
    LoadingIndicatorComponent,
    InfiniteScrollIntersectionDirective,
  ],
  imports: [BrowserModule, HttpClientModule],
  providers: [PostService],
  bootstrap: [AppComponent],
})
export class AppModule {}
