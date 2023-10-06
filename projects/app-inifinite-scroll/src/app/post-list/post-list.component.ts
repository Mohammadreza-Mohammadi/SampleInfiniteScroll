import { Component, Input } from '@angular/core';
import { Post } from '../models';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss'],
})
export class PostListComponent {
  @Input() listOfPost: Post[]=[];

  trackByTitle(index:number, post:Post){
    return post.title;
  }
}
