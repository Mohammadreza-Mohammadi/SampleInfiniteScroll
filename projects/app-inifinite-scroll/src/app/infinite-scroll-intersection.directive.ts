import {
  Directive,
  ElementRef,
  EventEmitter,
  Output,
} from '@angular/core';

@Directive({
  selector: '[appInfiniteScrollIntersection]',
})
export class InfiniteScrollIntersectionDirective {
  @Output() scrolled = new EventEmitter();

  private _observer: IntersectionObserver;
  private _bottomDom: HTMLElement;
  get _element(): HTMLElement {
    return this.host.nativeElement;
  }

  constructor(private host: ElementRef) {}

  ngOnInit() {
    this._element.style.position = 'relative';
    var anchorDiv = document.createElement('div');
    anchorDiv.className = 'infinite-bottom-anchor';
    this._bottomDom = anchorDiv;
    this._element.appendChild(anchorDiv);
    this._initiateBottomDomObserver();
  }
  private _initiateBottomDomObserver(): void {
    const options = {
      root: this._containerIsScrollable() ? this.host.nativeElement : null,
      threshold: 1.0      
    };

    this._observer = new IntersectionObserver(([entry]) => {
      entry.isIntersecting && this.scrolled.emit();
    }, options);

    this._observer.observe(this._bottomDom);
  }
  private _containerIsScrollable(): boolean {
    const style = window.getComputedStyle(this._element);

    return (
      style.getPropertyValue('overflow') === 'auto' ||
      style.getPropertyValue('overflow-y') === 'scroll'
    );
  }

  ngOnDestroy(): void {
    this._observer.disconnect();
  }
}
