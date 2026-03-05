import { CommonModule, NgClass } from '@angular/common';
import { Component, computed, input, output, signal, linkedSignal, inject, viewChild, ElementRef } from '@angular/core';
import { OverlayStore } from '../../../overlay/overlay';
import { DatePrefixDropdown } from './date-prefix-dropdown';
import { BaseInput } from '../../../../core/base-input/base-input';
import { DatePicker } from '../date-picker/date-picker';
import { DateRangePicker } from '../date-range-picker/date-range-picker';
import { DateRangeEvent } from '../date-range-picker/date-range-overlay/date-range-selection/date-range-selection';
import { InputDateFormat } from '../date-format';
import { getFirstSignalFormError } from '../../../../core/signal-form-errors';

export interface DatePrefixSelectOption {
    value: string;
    label: string;
    icon?: string;
    fullName?: string;
    isRange: boolean;
}

@Component({
    selector: 'ui-date-prefix-select-field',
    imports: [
        CommonModule,
        BaseInput,
        NgClass,
        DatePicker,
        DateRangePicker
    ],
    templateUrl: './date-prefix-select-field.html',
})
export class DatePrefixSelectField {
    private overlayStore = inject(OverlayStore);

    prefixButton = viewChild<ElementRef>('prefixButton');

    // Inputs
    field = input<any>(); // Signal Form Field
    value = input<Date | DateRangeEvent | null>(null); // Standalone Value

    label = input<string | null>(null);
    width = input<'sm' | 'md' | 'lg' | 'xl' | 'xxl' | '3xl' | 'full' | string>('md');
    size = input<'sm' | 'md' | 'lg'>('md');
    placeholder = input<string>('');
    showErrorSpace = input<boolean>(false);
    hasPrefixSelect = input<boolean>(false);
    prefixOptions = input<DatePrefixSelectOption[]>([]);
    defaultPrefixValue = input<string | null>(null);
    iconSrc = input<string | null>(null);
    showDatePickerIcon = input<boolean>(true);
    inputDateFormat = input<InputDateFormat>(InputDateFormat.ddmmyyyy);
    minDate = input<Date | null>(null);
    maxDate = input<Date | null>(null);
    allowOnlyPast = input<boolean>(false);
    allowOnlyFuture = input<boolean>(false);

    // Outputs
    prefixChange = output<string>();
    valueChange = output<Date | DateRangeEvent | null>();

    // Internal State
    prefixValue = linkedSignal(() => {
        const def = this.defaultPrefixValue();
        const options = this.prefixOptions();
        return def ?? options[0]?.value ?? '';
    });
    isFocused = signal(false);
    isPrefixDropdownOpen = signal<boolean>(false);

    // Linked Signal for Standalone Value
    internalValue = linkedSignal(() => this.value());

    // Signal Forms State
    fieldState = computed(() => this.field() ? this.field()() : null);

    // Unified Value Access
    currentValue = computed(() => {
        if (this.field()) {
            return this.fieldState()?.value();
        }
        return this.internalValue();
    });

    // Computed Properties
    isRange = computed(() => {
        const prefixVal = this.prefixValue();
        const selectedOption = this.prefixOptions().find(option => option.value === prefixVal);
        return selectedOption?.isRange ?? false;
    });

    isDisabled = computed(() => this.fieldState()?.disabled() ?? false);
    isTouched = computed(() => this.fieldState()?.touched() ?? false);
    errors = computed(() => this.fieldState()?.errors() ?? []);
    hasErrors = computed(() => this.isTouched() && this.errors().length > 0);
    errorMessage = computed(() => getFirstSignalFormError(this.errors(), this.label()));

    sizeClasses = computed(() => {
        switch (this.size()) {
            case 'sm': return 'h-8 text-sm';
            case 'lg': return 'h-12 text-lg';
            default: return 'h-10 text-sm';
        }
    });

    // Child Field Proxy
    childField = computed(() => {
        const state = {
            value: (() => {
                const s = () => this.currentValue();
                (s as any).set = (v: any) => this.updateValue(v);
                (s as any).update = (fn: any) => this.updateValue(fn(this.currentValue()));
                (s as any).asReadonly = () => signal(this.currentValue()).asReadonly();
                return s;
            })(),
            valid: signal(this.fieldState()?.valid() ?? true),
            touched: signal(this.isTouched()),
            disabled: signal(this.isDisabled()),
            errors: signal(this.errors()),
            markAsTouched: () => {
                if (this.field()) this.fieldState()?.markAsTouched();
            }
        };
        return () => state;
    });

    selectedPrefixLabel = computed(() => {
        const options = this.prefixOptions();
        const currentValue = this.prefixValue();
        const option = options.find(opt => opt.value === currentValue);
        return option?.label || '';
    });

    selectedPrefixIcon = computed(() => {
        const options = this.prefixOptions();
        const currentValue = this.prefixValue();
        const option = options.find(opt => opt.value === currentValue);
        return option?.icon || option?.label || '';
    });

    async onTogglePrefixDropdown(): Promise<void> {
        if (this.isDisabled()) return;

        this.isPrefixDropdownOpen.set(true);
        const trigger = this.prefixButton()?.nativeElement;

        if (!trigger) return;

        const result = await this.overlayStore.openNearElement(
            DatePrefixDropdown,
            trigger,
            {
                data: {
                    options: this.prefixOptions(),
                    currentValue: this.prefixValue()
                },
                positionPreference: 'bottomRight',
                backdropOptions: {
                    backdropClass: ['bg-transparent']
                },
                panelClass: ['rounded-none'],
                onClose: () => this.isPrefixDropdownOpen.set(false)
            }
        );

        if (result) {
            this.onPrefixSelect(result);
        }
    }

    onPrefixSelect(value: string): void {
        this.prefixValue.set(value);
        this.prefixChange.emit(value);
        // Reset value on prefix change (mode switch)
        this.updateValue(null);
    }

    updateValue(value: any) {
        if (this.field()) {
            this.fieldState()?.value.set(value);
        } else {
            this.internalValue.set(value);
        }
        this.valueChange.emit(value);
    }

    private focusTimeout: any;

    onFocus() {
        clearTimeout(this.focusTimeout);
        this.isFocused.set(true);
    }

    onBlur() {
        this.focusTimeout = setTimeout(() => {
            this.isFocused.set(false);
            if (this.field()) this.fieldState()?.markAsTouched();
        }, 50);
    }
}
