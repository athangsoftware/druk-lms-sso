import { NgClass } from '@angular/common';
import { Component, computed, input, linkedSignal, output, signal } from '@angular/core';
import { DateUtils } from '../../../date-utils';
import { Weekday } from '../../../date-format';

@Component({
  selector: 'ui-date-selection',
  imports: [NgClass],
  templateUrl: './date-selection.html',
})
export class DateSelection {
  value = input<Date | null>(null);
  minDate = input<Date | null>();
  maxDate = input<Date | null>();
  allowOnlyPast = input<boolean>(false);
  allowOnlyFuture = input<boolean>(false);
  allowToday = input<boolean>(false);
  disabledDays = input<Weekday[]>([]);
  disabledDates = input<Date[]>([]);

  dateSelected = output<Date>();

  days: { day: Weekday, displayName: string }[] = [
    { day: 'sunday', displayName: 'Su' },
    { day: 'monday', displayName: 'Mo' },
    { day: 'tuesday', displayName: 'Tu' },
    { day: 'wednesday', displayName: 'We' },
    { day: 'thursday', displayName: 'Th' },
    { day: 'friday', displayName: 'Fr' },
    { day: 'saturday', displayName: 'Sa' }
  ];
  months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];

  uiMode = signal<'date' | 'month' | 'year'>('date');

  selectedDate = linkedSignal(() => {
    const v = this.value();
    return v ? new Date(v) : null;
  });
  activeMonth = linkedSignal(() => {
    const v = this.value();
    return (v ? new Date(v) : new Date()).getMonth();
  });
  activeYear = linkedSignal(() => {
    const v = this.value();
    return (v ? new Date(v) : new Date()).getFullYear();
  });

  mmmyyyy = computed(() => `${this.months[this.activeMonth()]} ${this.activeYear()}`);

  years = computed(() => {
    let startYear = Math.floor(this.activeYear() / 24) * 24;
    if (startYear <= 0) startYear = 1;

    const todayYear = new Date().getFullYear();
    return Array.from({ length: 24 }, (_, i) => {
      const year = startYear + i;
      let isEnabled = true;

      if (this.allowOnlyPast() && year > todayYear) isEnabled = false;
      if (this.allowOnlyFuture() && year < todayYear) isEnabled = false;
      if (isEnabled && this.minDate()) isEnabled = year >= this.minDate()!.getFullYear();
      if (isEnabled && this.maxDate()) isEnabled = year <= this.maxDate()!.getFullYear();

      return { value: year, isEnabled };
    });
  });

  daysOfMonth = computed(() => {
    const daysInMonth = new Date(this.activeYear(), this.activeMonth() + 1, 0).getDate();

    return Array.from({ length: daysInMonth }, (_, i) => {
      const day = i + 1;
      const currentDate = new Date(this.activeYear(), this.activeMonth(), day);
      let isEnabled = true;

      if (this.allowOnlyFuture() && currentDate < new Date()) isEnabled = false;
      if (this.allowOnlyPast() && currentDate > new Date()) isEnabled = false;
      if (isEnabled && this.minDate()) isEnabled = currentDate >= this.minDate()!;
      if (isEnabled && this.maxDate()) isEnabled = currentDate <= this.maxDate()!;
      if (this.allowToday() && this.isToday(day)) isEnabled = true;

      const dayName = this.days[currentDate.getDay()];
      if (this.disabledDays()?.includes(dayName.day)) isEnabled = false;
      if (this.disabledDates()?.some(date => DateUtils.isSameDate(date, currentDate))) isEnabled = false;

      return { value: day, isEnabled };
    });
  });

  blankDays = computed(() => {
    return Array.from({ length: new Date(this.activeYear(), this.activeMonth()).getDay() }, (_, i) => i + 1);
  });







  isMonthEnabled(month: number): boolean {
    const monthStartDate = new Date(this.activeYear(), month, 1);
    const today = new Date();
    const todayMonthStart = new Date(today.getFullYear(), today.getMonth(), 1);

    if (this.allowOnlyPast() && monthStartDate > todayMonthStart) return false;
    if (this.allowOnlyFuture() && monthStartDate < todayMonthStart) return false;
    if (this.minDate()) {
      const minMonthStart = new Date(this.minDate()!.getFullYear(), this.minDate()!.getMonth(), 1);
      if (monthStartDate < minMonthStart) return false;
    }
    if (this.maxDate()) {
      const maxMonthStart = new Date(this.maxDate()!.getFullYear(), this.maxDate()!.getMonth(), 1);
      if (monthStartDate > maxMonthStart) return false;
    }
    return true;
  }

  onYearSelected(year: number): void {
    this.activeYear.set(year);
    this.uiMode.set('month');
  }

  onMonthSelected(month: number): void {
    this.activeMonth.set(month);
    this.uiMode.set('date');
  }

  isToday(day: number) {
    const today = new Date();
    const d = new Date(this.activeYear(), this.activeMonth(), day);
    return today.toDateString() === d.toDateString();
  }

  onDaySelected(day: number) {
    const newDate = new Date(this.activeYear(), this.activeMonth(), day);
    this.selectedDate.set(newDate);
    this.dateSelected.emit(newDate);
  }

  resetPicker(): void {
    this.selectedDate.set(null);
    const today = new Date();
    this.activeMonth.set(today.getMonth());
    this.activeYear.set(today.getFullYear());
  }

  isSelected(day: number): boolean {
    const d = new Date(this.activeYear(), this.activeMonth(), day);
    return this.selectedDate()?.toDateString() === d.toDateString();
  }

  previousMonthPressed() {
    switch (this.uiMode()) {
      case 'year':
        if (this.activeYear() > 24) {
          this.activeYear.update(y => y - 24);
        }
        break;
      case 'month':
        if (this.activeYear() > 1) this.activeYear.update(y => y - 1);
        break;
      case 'date':
        if (this.activeMonth() === 0) {
          if (this.activeYear() > 1) {
            this.activeYear.update(y => y - 1);
            this.activeMonth.set(11);
          }
        } else {
          this.activeMonth.update(m => m - 1);
        }
        break;
    }
  }

  nextMonthPressed() {
    switch (this.uiMode()) {
      case 'year':
        this.activeYear.update(y => y + 24);
        break;
      case 'month':
        this.activeYear.update(y => y + 1);
        break;
      case 'date':
        if (this.activeMonth() === 11) {
          this.activeYear.update(y => y + 1);
          this.activeMonth.set(0);
        } else {
          this.activeMonth.update(m => m + 1);
        }
        break;
    }
  }

  onYearSelectionPressed() {
    switch (this.uiMode()) {
      case 'year':
        this.uiMode.set('date');
        break;
      case 'month':
        this.uiMode.set('year');
        break;
      case 'date':
        this.uiMode.set('year');
        break;
    }
  }

  getFirstYear() {
    return this.years()[0]?.value ?? this.activeYear();
  }

  getLastYear() {
    return this.years()[this.years().length - 1]?.value ?? this.activeYear();
  }
}
