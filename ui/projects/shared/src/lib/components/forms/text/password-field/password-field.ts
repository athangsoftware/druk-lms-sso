import { CommonModule, NgClass } from '@angular/common';
import { Component, input, output, signal, computed } from '@angular/core';
import { FormField } from '@angular/forms/signals';
import { BaseInput } from '../../../../core/base-input/base-input';
import { AppSvgIcon } from '../../../misc/app-svg-icon/app-svg-icon';
import { Autofocus } from '../../../../core/autofocus';
import { getFirstSignalFormError } from '../../../../core/signal-form-errors';

@Component({
  selector: 'ui-password-field',
  standalone: true,
  imports: [
    FormField,
    AppSvgIcon,
    CommonModule,
    BaseInput,
    Autofocus,
    NgClass
  ],
  templateUrl: './password-field.html',
})
export class PasswordField {
  // Inputs
  field = input.required<any>(); // Field from signal form
  iconSrc = input<string | null>(null);
  label = input<string | null>('Password');
  width = input<'sm' | 'md' | 'lg' | 'xl' | 'xxl' | '3xl' | 'full' | string>('md');
  size = input<'sm' | 'md' | 'lg'>('md');
  placeholder = input<string>('Enter password');
  showErrorSpace = input<boolean>(true);
  showEye = input<boolean>(true);

  // Outputs
  actionClick = output<void>();

  // Signals
  isFocused = signal(false);
  showPassword = signal(false);

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

  togglePasswordVisibility(): void {
    this.showPassword.set(!this.showPassword());
  }
}