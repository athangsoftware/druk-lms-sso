import { CommonModule, NgClass } from '@angular/common';
import { Component, computed, input, output, linkedSignal, signal } from '@angular/core';
import { BaseInput } from '../../../../core/base-input/base-input';

@Component({
  selector: 'ui-otp-field',
  imports: [
    CommonModule,
    BaseInput,
    NgClass
  ],
  templateUrl: './otp-field.html',
})
export class OtpField {
  // Inputs
  field = input.required<any>();
  readonly length = input<number>(6);
  readonly label = input<string | null>(null);
  readonly width = input<'sm' | 'md' | 'lg' | 'xl' | 'xxl' | '3xl' | 'full' | string>('md');
  readonly size = input<'sm' | 'md' | 'lg'>('md');
  readonly showErrorSpace = input<boolean>(false);

  // Output
  readonly complete = output<string>();

  // Signals
  readonly isFocused = signal(false);

  // Computed signals for field state
  fieldState = computed(() => this.field()());
  value = computed(() => this.fieldState().value());
  isValid = computed(() => this.fieldState().valid());
  isTouched = computed(() => this.fieldState().touched());
  errors = computed(() => this.fieldState().errors());
  isDisabled = computed(() => this.fieldState().disabled());

  // Linked Signal for digits
  // Automatically updates when `value()` changes, but can be modified locally
  readonly digits = linkedSignal(() => this.convertValueToDigits(this.value() || ''));

  readonly digitIndices = computed(() => Array.from({ length: this.length() }, (_, i) => i));
  readonly otpValue = computed(() => {
    return this.digits().join('');
  });
  readonly isComplete = computed(() => {
    const otp = this.otpValue();
    return otp.length === this.length() && otp.replace(/\s/g, '').length === this.length();
  });

  readonly sizeClasses = computed(() => {
    switch (this.size()) {
      case 'sm':
        return 'w-10 h-10 text-sm';
      case 'lg':
        return 'w-14 h-14 text-xl';
      default:
        return 'w-12 h-12 text-lg';
    }
  });

  readonly hasRequiredValidator = computed(() => {
    const errs = this.errors();
    return errs.some((err: any) => err.kind === 'required');
  });

  readonly hasErrors = computed(() => this.isTouched() && this.errors().length > 0);

  readonly errorMessage = computed(() => {
    const errs = this.errors();
    if (errs.length === 0) return '';
    return errs[0].message || 'Invalid value';
  });

  constructor() {
    // No effects needed for sync! linkedSignal handles it.
  }

  onDigitInput(event: Event, index: number): void {
    const input = event.target as HTMLInputElement;
    const sanitized = this.sanitizeInput(input.value);
    console.log('onDigitInput:', input.value, 'sanitized:', sanitized, 'index:', index);

    if (sanitized.length > 1) {
      this.handlePastedValue(sanitized, index);
      return;
    }

    this.updateDigit(index, sanitized);

    if (sanitized && index < this.length() - 1 && !this.isComplete()) {
      this.focusInput(index + 1);
    }
  }

  onKeyDown(event: KeyboardEvent, index: number): void {
    const input = event.target as HTMLInputElement;

    switch (event.key) {
      case 'Backspace':
        event.preventDefault();
        this.handleBackspace(index, input.value);
        break;

      case 'Delete':
        event.preventDefault();
        this.updateDigit(index, '');
        break;

      case 'ArrowLeft':
        if (index > 0) this.focusInput(index - 1);
        break;

      case 'ArrowRight':
        if (index < this.length() - 1) this.focusInput(index + 1);
        break;

      default:
        if (this.isAlphanumeric(event.key)) {
          event.preventDefault();
          this.updateDigit(index, event.key.toUpperCase());

          if (index < this.length() - 1 && !this.isComplete()) {
            this.focusInput(index + 1);
          }
        }
    }
  }

  onFocus(): void {
    this.isFocused.set(true);
  }

  onBlur(): void {
    this.isFocused.set(false);
  }

  onPaste(event: ClipboardEvent, index: number): void {
    if (this.isDisabled()) return;

    event.preventDefault();
    const pastedData = event.clipboardData?.getData('text') || '';
    this.handlePastedValue(pastedData, index);
  }

  private handlePastedValue(value: string, startIndex: number): void {
    const sanitized = this.sanitizeInput(value);
    const newDigits = [...this.digits()];
    const maxLength = Math.min(sanitized.length, this.length() - startIndex);

    for (let i = 0; i < maxLength; i++) {
      newDigits[startIndex + i] = sanitized[i];
    }

    this.digits.set(newDigits);
    this.updateModel();

    if (!this.isComplete()) {
      const nextEmptyIndex = this.findNextEmptyIndex(startIndex);
      const focusIndex = nextEmptyIndex !== -1
        ? nextEmptyIndex
        : Math.min(startIndex + maxLength, this.length() - 1);
      this.focusInput(focusIndex);
    }
  }

  private handleBackspace(index: number, currentValue: string): void {
    if (currentValue) {
      this.updateDigit(index, '');
    } else if (index > 0) {
      this.updateDigit(index - 1, '');
      this.focusInput(index - 1);
    }
  }

  private updateDigit(index: number, value: string): void {
    const newDigits = [...this.digits()];
    newDigits[index] = value;
    this.digits.set(newDigits);
    this.updateModel();
  }

  private updateModel(): void {
    const value = this.digits().join('');
    const currentFieldValue = this.value() || '';

    if (value !== currentFieldValue) {
      this.fieldState().value.set(value);
    }

    if (this.isComplete()) {
      this.complete.emit(value);
    }
  }

  private convertValueToDigits(value: string): string[] {
    const sanitized = this.sanitizeInput(value);
    const newDigits = Array(this.length()).fill('');

    for (let i = 0; i < Math.min(sanitized.length, this.length()); i++) {
      newDigits[i] = sanitized[i];
    }
    return newDigits;
  }

  private focusInput(index: number): void {
    if (this.isComplete()) return;

    setTimeout(() => {
      const inputs = document.querySelectorAll('.otp-input');
      const targetInput = inputs[index] as HTMLInputElement;

      if (targetInput && document.activeElement !== targetInput) {
        targetInput.focus();
        if (index < this.length() - 1) {
          targetInput.select();
        }
      }
    });
  }

  private findNextEmptyIndex(startIndex: number): number {
    return this.digits().findIndex((digit, idx) => idx >= startIndex && !digit);
  }

  private sanitizeInput(input: string): string {
    return input.replace(/[^0-9a-zA-Z]/g, '').toUpperCase();
  }

  private isAlphanumeric(key: string): boolean {
    return /^[0-9a-zA-Z]$/.test(key);
  }
}