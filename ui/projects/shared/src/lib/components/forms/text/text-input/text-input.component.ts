import {
  Component,
  forwardRef,
  input,
  signal,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-text-input',
  standalone: true,
  imports: [NgClass, ReactiveFormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextInputComponent),
      multi: true,
    },
  ],
  template: `
    <div class="flex flex-col" [class.w-full]="fullWidth()">
      @if (label()) {
        <label class="block text-sm font-medium text-gray-700 mb-1">
          {{ label() }}
        </label>
      }
      <input
        [type]="type()"
        [placeholder]="placeholder()"
        [disabled]="isDisabled()"
        [value]="value()"
        (input)="onInput($event)"
        (blur)="onTouched()"
        [ngClass]="[
          'block rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm',
          'placeholder-gray-400 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500',
          fullWidth() ? 'w-full' : 'w-64',
          isDisabled() ? 'bg-gray-100 cursor-not-allowed opacity-60' : 'bg-white'
        ]"
      />
    </div>
  `,
})
export class TextInputComponent implements ControlValueAccessor {
  label = input<string | null>(null);
  placeholder = input<string>('');
  type = input<string>('text');
  fullWidth = input<boolean>(false);

  value = signal('');
  isDisabled = signal(false);

  private onChange: (value: string) => void = () => {};
  onTouched: () => void = () => {};

  onInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.value.set(target.value);
    this.onChange(target.value);
  }

  writeValue(value: string): void {
    this.value.set(value ?? '');
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled.set(isDisabled);
  }
}
