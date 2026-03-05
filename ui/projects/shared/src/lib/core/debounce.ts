import { Directive, HostListener, OnDestroy, input, output } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Directive({
  selector: '[appDebounce]',
  standalone: true,
})
export class DebounceDirective implements OnDestroy {
  debounceTime = input<number>(700); // default 700ms
  debounce = output<any>();

  private inputSubject = new Subject<any>();
  private subscription;

  constructor() {
    this.subscription = this.inputSubject.pipe(
      debounceTime(this.debounceTime())
    ).subscribe(value => this.debounce.emit(value));
  }

  @HostListener('input', ['$event'])
  onInput(event: Event) {
    const target = event.target as HTMLInputElement | null;
    if (target && target.value !== undefined) {
      this.inputSubject.next(target.value);
    }
  }

  // Method to manually trigger debounced value (for component outputs)
  public emitValue(value: any): void {
    this.inputSubject.next(value);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
