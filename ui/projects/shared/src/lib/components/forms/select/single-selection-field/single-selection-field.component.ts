import {
  Component,
  forwardRef,
  input,
  signal,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-single-selection-field',
  standalone: true,
  imports: [NgClass, ReactiveFormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SingleSelectionFieldComponent),
      multi: true,
    },
  ],
  template: `
    <div class="flex flex-col w-full">
      @if (title()) {
        <label class="block text-sm font-medium text-gray-700 mb-1">
          {{ title() }}
        </label>
      }
      <select
        [disabled]="isDisabled()"
        (change)="onSelect($event)"
        (blur)="onTouched()"
        [ngClass]="[
          'block w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm bg-white h-[38px]',
          'focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500',
          isDisabled() ? 'bg-gray-100 cursor-not-allowed opacity-60' : ''
        ]"
      >
        <option value="">Select</option>
        @for (item of items(); track item) {
          <option [value]="getItemValue(item)" [selected]="getItemValue(item) === selectedValue()">
            {{ getItemDisplay(item) }}
          </option>
        }
      </select>
    </div>
  `,
})
export class SingleSelectionFieldComponent implements ControlValueAccessor {
  title = input<string | null>(null);
  items = input<any[]>([]);
  display = input<string>('label');
  value = input<string>('value');

  selectedValue = signal<any>(null);
  isDisabled = signal(false);

  private onChange: (value: any) => void = () => {};
  onTouched: () => void = () => {};

  getItemDisplay(item: any): string {
    return item?.[this.display()] ?? '';
  }

  getItemValue(item: any): any {
    return item?.[this.value()] ?? '';
  }

  onSelect(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.selectedValue.set(target.value);
    this.onChange(target.value);
  }

  writeValue(value: any): void {
    this.selectedValue.set(value ?? null);
  }

  registerOnChange(fn: (value: any) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled.set(isDisabled);
  }
}
