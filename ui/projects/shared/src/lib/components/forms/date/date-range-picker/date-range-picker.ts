import {
  Component,
  ElementRef,
  inject,
  input,
  OnDestroy,
  OnInit,
  signal,
  ViewChild,
  computed,
  ChangeDetectorRef,
} from "@angular/core";
import { getFirstSignalFormError } from "../../../../core/signal-form-errors";
import { NgClass } from "@angular/common";
import { Subscription } from "rxjs";
import { isValidDate } from "rxjs/internal/util/isDate";
import { DateRangeOverlay } from "./date-range-overlay/date-range-overlay";
import { BaseInput } from "../../../../core/base-input/base-input";
import { AppSvgIcon } from "../../../misc/app-svg-icon/app-svg-icon";
import { OverlayStore } from "../../../overlay/overlay";
import { DateRangeEvent } from "./date-range-overlay/date-range-selection/date-range-selection";
import { InputDateFormat } from "../date-format";


@Component({
  selector: "ui-date-range-picker",
  standalone: true,
  imports: [
    NgClass,
    BaseInput,
    AppSvgIcon,
  ],
  templateUrl: "./date-range-picker.html",
})
export class DateRangePicker implements OnInit, OnDestroy {
  @ViewChild("trigger", { static: false }) trigger?: ElementRef;
  @ViewChild("inputContainer", { static: false }) inputContainer?: ElementRef;

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
  allowToday = input<boolean>(false);
  minDaysRange = input<number | null>(null);
  maxDaysRange = input<number | null>(null);
  inputDateFormat = input<InputDateFormat>(InputDateFormat.ddmmyyyy);
  borderless = input<boolean>(false);
  errorMessages = input<{ [key: string]: string }>({});

  // Signal Forms
  field = input.required<any>();

  // Inputs for state
  disabled = input<boolean>(false);

  overlayService = inject(OverlayStore);
  private cdr = inject(ChangeDetectorRef);

  isFocused = signal(false);

  // Computed signals for field state
  fieldState = computed(() => this.field()());
  value = computed(() => this.fieldState().value());
  isValid = computed(() => this.fieldState().valid());
  isTouched = computed(() => this.fieldState().touched());
  errors = computed(() => this.fieldState().errors());
  isDisabled = computed(() => this.fieldState().disabled());

  // Helper for Signal Forms error message
  errorMessage = computed(() => {
    return getFirstSignalFormError(this.errors(), this.label());
  });

  // Use computed for the text display - this prevents NG0100
  textInputValue = computed(() => {
    const value = this.value();
    return value ? this.formatDateRange(value) : "";
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

  constructor() { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  hasRequiredValidator = computed(() => {
    const errs = this.errors();
    return errs.some((err: any) => err.kind === 'required');
  });

  hasErrors = computed(() => this.isTouched() && this.errors().length > 0);

  get placeHolder(): string {
    switch (this.inputDateFormat()) {
      case InputDateFormat.mmddyyyy:
        return "mm/dd/yyyy";
      case InputDateFormat.ddmmyyyy:
        return "dd/mm/yyyy";
    }
  }

  getClass() {
    let cls = "";
    if (this.iconSrc()) {
      cls += "pl-10";
    } else {
      cls += "pl-3";
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
    this.fieldState().markAsTouched();
    const currentValue = this.value();


    const dialogData = {
      data: {
        selectedRange: currentValue,
        minDate: this.minDate(),
        maxDate: this.maxDate(),
        allowOnlyPast: this.allowOnlyPast(),
        allowOnlyFuture: this.allowOnlyFuture(),
        allowToday: this.allowToday(),
        minDaysRange: this.minDaysRange(),
        maxDaysRange: this.maxDaysRange(),
      },
      positionPreference: "bottom",
    };

    let result: DateRangeEvent | undefined | null;
    const triggerElement = this.trigger?.nativeElement || this.inputContainer?.nativeElement;

    if (!triggerElement) {
      console.warn(
        "Trigger element is not available. Opening overlay without positioning."
      );
      result = await this.overlayService.openModal(
        DateRangeOverlay,
        dialogData
      );
    } else {
      result = await this.overlayService.openNearElement(
        DateRangeOverlay,
        triggerElement,
        {
          data: dialogData.data,
          disableClose: false,
          positionPreference: "bottomLeft",
        }
      );
    }

    console.log('Dialog closed with range:', result); // Debug log

    if (result?.startDate && result?.endDate) {
      if (isValidDate(result.startDate) && isValidDate(result.endDate)) {
        console.log('Setting valid range:', result); // Debug log
        // Force update both signals and form control
        this.updateValueFromPicker(result);
      } else {
        console.error("Invalid date range selected:", result);
        this.updateValueFromPicker(null);
      }
    } else if (result === null || result === undefined) {
      // Handle explicit null/undefined (user cleared selection)
      console.log('Clearing range'); // Debug log
      this.updateValueFromPicker(null);
    }
  }

  // Dedicated method for picker updates to ensure proper state sync
  private updateValueFromPicker(range: DateRangeEvent | null): void {
    // Update field signal directly via the state's value signal
    this.fieldState().value.set(range);
    this.fieldState().markAsTouched();

    // Force change detection in zoneless Angular
    this.cdr.detectChanges();

    console.log('Updated value:', range, 'Display text:', this.textInputValue()); // Debug log
  }

  clearRange() {
    this.updateValueFromPicker(null);
  }

  formatDateRange(range: DateRangeEvent | null): string {
    if (!range || !range.startDate || !range.endDate) {
      return "";
    }

    const formatDate = (date: Date) => {
      const mm = String(date.getMonth() + 1).padStart(2, "0");
      const dd = String(date.getDate()).padStart(2, "0");
      const yyyy = date.getFullYear();
      return this.inputDateFormat() === InputDateFormat.mmddyyyy
        ? `${mm}/${dd}/${yyyy}`
        : `${dd}/${mm}/${yyyy}`;
    };
    return `${formatDate(range.startDate)} - ${formatDate(range.endDate)}`;
  }
}