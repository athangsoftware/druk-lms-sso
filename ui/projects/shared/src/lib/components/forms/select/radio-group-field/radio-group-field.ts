import { Component, computed, input, output, signal, linkedSignal } from '@angular/core';
import { NgClass, NgStyle } from '@angular/common';
import type { Field } from '@angular/forms/signals';
import { BaseInput } from '../../../../core/base-input/base-input';
import { resolveTemplateWithObject } from '../../../../core/template-resolver';
import { AppSvgIcon } from '../../../misc/app-svg-icon/app-svg-icon';
import { getFirstSignalFormError } from '../../../../core/signal-form-errors';

@Component({
  selector: 'ui-radio-group-field',
  standalone: true,
  imports: [
    BaseInput,
    NgClass,
    AppSvgIcon,
    NgStyle,
  ],
  templateUrl: './radio-group-field.html',
})
export class RadioGroupField<T> {
  // Signal Forms (optional)
  field = input<any>();

  // Standalone mode (optional)
  value = input<any>(null);
  disabled = input<boolean>(false);

  // Inputs
  label = input<string | null>(null);
  options = input<T[]>([]);
  displayProperty = input<string>('');
  displayTemplate = input<string | null>(null);
  iconSrc = input<string | null>(null);
  dynamicIconPath = input<string>('');
  imageUrl = input<string | null>(null);
  dynamicImageUrlPath = input<string>('');
  iconColor = input<string>('');
  dynamicIconColorPath = input<string>('');
  valueProperty = input<string>('');
  emptyMessage = input<string>('');
  customActionText = input<string>('');
  width = input<'sm' | 'md' | 'lg' | 'xl' | 'xxl' | '3xl' | 'full' | string>('md');
  maxVisibleItems = input<number | null>(null);
  showErrorSpace = input<boolean>(true);

  // Outputs
  customActionClick = output<void>();
  valueChange = output<any>();

  // Signals
  showAll = signal(false);
  radioGroupName = signal(`radio-group-${Math.random().toString(36).substring(2, 9)}`);

  // Linked signal for standalone value
  internalValue = linkedSignal(() => this.value());

  // Computed signals for field state
  fieldState = computed(() => this.field() ? this.field()() : null);
  formValue = computed(() => this.fieldState()?.value() || null);
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

  // Computed
  visibleItems = computed(() =>
    this.showAll() || this.maxVisibleItems() === null
      ? this.options()
      : this.options().slice(0, this.maxVisibleItems()!)
  );

  showMore = computed(() =>
    !this.showAll() &&
    this.maxVisibleItems() !== null &&
    this.options().length > this.maxVisibleItems()!
  );

  showLess = computed(() =>
    this.showAll() &&
    this.maxVisibleItems() !== null
  );

  containerClass = computed(() => ({
    'w-full': this.width() === 'full',
    'w-11/12': this.width() === '3xl',
    'w-10/12': this.width() === 'xxl',
    'w-9/12': this.width() === 'xl',
    'w-8/12': this.width() === 'lg',
    'w-6/12': this.width() === 'md',
    'w-4/12': this.width() === 'sm',
    [this.width()]: typeof this.width() === 'string' && !['sm', 'md', 'lg', 'xl', 'xxl', '3xl', 'full'].includes(this.width())
  }));

  isSelected = computed(() => (item: T) => {
    const currentValue = this.displayValue();
    const itemValue = this.getValueId(item);
    return currentValue === itemValue;
  });

  iconType = computed(() => (item: T): 'svg' | 'url' | null => {
    if (this.iconSrc() || this.dynamicIconPath()) return 'svg';
    if (this.imageUrl() || this.dynamicImageUrlPath()) return 'url';
    return null;
  });

  icon = computed(() => (item: T): string | null => {
    if (this.iconSrc()) return this.iconSrc();
    if (this.dynamicIconPath()) return this.getNestedProperty(item, this.dynamicIconPath());
    if (this.imageUrl()) return this.imageUrl();
    if (this.dynamicImageUrlPath()) return this.getNestedProperty(item, this.dynamicImageUrlPath());
    return null;
  });

  itemIconColor = computed(() => (item: T): string | null => {
    if (this.iconColor()) return this.iconColor();
    if (this.dynamicIconColorPath()) {
      return this.getNestedProperty(item, this.dynamicIconColorPath()) || this.iconColor();
    }
    return this.iconColor();
  });

  displayText = computed(() => (item: T): string | null => {
    if (!item) return null;
    if (this.displayProperty()) return this.getNestedProperty(item, this.displayProperty());
    if (this.displayTemplate()) return resolveTemplateWithObject(item, this.displayTemplate()!);
    return String(item);
  });

  // Linked signal to sync selectedItem when displayValue changes
  selectedItem = linkedSignal<T | null>(() => {
    const currentValue = this.displayValue();
    const matchingItem = currentValue != null
      ? this.options().find((item) => this.getValueId(item) === currentValue)
      : null;
    return matchingItem ?? null;
  });

  constructor() {
  }

  protected onItemChange(item: T): void {
    if (this.isDisabled()) return;

    const value = this.getValueId(item);

    if (this.field()) {
      // Signal Forms mode
      this.fieldState()?.value.set(value);
      this.fieldState()?.markAsTouched();
    } else {
      // Standalone mode
      this.internalValue.set(value);
    }

    // Emit value change for both modes
    this.valueChange.emit(value);
  }

  protected onCustomActionClick(): void {
    if (!this.isDisabled()) {
      this.customActionClick.emit();
    }
  }

  protected showAllItems(): void {
    if (!this.isDisabled()) {
      this.showAll.set(true);
    }
  }

  protected hideExtraItems(): void {
    if (!this.isDisabled()) {
      this.showAll.set(false);
    }
  }

  getValueId(item: T): any {
    return this.valueProperty() ? this.getNestedProperty(item, this.valueProperty()) : item;
  }

  private getNestedProperty(item: T, path: string): any {
    return path.split('.').reduce((acc, part) => acc && acc[part], item as any);
  }
}