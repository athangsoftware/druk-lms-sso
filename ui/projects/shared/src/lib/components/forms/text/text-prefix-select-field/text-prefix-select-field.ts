import { CommonModule } from '@angular/common';
import { Component, computed, input, OnInit, output, signal, linkedSignal, inject, viewChild, ElementRef } from '@angular/core';
import { AppSvgIcon } from '../../../misc/app-svg-icon/app-svg-icon';
import { BaseInput } from '../../../../core/base-input/base-input';
import { getFirstSignalFormError } from '../../../../core/signal-form-errors';
import { OverlayStore } from '../../../overlay/overlay';
import { TextPrefixDropdown } from './text-prefix-dropdown';

export interface TextPrefixSelectOption {
  value: string;
  label: string;
  fullName?: string;
}

@Component({
  selector: 'ui-text-prefix-select-field',
  imports: [
    AppSvgIcon,
    CommonModule,
    BaseInput
  ],
  templateUrl: './text-prefix-select-field.html',
})
export class TextPrefixSelectField implements OnInit {
  private overlayStore = inject(OverlayStore);

  prefixButton = viewChild<ElementRef>('prefixButton');

  // Signal Forms (optional - for form integration)
  field = input<any>();

  // Standalone usage (optional - for non-form usage)
  value = input<string>('');

  // Inputs
  type = input<'text' | 'email' | 'tel' | 'url'>('text');
  iconSrc = input<string | null>(null);
  label = input<string | null>(null);
  width = input<'sm' | 'md' | 'lg' | 'xl' | 'xxl' | '3xl' | 'full' | string>('md');
  size = input<'sm' | 'md' | 'lg'>('md');
  placeholder = input<string>('');
  showErrorSpace = input<boolean>(false);
  hasPrefixSelect = input<boolean>(false);
  prefixOptions = input<TextPrefixSelectOption[]>([]);
  defaultPrefixValue = input<string | null>(null);

  // Outputs
  prefixChange = output<string>();
  valueChange = output<string>(); // For standalone usage

  // Signals
  isFocused = linkedSignal(() => false);
  prefixValue = signal<string>('');
  internalValue = linkedSignal(() => this.value());
  isPrefixDropdownOpen = signal<boolean>(false);

  // Computed signals for field state (when using Signal Forms)
  fieldState = computed(() => this.field() ? this.field()() : null);
  formValue = computed(() => this.fieldState()?.value() || '');
  isValid = computed(() => this.fieldState()?.valid() ?? true);
  isTouched = computed(() => this.fieldState()?.touched() ?? false);
  errors = computed(() => this.fieldState()?.errors() ?? []);
  isDisabled = computed(() => this.fieldState()?.disabled() ?? false);

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

  selectedPrefixLabel = computed(() => {
    const options = this.prefixOptions();
    const currentValue = this.prefixValue();
    const option = options.find(opt => opt.value === currentValue);
    return option?.label || '';
  });

  ngOnInit(): void {
    this.prefixValue.set(this.defaultPrefixValue() ?? '');
  }

  onInput(value: string | null): void {
    const newValue = value || '';

    if (this.field()) {
      // Signal Forms mode
      this.fieldState()?.value.set(newValue);
    } else {
      // Standalone mode
      this.internalValue.set(newValue);
      this.valueChange.emit(newValue);
    }
  }

  async onTogglePrefixDropdown(): Promise<void> {
    if (this.isDisabled()) return;

    this.isPrefixDropdownOpen.set(true);
    const trigger = this.prefixButton()?.nativeElement;

    if (!trigger) return;

    const result = await this.overlayStore.openNearElement(
      TextPrefixDropdown,
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
