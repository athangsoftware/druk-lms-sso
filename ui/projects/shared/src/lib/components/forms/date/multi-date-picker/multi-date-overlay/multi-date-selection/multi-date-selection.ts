
import { Component, computed, input, linkedSignal, output, signal } from '@angular/core';
import { NgClass } from '@angular/common';
import { Weekday } from '../../../date-format';

@Component({
  selector: 'ui-multi-date-selection',
  imports: [NgClass],
  standalone: true,
  templateUrl: './multi-date-selection.html',
  styles: [
    `
    :host {
      display: block;
    }
    `
  ]
})
export class MultiDateSelection {
  value = input<Date[]>([]);
  minDate = input<Date | null>();
  maxDate = input<Date | null>();
  allowOnlyPast = input<boolean>(false);
  allowOnlyFuture = input<boolean>(false);
  allowToday = input<boolean>(false);
  disabledDays = input<Weekday[]>([]);
  disabledDates = input<Date[]>([]);

  dateSelected = output<Date[]>();
  confirmed = output<Date[]>();
  cancelled = output<void>();

  days: { day: Weekday, displayName: string }[] = [
    { day: 'sunday', displayName: 'Su' },
    { day: 'monday', displayName: 'Mo' },
    { day: 'tuesday', displayName: 'Tu' },
    { day: 'wednesday', displayName: 'We' },
    { day: 'thursday', displayName: 'Th' },
    { day: 'friday', displayName: 'Fr' },
    { day: 'saturday', displayName: 'Sa' }
  ];
  months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  uiMode = signal<'date' | 'month' | 'year'>('date');

  selectedDates = linkedSignal(() => this.value() ?? []);
  activeMonth = linkedSignal(() => (this.selectedDates().length > 0 ? this.selectedDates()[0] : new Date()).getMonth());
  activeYear = linkedSignal(() => (this.selectedDates().length > 0 ? this.selectedDates()[0] : new Date()).getFullYear());

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

      if (isEnabled && this.minDate()) {
        isEnabled = year >= this.minDate()!.getFullYear();
      }

      if (isEnabled && this.maxDate()) {
        isEnabled = isEnabled && year <= this.maxDate()!.getFullYear();
      }

      return { value: year, isEnabled };
    });
  });

  daysOfMonth = computed(() => {
    const daysInMonth = new Date(this.activeYear(), this.activeMonth() + 1, 0).getDate();

    return Array.from({ length: daysInMonth }, (_, i) => {
      const day = i + 1;
      const currentDate = new Date(this.activeYear(), this.activeMonth(), day);
      let isEnabled = true;

      if (this.allowOnlyFuture() && currentDate < new Date()) {
        isEnabled = false;
      }
      if (this.allowOnlyPast() && currentDate > new Date()) {
        isEnabled = false;
      }

      if (isEnabled && this.minDate()) {
        isEnabled = currentDate >= this.minDate()!;
      }
      if (isEnabled && this.maxDate()) {
        isEnabled = isEnabled && currentDate <= this.maxDate()!;
      }

      if (this.allowToday() && this.isToday(day)) {
        isEnabled = true;
      }

      const dayName = this.days[currentDate.getDay()];
      if (this.disabledDays()?.includes(dayName.day)) {
        isEnabled = false;
      }

      if (this.disabledDates()?.some(date => this.isSameDate(date, currentDate))) {
        isEnabled = false;
      }

      return { value: day, isEnabled };
    });
  });

  blankDays = computed(() => {
    return Array.from({ length: new Date(this.activeYear(), this.activeMonth()).getDay() }, (_, i) => i + 1);
  });





  isSameDate(date1: Date, date2: Date): boolean {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  }

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
    const selectedDate = new Date(this.activeYear(), this.activeMonth(), day);
    const dateIndex = this.selectedDates().findIndex(d => this.isSameDate(d, selectedDate));

    let updatedDates: Date[];
    if (dateIndex >= 0) {
      updatedDates = this.selectedDates().filter((_, i) => i !== dateIndex);
    } else {
      updatedDates = [...this.selectedDates(), selectedDate];
    }

    this.selectedDates.set(updatedDates);
    this.dateSelected.emit(updatedDates);
  }

  resetPicker(): void {
    this.selectedDates.set([]);
    const today = new Date();
    this.activeMonth.set(today.getMonth());
    this.activeYear.set(today.getFullYear());
  }

  isSelected(day: number): boolean {
    const d = new Date(this.activeYear(), this.activeMonth(), day);
    return this.selectedDates().some(date => date.toDateString() === d.toDateString());
  }

  previousMonthPressed() {
    switch (this.uiMode()) {
      case 'year':
        if (this.activeYear() > 24) {
          this.activeYear.update(y => y - 24);
        }
        break;
      case 'month':
        if (this.activeYear() > 1) {
          this.activeYear.update(y => y - 1);
        }
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
      default:
        console.warn('Unknown mode:', this.uiMode());
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
      default:
        console.warn('Unknown mode:', this.uiMode());
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
    return this.years()[0].value;
  }

  getLastYear() {
    return this.years()[this.years().length - 1].value;
  }

  clearAll(): void {
    this.resetPicker();
  }

  confirm(): void {
    this.confirmed.emit(this.selectedDates());
  }

  cancel(): void {
    this.cancelled.emit();
    this.resetPicker();
  }
}