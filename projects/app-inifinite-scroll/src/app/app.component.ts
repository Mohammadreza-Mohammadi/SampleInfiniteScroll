import { Component, OnInit } from '@angular/core';
import { PostService } from './post.service';
import { Observable } from 'rxjs';
import { Post } from './models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'AppInifiniteScroll';
  posts$: Observable<Post[]>;
  isLoading$: Observable<boolean>;
  /**
   *
   */
  constructor(private _postService: PostService) {}
  ngOnInit(): void {
    this.posts$ = this._postService.dataSource$;
    this.isLoading$ = this._postService.isLoading$; 
    this._postService.reload();   
  }
  onScroll(): void {
    this._postService.loadMore();
  }
}
