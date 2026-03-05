import {
  Component,
  input,
  signal,
  computed,
  output,
  linkedSignal,
} from '@angular/core';
import { getFirstSignalFormError } from '../../../../core/signal-form-errors';

@Component({
  selector: 'ui-checkbox-field',
  standalone: true,
  imports: [],
  templateUrl: './checkbox-field.html',
})
export class CheckboxField {
  // Signal Forms (optional)
  field = input<any>();

  // Standalone mode (optional)
  value = input<boolean>(false);

  // Inputs
  label = input<string | null>(null);
  indeterminate = input<boolean>(false);
  disabled = input<boolean>(false);

  // Outputs
  valueChange = output<boolean>();

  // Signals
  checkboxId = signal<string>(`checkbox-${Math.floor(1000 + Math.random() * 9000)}`);

  // Linked signal for standalone value
  internalValue = linkedSignal(() => this.value());

  // Computed signals for field state
  fieldState = computed(() => this.field() ? this.field()() : null);
  formValue = computed(() => this.fieldState()?.value() ?? false);
  isValid = computed(() => this.fieldState()?.valid() ?? true);
  isTouched = computed(() => this.fieldState()?.touched() ?? false);
  errors = computed(() => this.fieldState()?.errors() ?? []);

  // Disabled state: check input or form state
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

  hasErrors = computed(() => this.isTouched() && this.errors().length > 0);

  errorMessage = computed(() => {
    return getFirstSignalFormError(this.errors(), this.label());
  });

  onCheckboxChange(event: Event): void {
    if (this.isDisabled()) return;

    const checkbox = event.target as HTMLInputElement;
    const newValue = checkbox.checked;

    this.updateValue(newValue);
  }

  onKeydown(event: KeyboardEvent): void {
    if (event.key === 'Enter' && !this.isDisabled()) {
      event.preventDefault();
      const newValue = !this.displayValue();
      this.updateValue(newValue);
    }
  }

  private updateValue(newValue: boolean): void {
    if (this.field()) {
      this.fieldState()?.markAsTouched();
      this.fieldState()?.value.set(newValue);
    } else {
      this.internalValue.set(newValue);
    }
    this.valueChange.emit(newValue);
  }
}
