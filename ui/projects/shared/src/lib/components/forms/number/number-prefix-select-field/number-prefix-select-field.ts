import { CommonModule, NgClass } from '@angular/common';
import { Component, computed, input, output, signal, linkedSignal, inject, viewChild, ElementRef } from '@angular/core';
import { AppSvgIcon } from '../../../misc/app-svg-icon/app-svg-icon';
import { BaseInput } from '../../../../core/base-input/base-input';
import { getFirstSignalFormError } from '../../../../core/signal-form-errors';
import { OverlayStore } from '../../../overlay/overlay';
import { NumberPrefixDropdown } from './number-prefix-dropdown';

export interface NumberPrefixSelectOption {
  value: string;
  label: string;
  fullName?: string;
  isRange: boolean;
}

export interface NumberRangeValue {
  from: number | null;
  to: number | null;
}

@Component({
  selector: 'ui-number-prefix-select-field',
  imports: [
    AppSvgIcon,
    CommonModule,
    BaseInput,
    NgClass
  ],
  templateUrl: './number-prefix-select-field.html',
})
export class NumberPrefixSelectField {
  private overlayStore = inject(OverlayStore);

  prefixButton = viewChild<ElementRef>('prefixButton');

  // Inputs
  field = input<any>(); // Signal Form Field
  value = input<number | NumberRangeValue | null>(null); // Standalone Value

  label = input<string | null>(null);
  width = input<'sm' | 'md' | 'lg' | 'xl' | 'xxl' | '3xl' | 'full' | string>('md');
  size = input<'sm' | 'md' | 'lg'>('md');
  placeholder = input<string>('');
  showErrorSpace = input<boolean>(false);
  hasPrefixSelect = input<boolean>(false);
  prefixOptions = input<NumberPrefixSelectOption[]>([]);
  defaultPrefixValue = input<string | null>(null);
  iconSrc = input<string | null>(null);

  // Outputs
  prefixChange = output<string>();
  valueChange = output<number | NumberRangeValue | null>();

  // Internal State
  prefixValue = linkedSignal(() => {
    const def = this.defaultPrefixValue();
    const options = this.prefixOptions();
    return def ?? options[0]?.value ?? '';
  });
  isFocused = signal(false);
  isPrefixDropdownOpen = signal<boolean>(false);

  // Standalone Value
  internalValue = linkedSignal(() => this.value());

  // Signal Forms State
  fieldState = computed(() => this.field() ? this.field()() : null);

  // Unified Value Access
  currentValue = computed(() => {
    if (this.field()) {
      return this.fieldState()?.value();
    }
    return this.internalValue();
  });

  // Computed Properties
  isRange = computed(() => {
    const prefixVal = this.prefixValue();
    const selectedOption = this.prefixOptions().find(option => option.value === prefixVal);
    return selectedOption?.isRange ?? false;
  });

  fromValue = computed(() => {
    const val = this.currentValue();
    if (this.isRange() && val && typeof val === 'object') return (val as NumberRangeValue).from;
    return null;
  });

  toValue = computed(() => {
    const val = this.currentValue();
    if (this.isRange() && val && typeof val === 'object') return (val as NumberRangeValue).to;
    return null;
  });

  singleValue = computed(() => {
    const val = this.currentValue();
    if (!this.isRange() && typeof val === 'number') return val;
    return null;
  });

  isDisabled = computed(() => this.fieldState()?.disabled() ?? false);
  isTouched = computed(() => this.fieldState()?.touched() ?? false);
  errors = computed(() => this.fieldState()?.errors() ?? []);
  hasErrors = computed(() => this.isTouched() && this.errors().length > 0);
  errorMessage = computed(() => getFirstSignalFormError(this.errors(), this.label()));
  hasRequiredValidator = computed(() => {
    const errs = this.errors();
    return errs.some((err: any) => err.kind === 'required');
  });

  sizeClasses = computed(() => {
    switch (this.size()) {
      case 'sm': return 'h-8 text-sm';
      case 'lg': return 'h-12 text-lg';
      default: return 'h-10 text-sm';
    }
  });

  selectedPrefixLabel = computed(() => {
    const options = this.prefixOptions();
    const currentValue = this.prefixValue();
    const option = options.find(opt => opt.value === currentValue);
    return option?.label || '';
  });

  // Methods
  async onTogglePrefixDropdown(): Promise<void> {
    if (this.isDisabled()) return;

    this.isPrefixDropdownOpen.set(true);
    const trigger = this.prefixButton()?.nativeElement;

    if (!trigger) return;

    const result = await this.overlayStore.openNearElement(
      NumberPrefixDropdown,
      trigger,
      {
        data: {
          options: this.prefixOptions(),
          currentValue: this.prefixValue()
        },
        positionPreference: 'bottomRight',
        backdropOptions: {
          backdropClass: ['bg-transparent']
        },
        panelClass: ['rounded-none'],
        onClose: () => this.isPrefixDropdownOpen.set(false)
      }
    );

    if (result) {
      this.onPrefixSelect(result);
    }
  }

  onPrefixSelect(value: string): void {
    this.prefixValue.set(value);
    this.prefixChange.emit(value);
    // Reset value on prefix change (mode switch)
    this.updateValue(null);
  }

  updateValue(value: any) {
    if (this.field()) {
      this.fieldState()?.value.set(value);
    } else {
      this.internalValue.set(value);
    }
    this.valueChange.emit(value);
  }

  onSingleInput(event: Event) {
    const val = (event.target as HTMLInputElement).valueAsNumber;
    this.updateValue(isNaN(val) ? null : val);
  }

  onFromInput(event: Event) {
    const from = (event.target as HTMLInputElement).valueAsNumber;
    const current = (this.currentValue() as NumberRangeValue) || { from: null, to: null };
    this.updateValue({ ...current, from: isNaN(from) ? null : from });
  }

  onToInput(event: Event) {
    const to = (event.target as HTMLInputElement).valueAsNumber;
    const current = (this.currentValue() as NumberRangeValue) || { from: null, to: null };
    this.updateValue({ ...current, to: isNaN(to) ? null : to });
  }

  // Debounced Blur
  private focusTimeout: any;

  onFocus() {
    clearTimeout(this.focusTimeout);
    this.isFocused.set(true);
  }

  onBlur() {
    this.focusTimeout = setTimeout(() => {
      this.isFocused.set(false);
      if (this.field()) this.fieldState()?.markAsTouched();
    }, 50);
  }
}
