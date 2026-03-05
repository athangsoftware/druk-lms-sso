import { Component, ElementRef, inject, input, OnDestroy, signal, ViewChild, computed, effect } from '@angular/core';
import { NgClass } from '@angular/common';
import { AppSvgIcon } from '../../../../components/misc/app-svg-icon/app-svg-icon';
import { BaseInput } from '../../../../core/base-input/base-input';
import { Subscription } from 'rxjs';
import { Weekday, InputDateFormat } from '../date-format';
import { DateUtils } from '../date-utils';
import { OverlayStore } from '../../../../components/overlay/overlay';
import { DateOverlay } from './date-overlay/date-overlay';
import { getFirstSignalFormError } from '../../../../core/signal-form-errors';

@Component({
  selector: 'ui-date-picker',
  imports: [
    BaseInput,
    AppSvgIcon,
    NgClass
  ],
  templateUrl: './date-picker.html',
})
export class DatePicker implements OnDestroy {
  @ViewChild('trigger', { static: false }) trigger?: ElementRef;

  // Signal Forms
  field = input.required<any>();

  label = input<string | null>(null);
  iconSrc = input<string | null>(null);
  showDatePickerIcon = input<boolean>(true);
  width = input<'sm' | 'md' | 'lg' | 'xl' | 'xxl' | '3xl' | 'full' | string>('md');
  size = input<'sm' | 'md' | 'lg'>('md');
  showErrorSpace = input<boolean>(true);
  minDate = input<Date | null>(null);
  maxDate = input<Date | null>(null);
  allowOnlyPast = input<boolean>(false);
  allowOnlyFuture = input<boolean>(false);
  disabledDays = input<Weekday[]>([]);
  disabledDates = input<Date[]>([]);
  inputDateFormat = input<InputDateFormat>(InputDateFormat.mmddyyyy);
  borderless = input<boolean>(false);

  overlayService = inject(OverlayStore);
  isFocused = signal(false);
  textInputValue = signal<string | null>(null);

  // Computed signals for field state
  fieldState = computed(() => this.field()());
  value = computed(() => this.fieldState().value());
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

  private subscription?: Subscription;

  constructor() {
    // Watch for value changes from the form
    effect(() => {
      const currentValue = this.value();
      if (currentValue == null) {
        this.textInputValue.set(null);
      } else if (currentValue instanceof Date && DateUtils.isValidDate(currentValue)) {
        this.textInputValue.set(DateUtils.formatDate(currentValue, this.inputDateFormat()));
      }
    });
  }

  get placeHolder(): string {
    return this.inputDateFormat() === InputDateFormat.mmddyyyy ? 'mm/dd/yyyy' : 'dd/mm/yyyy';
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  onFocus() {
    this.isFocused.set(true);
  }

  onBlur() {
    this.isFocused.set(false);
    this.fieldState().markAsTouched();
  }

  onInputClicked() {
    if (this.isDisabled()) return;
    this.onDatePickerIconClicked();
  }

  async onDatePickerIconClicked() {
    if (!this.trigger?.nativeElement || this.isDisabled()) return;

    const result: Date | undefined = await this.overlayService.openNearElement(DateOverlay, this.trigger.nativeElement, {
      positionPreference: 'bottomLeft',
      data: {
        selectedDate: this.value(),
        minDate: this.minDate(),
        maxDate: this.maxDate(),
        allowOnlyPast: this.allowOnlyPast(),
        allowOnlyFuture: this.allowOnlyFuture(),
        disabledDays: this.disabledDays(),
        disabledDates: this.disabledDates()
      }
    });

    if (result && DateUtils.isValidDate(result)) {
      this.fieldState().value.set(result);
    } else if (result === null) {
      this.fieldState().value.set(null);
    }
  }
}
