import { NgClass } from '@angular/common';
import { Component, computed, input, linkedSignal, output, signal } from '@angular/core';
import { DateUtils } from '../../../date-utils';

@Component({
  selector: 'ui-month-year-selection',
  imports: [NgClass],
  templateUrl: './month-year-selection.html',
})
export class MonthYearSelection {
  minDate = input<Date | null>();
  maxDate = input<Date | null>();
  allowOnlyPast = input<boolean>(false);
  allowOnlyFuture = input<boolean>(false);
  value = input<Date | null>(null);

  monthYearSelected = output<Date>();

  months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];

  uiMode = signal<'month' | 'year'>('month');

  selectedDate = linkedSignal(() => this.value());
  activeMonth = linkedSignal(() => (this.value() && DateUtils.isValidDate(this.value()!) ? this.value()! : new Date()).getMonth());
  activeYear = linkedSignal(() => (this.value() && DateUtils.isValidDate(this.value()!) ? this.value()! : new Date()).getFullYear());

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
    const selectedDate = new Date(this.activeYear(), month, 1);
    this.activeMonth.set(month);
    this.selectedDate.set(selectedDate);
    this.monthYearSelected.emit(selectedDate);
  }

  isSelected(month: number): boolean {
    if (!this.selectedDate() || !DateUtils.isValidDate(this.selectedDate()!)) return false;
    const selDate = this.selectedDate()!;
    const d = new Date(this.activeYear(), month, 1);
    return selDate.getFullYear() === d.getFullYear() && selDate.getMonth() === d.getMonth();
  }

  isSelectedYear(year: number): boolean {
    if (!this.selectedDate() || !DateUtils.isValidDate(this.selectedDate()!)) return false;
    const selDate = this.selectedDate()!;
    return selDate.getFullYear() === year;
  }

  previousYearPressed() {
    if (this.uiMode() === 'year') {
      if (this.activeYear() > 24) {
        this.activeYear.update(y => y - 24);
      }
    } else {
      if (this.activeYear() > 1) this.activeYear.update(y => y - 1);
    }
  }

  nextYearPressed() {
    if (this.uiMode() === 'year') {
      this.activeYear.update(y => y + 24);
    } else {
      this.activeYear.update(y => y + 1);
    }
  }

  onYearSelectionPressed() {
    if (this.uiMode() === 'year') {
      this.uiMode.set('month');
    } else {
      this.uiMode.set('year');
    }
  }

  getFirstYear() {
    return this.years()[0]?.value ?? this.activeYear();
  }

  getLastYear() {
    return this.years()[this.years().length - 1]?.value ?? this.activeYear();
  }
}