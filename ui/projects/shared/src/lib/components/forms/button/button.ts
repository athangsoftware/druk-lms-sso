import { Component, computed, input, output, Signal, ElementRef, inject } from '@angular/core';
import { NgClass } from "@angular/common";
import { Spinner } from '../../feedback/spinner/spinner';
import { AppSvgIcon } from '../../misc/app-svg-icon/app-svg-icon';

@Component({
  selector: 'ui-button',
  standalone: true,
  imports: [
    NgClass,
    Spinner,
    AppSvgIcon
  ],
  templateUrl: './button.html',
})
export class Button {
  private elementRef = inject(ElementRef);

  type = input<'button' | 'submit' | 'reset'>('button');
  disabled = input<boolean>(false);
  fullWidth = input<boolean>(false);
  // Renamed 'textType' to 'text' for clarity and standard naming
  appearance = input<'text' | 'primary' | 'outline' | 'primaryRounded' | 'outlineRounded'>('primary');
  loading = input<boolean>(false);
  iconSize = input<number>(18);
  iconSrc = input<string | null>(null);
  iconColor = input<string | null>(null);
  buttonColor = input<string>('bg-primary-500');
  outlineColor = input<string>('border-primary-500');
  textButtonColor = input<string>('text-primary-500');
  size = input<'sm' | 'md' | 'lg'>('md');

  click = output<void>();

  protected buttonClass: Signal<string> = computed(() => {
    const base = 'inline-flex items-center justify-center text-button leading-5 transition-all duration-200';

    const sizeClass = {
      sm: 'px-4 py-2 text-sm',
      md: 'px-6 py-3 text-base',
      lg: 'px-6 py-4 text-lg'
    }[this.size()];

    let appearanceClass: string;
    switch (this.appearance()) {
      case 'primary':
        appearanceClass = `text-white rounded-md ${this.buttonColor()}`;
        break;
      case 'primaryRounded':
        appearanceClass = `text-white rounded-full ${this.buttonColor()}`;
        break;
      case 'outline':
        appearanceClass = `${this.textButtonColor()} rounded-md bg-white border ${this.outlineColor()} outline-none`;
        break;
      case 'outlineRounded':
        appearanceClass = `${this.textButtonColor()} rounded-full bg-white border ${this.outlineColor()} outline-none`;
        break;
      case 'text':
        // Removed duplicate 'rounded-md' and fixed for clarity
        appearanceClass = `${this.textButtonColor()} rounded-md border border-transparent bg-white outline-none focus:outline-none`;
        break;
      default:
        appearanceClass = '';
    }

    const disabledClass = this.disabled() || this.loading() ? 'cursor-not-allowed' : '';
    const fullWidthClass = this.fullWidth() ? 'w-full' : '';

    return [base, sizeClass, appearanceClass, disabledClass, fullWidthClass].filter(Boolean).join(' ');
  });

  protected iconClass: Signal<string> = computed(() => {
    if (this.iconColor() !== null) {
      return this.iconColor()!;
    }

    switch (this.appearance()) {
      case 'outline':
      case 'outlineRounded':
      case 'text':
        return 'text-primary-500';
      case 'primaryRounded':
      case 'primary':
      default:
        return 'text-white';
    }
  });

  protected loaderColor: Signal<string> = computed(() => {
    switch (this.appearance()) {
      case 'outline':
      case 'outlineRounded':
      case 'text':
        return 'border-primary-500';
      case 'primaryRounded':
      case 'primary':
      default:
        return 'border-white';
    }
  });

  onClick(event: MouseEvent): void {
    // Since [disabled] is set, this early return is precautionary
    if (this.loading() || this.disabled()) {
      event.preventDefault();
      event.stopImmediatePropagation();
      return;
    }

    // Stop native event propagation to prevent double firing
    // (once from native click bubbling, once from our emit)
    event.stopPropagation();

    // If this is a submit button, mark all form fields as touched
    if (this.type() === 'submit') {
      this.markAllFormFieldsAsTouched();
    }

    this.click.emit();
  }

  private markAllFormFieldsAsTouched(): void {
    try {
      // Find the parent form element
      const buttonElement = this.elementRef.nativeElement as HTMLElement;
      const formElement = buttonElement.closest('form');

      if (!formElement) {
        return;
      }

      // Find all elements with [field] attribute (Signal Form fields)
      // We look for the common 'ui-field' class (Best Practice) or specific tags (Legacy/Fallback)
      const fieldElements = formElement.querySelectorAll('.ui-field, ui-text-field, ui-textarea-field, ui-date-field, ui-checkbox-field, ui-radio-group-field, ui-select-field, ui-upload-field, ui-multi-select-dropdown-field, ui-date-prefix-select-field');

      fieldElements.forEach((element: Element) => {
        try {
          // Try to get component instance using standard Angular dev tools hook if available
          let componentInstance: any = (window as any).ng?.getComponent(element);

          // Fallback to internal context if ng.getComponent is not available
          if (!componentInstance) {
            componentInstance = (element as any).__ngContext__?.[8];
          }

          if (componentInstance) {
            // Check if it has a field input signal
            if (typeof componentInstance.field === 'function') {
              const fieldSignal = componentInstance.field();

              if (fieldSignal) {
                // The field signal value itself is a signal (e.g. userForm.name)
                // We need to unwrap it to get the field state object
                const fieldState = typeof fieldSignal === 'function' ? fieldSignal() : fieldSignal;

                if (fieldState && typeof fieldState.markAsTouched === 'function') {
                  fieldState.markAsTouched();
                }
              }
            }
          }
        } catch (error) {
          console.error('Error marking field as touched:', error);
        }
      });
    } catch (error) {
      console.error('Error in markAllFormFieldsAsTouched:', error);
    }
  }
}