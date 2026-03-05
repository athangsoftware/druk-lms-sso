import { CommonModule, NgClass } from '@angular/common';
import { Component, computed, input, output, signal } from '@angular/core';
import { FormField } from '@angular/forms/signals';
import { BaseInput } from '../../../../core/base-input/base-input';
import { AppSvgIcon } from '../../../misc/app-svg-icon/app-svg-icon';
import { Autofocus } from "../../../../core/autofocus";
import { getFirstSignalFormError } from '../../../../core/signal-form-errors';

@Component({
  selector: 'ui-text-field',
  imports: [
    FormField,
    AppSvgIcon,
    CommonModule,
    BaseInput,
    Autofocus,
    NgClass
  ],
  host: {
    'class': 'ui-field'
  },
  styles: `
  .hide-time-picker::-webkit-calendar-picker-indicator {
    display: none;
    -webkit-appearance: none;
  }
  .hide-time-picker::-webkit-inner-spin-button {
    display: none;
    -webkit-appearance: none;
  }
  .hide-time-picker::-moz-focus-inner {
    border: 0;
  }
  `,
  templateUrl: './text-field.html',
})
export class TextField {
  // Inputs
  field = input.required<any>(); // Field from signal form
  type = input<'text' | 'email' | 'textarea' | 'tel' | 'url' | 'time'>('text');
  iconSrc = input<string | null>(null);
  actionIcon = input<string | null>(null);
  label = input<string | null>(null);
  width = input<'sm' | 'md' | 'lg' | 'xl' | 'xxl' | '3xl' | 'full' | string>('md');
  size = input<'sm' | 'md' | 'lg'>('md');
  placeholder = input<string>('');
  showErrorSpace = input<boolean>(true);
  mask = input<string | null>(null);
  isFocus = input<boolean>(false);

  // Extra inputs for specific types
  pattern = input<string | null>(null);
  minlength = input<number | null>(null);
  maxlength = input<number | null>(null);
  min = input<string | null>(null);
  max = input<string | null>(null);
  step = input<number | null>(null);

  // Outputs
  actionClick = output<void>();

  // Signals
  isFocused = signal(false);

  // Computed signals for field state
  fieldState = computed(() => this.field()());
  value = computed(() => this.fieldState().value());
  isValid = computed(() => this.fieldState().valid());
  isTouched = computed(() => this.fieldState().touched());
  errors = computed(() => this.fieldState().errors());
  isDisabled = computed(() => this.fieldState().disabled());

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

  onActionClick(): void {
    this.actionClick.emit();
  }

  onFocus(): void {
    this.isFocused.set(true);
  }

  onBlur(): void {
    this.isFocused.set(false);
  }
}