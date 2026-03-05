import { CommonModule, NgClass } from '@angular/common';
import { Component, input, output, signal, computed, linkedSignal } from '@angular/core';
import { BaseInput } from '../../../../core/base-input/base-input';
import { AppSvgIcon } from '../../../misc/app-svg-icon/app-svg-icon';
import { getFirstSignalFormError } from '../../../../core/signal-form-errors';

@Component({
  selector: 'ui-number-field',
  standalone: true,
  imports: [
    AppSvgIcon,
    CommonModule,
    BaseInput,
    NgClass
  ],
  templateUrl: './number-field.html',
  styles: `
    input::-webkit-inner-spin-button,
    input::-webkit-outer-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
    input[type=number] {
      -moz-appearance: textfield;
    }
  `,
})
export class NumberField {
  // Signal Forms (optional)
  field = input<any>();

  // Standalone mode (optional)
  value = input<number | null>(null);
  disabled = input<boolean>(false);

  // Inputs
  iconSrc = input<string | null>(null);
  actionIcon = input<string | null>(null);
  label = input<string | null>(null);
  width = input<'sm' | 'md' | 'lg' | 'xl' | 'xxl' | '3xl' | 'full' | string>('md');
  size = input<'sm' | 'md' | 'lg'>('md');
  placeholder = input<string>('');
  showErrorSpace = input<boolean>(true);
  min = input<number | null>(null);
  max = input<number | null>(null);
  step = input<number | null>(null);

  // Outputs
  actionClick = output<void>();
  valueChange = output<number | null>();

  // Signals
  isFocused = signal(false);

  // Linked signal for standalone value
  internalValue = linkedSignal(() => this.value());

  // Computed signals for field state
  fieldState = computed(() => this.field() ? this.field()() : null);
  formValue = computed(() => this.fieldState()?.value() ?? null);
  isValid = computed(() => this.fieldState()?.valid() ?? true);
  isTouched = computed(() => this.fieldState()?.touched() ?? false);
  errors = computed(() => this.fieldState()?.errors() ?? []);

  isDisabled = computed(() => {
    if (this.field()) {
      return this.fieldState()?.disabled() ?? false;
    }
    return this.disabled();
  });

  // Use form value if available, otherwise use standalone value
  displayValue = computed(() => {
    if (this.field()) {
      return this.formValue();
    }
    return this.internalValue();
  });

  hasRequiredValidator = computed(() => {
    const errs = this.errors();
    return errs.some((err: any) => err.kind === 'required');
  });

  hasErrors = computed(() => this.isTouched() && this.errors().length > 0);

  errorMessage = computed(() => {
    return getFirstSignalFormError(this.errors(), this.label());
  });

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

  onInput(value: string): void {
    const numValue = value ? Number(value) : null;
    const finalValue = numValue !== null && !isNaN(numValue) ? numValue : null;

    if (this.field()) {
      // Signal Forms mode
      this.fieldState()?.value.set(finalValue);
    } else {
      // Standalone mode
      this.internalValue.set(finalValue);
    }

    // Emit value change for both modes
    this.valueChange.emit(finalValue);
  }

  onKeyDown(event: KeyboardEvent): void {
    // Prevent 'e', '+', '-', and other non-numeric characters
    if (['e', 'E', '+', '-'].includes(event.key)) {
      event.preventDefault();
    }
  }

  onActionClick(): void {
    this.actionClick.emit();
  }

  onFocus(): void {
    this.isFocused.set(true);
  }

  onBlur(): void {
    if (this.field()) {
      this.fieldState()?.markAsTouched();
    }
    this.isFocused.set(false);
  }
}