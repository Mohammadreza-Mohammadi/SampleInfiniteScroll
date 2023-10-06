import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  combineLatest,
  delay,
  filter,
  map,
  scan,
  switchMap,
  tap,
} from 'rxjs';
import { Post } from './models';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private _pageNumber$ = new BehaviorSubject(0);
  private _pageSize$ = new BehaviorSubject(3);
  public dataSource$: Observable<Post[]>;
  public isLoading$ = new BehaviorSubject(false);
  public hasMore$ = new BehaviorSubject(true);
  public totalCount$ = new BehaviorSubject(0);
  public totalPageCount$ = new BehaviorSubject(0);
  constructor(private _httpClient: HttpClient) {
    this.dataSource$ = combineLatest([this._pageNumber$, this._pageSize$]).pipe(
      map(([pageNumber, pageSize]) => [
        pageNumber,
        pageSize,
        pageSize * pageNumber,
      ]),
      filter(
        ([pageNumber]) =>
          pageNumber == 1 || pageNumber < this.totalPageCount$.getValue()
      ),
      tap(([pageNumber]) => console.log('load data..', pageNumber)),
      tap(() => this.isLoading$.next(true)),
      delay(2000),
      switchMap(([pageNumber, pageSize, loadedCount]) =>
        this._httpClient.get<Post[]>('/assets/post.json').pipe(
          map((data) => {
            return {
              pageNumber,
              data: data.slice(
                (pageNumber - 1) * pageSize,
                pageNumber * pageSize
              ),
              totalElement: data.length,
              pageTotal: Math.ceil(data.length / pageSize + 1),
              pageSize,
              loadedCount,
            };
          })
        )
      ),
      tap(({ pageNumber, totalElement, pageTotal }) => {
        this.totalPageCount$.next(pageTotal);
        this.hasMore$.next(pageNumber < pageTotal);
        this.totalCount$.next(totalElement);
      }),
      scan((acc: Post[], data) => {
        return data.pageNumber == 1 ? data.data : [...acc, ...data.data];
      }, []),
      tap(() => this.isLoading$.next(false))
    );
  }
  reload() {
    this._pageNumber$.next(1);
  }

  loadMore() {
    if (this.isLoading$.getValue()) {
      return;
    }
    this._pageNumber$.next(this._pageNumber$.getValue() + 1);
  }
}
