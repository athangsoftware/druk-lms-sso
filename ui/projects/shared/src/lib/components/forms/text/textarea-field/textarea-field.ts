import { CommonModule, NgClass } from '@angular/common';
import { Component, computed, input, output, linkedSignal } from '@angular/core';
import { BaseInput } from '../../../../core/base-input/base-input';
import { AppSvgIcon } from '../../../misc/app-svg-icon/app-svg-icon';
import { getFirstSignalFormError } from '../../../../core/signal-form-errors';

@Component({
  selector: 'ui-textarea-field',
  standalone: true,
  imports: [
    AppSvgIcon,
    CommonModule,
    BaseInput,
    NgClass
  ],
  templateUrl: './textarea-field.html',
})
export class TextareaField {
  // Signal Forms
  field = input.required<any>();

  // Inputs
  iconSrc = input<string | null>(null);
  actionIcon = input<string | null>(null);
  label = input<string | null>(null);
  width = input<'sm' | 'md' | 'lg' | 'xl' | 'xxl' | '3xl' | 'full' | string>('md');
  size = input<'sm' | 'md' | 'lg'>('md');
  placeholder = input<string>('');
  showErrorSpace = input<boolean>(true);
  minlength = input<number | null>(null);
  maxlength = input<number | null>(null);
  lines = input<string | null>('4'); // New input for textarea rows

  // Outputs
  actionClick = output<void>();

  // Signals
  isFocused = linkedSignal(() => false);

  // Computed signals for field state
  fieldState = computed(() => this.field()());
  value = computed(() => this.fieldState().value() || '');
  isValid = computed(() => this.fieldState().valid());
  isTouched = computed(() => this.fieldState().touched());
  errors = computed(() => this.fieldState().errors());
  isDisabled = computed(() => this.fieldState().disabled());

  hasRequiredValidator = computed(() => {
    const errs = this.errors();
    return errs.some((err: any) => err.kind === 'required');
  });

  hasErrors = computed(() => this.isTouched() && this.errors().length > 0);

  errorMessage = computed(() => {
    return getFirstSignalFormError(this.errors(), this.label());
  });

  // Linked signal that automatically updates when value changes
  textValue = linkedSignal(() => this.value());

  currentLine = computed(() => {
    const lines = parseInt(this.lines() || '4', 10);
    return isNaN(lines) || lines < 1 ? 4 : lines;
  });

  sizeClasses = computed(() => {
    switch (this.size()) {
      case 'sm':
        return 'text-sm min-h-20';
      case 'lg':
        return 'text-lg min-h-32';
      default:
        return 'text-sm min-h-24';
    }
  });

  onInput(value: string | null): void {
    this.fieldState().value.set(value || '');
  }

  onActionClick(): void {
    this.actionClick.emit();
  }

  onFocus(): void {
    this.isFocused.set(true);
  }

  onBlur(): void {
    this.fieldState().markAsTouched();
    this.isFocused.set(false);
  }
}