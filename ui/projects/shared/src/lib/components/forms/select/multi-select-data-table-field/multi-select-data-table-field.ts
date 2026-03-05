import { Component, computed, input, inject, signal, linkedSignal, output } from '@angular/core';
import { BaseInput } from '../../../../core/base-input/base-input';
import { getFirstSignalFormError } from '../../../../core/signal-form-errors';
import { OverlayStore } from '../../../overlay/overlay';
import { MultiSelectDataTableDialog } from './multi-select-data-table-dialog/multi-select-data-table-dialog';
import { ColumnNode, TableStateEvent } from '../../../../components/display/data-table/data-table-model';

@Component({
  selector: 'ui-multi-select-data-table-field',
  standalone: true,
  imports: [BaseInput],
  templateUrl: './multi-select-data-table-field.html',
})
export class MultiSelectDataTableField<T> {
  // Signal Forms (optional)
  field = input<any>();

  // Standalone mode (optional)
  value = input<any[]>([]);

  // Inputs
  label = input<string | null>(null);
  placeholder = input<string>('');
  columns = input<ColumnNode[]>([]);
  data = input<T[]>([]);
  valueProperty = input<string>('id');
  displayProperty = input<string>('name');
  width = input<'sm' | 'md' | 'lg' | 'xl' | 'xxl' | '3xl' | 'full' | string>('md');
  enablePagination = input<boolean>(false);
  pageSize = input<number>(10);
  enableSearch = input<boolean>(true);
  showErrorSpace = input<boolean>(true);
  totalCount = input<number>(0);
  overlayType = input<'modal' | 'fullscreen' | 'bottomsheet' | 'backdrop'>('modal');

  // Outputs
  tableStateChange = output<TableStateEvent>();
  valueChange = output<any[]>();

  // Signals
  isFocused = linkedSignal(() => false);

  // Linked signal for standalone value
  internalValue = linkedSignal(() => this.value());

  // Computed signals for field state
  fieldState = computed(() => this.field() ? this.field()() : null);
  formValue = computed(() => this.fieldState()?.value() || []);
  isValid = computed(() => this.fieldState()?.valid() ?? true);
  isTouched = computed(() => this.fieldState()?.touched() ?? false);
  errors = computed(() => this.fieldState()?.errors() ?? []);
  isDisabled = computed(() => this.fieldState()?.disabled() ?? false);

  // Use form value if available, otherwise use standalone value
  displayValue = computed(() => {
    if (this.field()) {
      return this.formValue();
    }
    return this.internalValue();
  });

  hasRequiredValidator = computed(() => {
    const errs = this.errors();
    return errs.some((err: any) => err.kind === 'required');
  });

  hasErrors = computed(() => this.isTouched() && this.errors().length > 0);

  errorMessage = computed(() => {
    return getFirstSignalFormError(this.errors(), this.label());
  });

  // Linked signal that automatically updates selected items when displayValue changes
  selectedItems = linkedSignal<T[]>(() => {
    const values = this.displayValue();
    if (!Array.isArray(values)) {
      return [];
    }
    return values
      .map((value) => this.getObjectUsingIdentifierValue(value))
      .filter((item): item is T => item !== undefined);
  });

  displayText = computed(() => {
    const items = this.selectedItems();
    if (!items.length) return '';
    return items.map((item) => this.getDisplayString(item)).join(', ');
  });

  private overlayService = inject(OverlayStore);

  constructor() {
    // All effects related to selectedItems and internalValue are now handled by linkedSignal initializers.
  }

  private getObjectUsingIdentifierValue(value: any): T | undefined {
    const identifierPath = this.valueProperty();
    return this.data().find((item) => {
      const propertyValue = identifierPath.split('.').reduce((acc, part) => acc && acc[part], item as any);
      return propertyValue === value;
    });
  }

  private getDisplayString(item: T): string {
    if (!item) return '';
    const object = item as any;
    return this.displayProperty().split('.').reduce((acc, part) => acc && acc[part], object) || '';
  }

  openDialog(): void {
    const dialogData = {
      title: this.label() || 'Select Items',
      columns: this.columns(),
      data: this.data(),
      totalCount: this.totalCount(),
      valueProperty: this.valueProperty(),
      displayProperty: this.displayProperty(),
      enablePagination: this.enablePagination(),
      pageSize: this.pageSize(),
      enableSearch: this.enableSearch(),
      initialValue: this.displayValue(),
      stateChange: this.tableStateChange,
    };

    let dialogPromise: Promise<any>;

    switch (this.overlayType()) {
      case 'fullscreen':
        dialogPromise = this.overlayService.openFullScreen(MultiSelectDataTableDialog, {
          disableClose: false,
          data: dialogData,
        });
        break;
      case 'bottomsheet':
        dialogPromise = this.overlayService.openBottomSheet(MultiSelectDataTableDialog, {
          disableClose: false,
          data: dialogData,
        });
        break;
      case 'backdrop':
        dialogPromise = this.overlayService.openBackdrop(MultiSelectDataTableDialog, {
          disableClose: false,
          data: dialogData,
        });
        break;
      case 'modal':
      default:
        dialogPromise = this.overlayService.openModal(MultiSelectDataTableDialog, {
          disableClose: false,
          maxHeightClass: 'max-h-[80vh]',
          data: dialogData,
        });
        break;
    }

    dialogPromise.then((result: any[] | any) => {
      if (result !== undefined) {
        if (this.field()) {
          this.fieldState()?.value.set(result);
        } else {
          this.internalValue.set(result);
        }
        this.valueChange.emit(result);
      }
    });
  }

  clearAll(event: Event): void {
    event.stopPropagation();
    if (this.field()) {
      this.fieldState()?.value.set([]);
    } else {
      this.internalValue.set([]);
    }
    this.valueChange.emit([]);
  }

  onFocus(): void {
    this.isFocused.set(true);
  }

  onBlur(): void {
    if (this.field()) {
      this.fieldState()?.markAsTouched();
    }
    this.isFocused.set(false);
  }
}