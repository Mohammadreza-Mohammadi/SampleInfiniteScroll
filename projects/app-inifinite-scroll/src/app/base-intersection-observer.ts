import { Directive, ElementRef, EventEmitter, Input } from '@angular/core';

@Directive({
  selector: '[intersectionObserver]',
})
export class BaseIntersectionObserverDirective {
  @Input() intersecting = new EventEmitter();
  @Input() options: any;
  protected _observer: IntersectionObserver;
  protected _elementToObserve: HTMLElement;
  get _element(): HTMLElement {
    return this.host.nativeElement;
  }

  constructor(private host: ElementRef) {}

  ngOnInit() {
    this._initObserver();
    if (this._elementToObserve) {
      this._elementToObserve = this._element;
    }
  }
  protected _initObserver(): void {
    const options = {
      root: null,
      threshold: 1.0,
      ...this.options,
    };

    this._observer = new IntersectionObserver(([entry]) => {
      entry.isIntersecting && this.intersecting.emit();
    }, options);

    this._observer.observe(this._elementToObserve || this._element);
  }

  ngOnDestroy(): void {
    this._observer.disconnect();
  }
}
