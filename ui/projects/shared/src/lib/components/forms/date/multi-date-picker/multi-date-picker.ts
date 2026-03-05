import { Component, ElementRef, inject, input, OnDestroy, signal, ViewChild, computed, effect } from '@angular/core';
import { NgClass } from '@angular/common';
import { Subscription } from 'rxjs';
import { isValidDate } from 'rxjs/internal/util/isDate';
import { MultiDateOverlay } from './multi-date-overlay/multi-date-overlay';
import { BaseInput } from '../../../../core/base-input/base-input';
import { AppSvgIcon } from '../../../misc/app-svg-icon/app-svg-icon';
import { OverlayStore } from '../../../overlay/overlay';
import { InputDateFormat, Weekday } from '../date-format';
import { getFirstSignalFormError } from '../../../../core/signal-form-errors';


@Component({
  selector: 'ui-multi-date-picker',
  standalone: true,
  imports: [
    NgClass,
    BaseInput,
    AppSvgIcon,
  ],
  templateUrl: './multi-date-picker.html',
})
export class MultiDatePicker implements OnDestroy {
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

  overlayService = inject(OverlayStore);

  isFocused = signal(false);
  textInputValue = signal<string>('');

  // Computed signals for field state
  fieldState = computed(() => this.field()());
  value = computed(() => this.fieldState().value() || []);
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
        return 'min-h-8 text-sm';
      case 'lg':
        return 'min-h-12 text-lg';
      default:
        return 'min-h-10 text-sm';
    }
  });

  private subscription?: Subscription;

  constructor() {
    // Watch for value changes from the form
    effect(() => {
      const currentValue = this.value();
      // Just ensure we have the latest value
      // The template will reactively display the chips
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  get placeHolder(): string {
    switch (this.inputDateFormat()) {
      case InputDateFormat.mmddyyyy:
        return 'mm/dd/yyyy';
      case InputDateFormat.ddmmyyyy:
        return 'dd/mm/yyyy';
    }
  }

  getClass() {
    let cls = '';
    if (this.iconSrc()) {
      cls += 'pl-10';
    } else {
      cls += 'pl-3';
    }

    return cls;
  }

  onFocus() {
    this.isFocused.set(true);
  }

  onBlur() {
    this.isFocused.set(false);
    this.fieldState().markAsTouched();
  }

  async onDatePickerIconClicked() {
    const dialogData = {
      data: {
        selectedDates: this.value() || [],
        minDate: this.minDate(),
        maxDate: this.maxDate(),
        allowOnlyPast: this.allowOnlyPast(),
        allowOnlyFuture: this.allowOnlyFuture(),
        disabledDays: this.disabledDays(),
        disabledDates: this.disabledDates()
      },
      positionPreference: 'bottom',
    };

    let result: Date[] | undefined;
    if (!this.trigger?.nativeElement) {
      console.warn('Trigger element is not available. Opening overlay without positioning.');
      result = await this.overlayService.openModal(MultiDateOverlay, dialogData);
    } else {
      result = await this.overlayService.openNearElement(MultiDateOverlay, this.trigger.nativeElement, {
        data: dialogData.data,
        disableClose: true,
        positionPreference: 'bottomLeft'
      });
    }

    if (result && Array.isArray(result) && result.length > 0 && result.every(date => date instanceof Date && isValidDate(date))) {
      this.textInputValue.set('');
      this.fieldState().value.set(result);
    }
    // If result is undefined or empty, do nothing to preserve existing value
  }

  removeDate(index: number) {
    const currentDates = this.value() || [];
    const updatedDates = [...currentDates.slice(0, index), ...currentDates.slice(index + 1)];
    this.textInputValue.set('');
    this.fieldState().value.set(updatedDates);
  }

  formatDate(date: Date): string {
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    const yyyy = date.getFullYear();
    return this.inputDateFormat() === InputDateFormat.mmddyyyy ? `${mm}/${dd}/${yyyy}` : `${dd}/${mm}/${yyyy}`;
  }
}