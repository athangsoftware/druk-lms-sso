import { CommonModule, NgClass } from '@angular/common';
import { Component, input, OnDestroy, OnInit, output, signal, computed, effect } from '@angular/core';
import { FormField } from '@angular/forms/signals';
import { BaseInput } from '../../../../core/base-input/base-input';
import { Autofocus } from '../../../../core/autofocus';
import { getFirstSignalFormError } from '../../../../core/signal-form-errors';

@Component({
  selector: 'ui-search-field',
  imports: [
    FormField,
    CommonModule,
    BaseInput,
    Autofocus,
    NgClass
  ],
  templateUrl: './search-field.html',
  styles: `
    .disabled-placeholder::placeholder {
      color: #a0aec0;
    }
  `
})
export class SearchField implements OnInit, OnDestroy {
  // Inputs
  field = input<any | null>(null); // Field from signal form (optional for backward compatibility)
  label = input<string | null>(null);
  placeholder = input<string>('Search...');
  showErrorSpace = input<boolean>(true);
  debounceTimeMs = input<number>(500);
  width = input<'sm' | 'md' | 'lg' | 'xl' | 'xxl' | '3xl' | 'full' | string>('md');
  size = input<'sm' | 'md' | 'lg'>('md');

  // Outputs
  searchChange = output<string | null>(); // Emits debounced search value (Signal Forms)
  valueChange = output<string | null>(); // Emits debounced value (backward compatibility)

  // Signals
  isFocused = signal(false);
  internalValue = signal<string | null>(null); // For non-Signal Forms usage

  // Computed signals for field state
  fieldState = computed(() => this.field() ? this.field()() : null);
  value = computed(() => this.fieldState() ? this.fieldState()!.value() : this.internalValue());
  isValid = computed(() => this.fieldState() ? this.fieldState()!.valid() : true);
  isTouched = computed(() => this.fieldState() ? this.fieldState()!.touched() : false);
  errors = computed(() => this.fieldState() ? this.fieldState()!.errors() : []);
  isDisabled = computed(() => this.fieldState() ? this.fieldState()!.disabled() : false);

  sizeClasses = computed(() => {
    switch (this.size()) {
      case 'sm':
        return 'h-8 text-sm';
      case 'lg':
        return 'h-12 text-lg';
      default:
        return 'h-10 text-sm';
    }
  });

  hasRequiredValidator = computed(() => {
    const errs = this.errors();
    return errs.some((err: any) => err.kind === 'required');
  });

  hasErrors = computed(() => this.isTouched() && this.errors().length > 0);

  errorMessage = computed(() => {
    return getFirstSignalFormError(this.errors(), this.label());
  });

  // Private properties for debouncing
  private timeoutId: number | null = null;
  private lastEmittedValue: string | null = null;

  constructor() {
    // Set up effect to watch for value changes and emit debounced search
    effect(() => {
      const currentValue = this.value();
      this.handleDebouncedSearch(currentValue);
    });
  }

  ngOnInit(): void {
    this.lastEmittedValue = this.value();
  }

  // For non-Signal Forms usage
  onInput(value: string | null): void {
    if (!this.field()) {
      this.internalValue.set(value);
    }
  }

  private handleDebouncedSearch(value: string | null): void {
    // Clear existing timeout
    if (this.timeoutId !== null) {
      window.clearTimeout(this.timeoutId);
      this.timeoutId = null;
    }

    // Only emit if the value has actually changed from the last emitted value
    if (value === this.lastEmittedValue) {
      return;
    }

    // Set new timeout for debounced emission
    this.timeoutId = window.setTimeout(() => {
      // Double-check the value hasn't changed during the timeout
      if (this.value() === value && value !== this.lastEmittedValue) {
        this.searchChange.emit(value);
        this.valueChange.emit(value); // Backward compatibility
        this.lastEmittedValue = value;
      }
      this.timeoutId = null;
    }, this.debounceTimeMs());
  }

  onFocus(): void {
    this.isFocused.set(true);
  }

  onBlur(): void {
    this.isFocused.set(false);

    // Optionally emit immediately on blur to ensure the latest value is captured
    const currentValue = this.value();
    if (currentValue !== this.lastEmittedValue) {
      if (this.timeoutId !== null) {
        window.clearTimeout(this.timeoutId);
        this.timeoutId = null;
      }
      this.searchChange.emit(currentValue);
      this.valueChange.emit(currentValue); // Backward compatibility
      this.lastEmittedValue = currentValue;
    }
  }

  ngOnDestroy(): void {
    if (this.timeoutId !== null) {
      window.clearTimeout(this.timeoutId);
      this.timeoutId = null;
    }
  }
}