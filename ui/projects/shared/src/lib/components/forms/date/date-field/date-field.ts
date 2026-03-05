import { Component, input, signal, ViewChild, ElementRef, OnDestroy, computed, effect } from '@angular/core';
import { NgClass } from '@angular/common';
import { Subscription } from 'rxjs';
import { BaseInput } from '../../../../core/base-input/base-input';
import { AppSvgIcon } from '../../../misc/app-svg-icon/app-svg-icon';
import { NgxMaskDirective } from '../../../../core/input-mask/ngx-mask.directive';
import { InputDateFormat, Weekday } from '../date-format';
import { DateUtils } from '../date-utils';
import { getFirstSignalFormError } from '../../../../core/signal-form-errors';

@Component({
  selector: 'ui-date-field',
  standalone: true,
  imports: [
    NgxMaskDirective,
    BaseInput,
    AppSvgIcon,
    NgClass
  ],
  templateUrl: './date-field.html',
})
export class DateField implements OnDestroy {
  @ViewChild('inputElement', { static: false }) inputElement?: ElementRef;

  // Signal Forms
  field = input.required<any>();

  label = input<string | null>(null);
  iconSrc = input<string | null>(null);
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
    return '00/00/0000';
  }

  get displayPlaceholder(): string {
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

  onInputChanged($event: Event) {
    const target = $event.target as HTMLInputElement;
    const inputValue = target.value.trim();

    if (inputValue.length === 10) {
      const parsedDate = DateUtils.parseDate(inputValue, this.inputDateFormat());
      if (parsedDate && this.isDateValid(parsedDate)) {
        this.textInputValue.set(inputValue);
        this.fieldState().value.set(parsedDate);
      } else {
        this.textInputValue.set(null);
        this.fieldState().value.set(null);
      }
    } else if (inputValue.length === 0) {
      this.textInputValue.set(null);
      this.fieldState().value.set(null);
    }
  }

  private isDateValid(date: Date): boolean {
    const currentDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    const today = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());

    if (this.allowOnlyFuture() && currentDate < today) {
      return false;
    }
    if (this.allowOnlyPast() && currentDate > today) {
      return false;
    }
    if (this.minDate() && currentDate < new Date(this.minDate()!.getFullYear(), this.minDate()!.getMonth(), this.minDate()!.getDate())) {
      return false;
    }
    if (this.maxDate() && currentDate > new Date(this.maxDate()!.getFullYear(), this.maxDate()!.getMonth(), this.maxDate()!.getDate())) {
      return false;
    }
    if (this.disabledDays()?.length) {
      const dayName = this.getWeekdayName(date.getDay());
      if (this.disabledDays().includes(dayName)) {
        return false;
      }
    }
    if (this.disabledDates()?.some(d => DateUtils.isSameDate(d, currentDate))) {
      return false;
    }
    return true;
  }

  private getWeekdayName(dayIndex: number): Weekday {
    const days: Weekday[] = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    return days[dayIndex];
  }
}