import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
  Renderer2,
  inject,
  input,
  output,
  signal,
  viewChild,
  computed,
  linkedSignal,
} from '@angular/core';
import { CdkConnectedOverlay, Overlay } from '@angular/cdk/overlay';
import { resolveTemplateWithObject } from '../../../../core/template-resolver';
import { deepEqual } from '../../../../core/core-utils';
import { BaseInput } from '../../../../core/base-input/base-input';
import { CommonModule } from '@angular/common';
import { getFirstSignalFormError } from '../../../../core/signal-form-errors';

export enum MultiSelectDropdownAppearance {
  standard,
  csv,
  chips,
}

@Component({
  selector: 'ui-multi-select-dropdown',
  standalone: true,
  imports: [BaseInput, CommonModule, CdkConnectedOverlay],
  templateUrl: './multi-select-dropdown-field.html',
})
export class MultiSelectDropdownField<T> {
  private cdr = inject(ChangeDetectorRef);
  private renderer = inject(Renderer2);
  private overlay = inject(Overlay);

  // Signal Forms (optional)
  field = input<any>();

  // Standalone mode (optional)
  value = input<any[]>([]);
  disabled = input<boolean>(false);

  // Inputs
  label = input<string | null>(null);
  options = input.required<T[]>();
  placeholder = input<string>('Select');
  displayProperty = input<string | null>(null);
  displayTemplate = input<string | null>(null);
  valueProperty = input<string>('');
  identifierProperty = input<string>('id');
  searchKey = input<string | null>(null);
  noDataMessage = input<string>('No options available');
  width = input<'sm' | 'md' | 'lg' | 'xl' | 'xxl' | '3xl' | 'full' | string>('md');
  size = input<'sm' | 'md' | 'lg'>('md');
  showErrorSpace = input<boolean>(true);
  enableSearch = input<boolean>(false);
  enableClientSearch = input<boolean>(true);
  addActionLabel = input<string | null>(null);
  minimumPopupWidth = input<number>(250);
  appearance = input<MultiSelectDropdownAppearance>(MultiSelectDropdownAppearance.standard);

  // Outputs
  addAction = output<void>();
  search = output<string>();
  valueChange = output<any[]>();

  // Signals
  isDropdownOpen = signal(false);
  highlightedIndex = signal(-1);
  isDropUp = signal(false);
  dropdownWidth = signal(300);
  filteredOptions = signal<T[]>([]);

  // Linked signal for standalone value
  internalValue = linkedSignal(() => this.value());

  // Computed signals for field state
  fieldState = computed(() => this.field() ? this.field()() : null);
  formValue = computed(() => this.fieldState()?.value() || []);
  isValid = computed(() => this.fieldState()?.valid() ?? true);
  isTouched = computed(() => this.fieldState()?.touched() ?? false);
  errors = computed(() => this.fieldState()?.errors() ?? []);

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

  // Linked signal that automatically updates selected items when displayValue changes
  selectedOptions = linkedSignal<T[]>(() => {
    const values = this.displayValue();
    if (!Array.isArray(values)) {
      return [];
    }
    return values
      .map((value) => this.getObjectFromValue(value))
      .filter((item): item is T => item != null);
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

  // ViewChild References
  private dropdownButton = viewChild.required<ElementRef<HTMLDivElement>>('dropdownButton');
  private dropdownListContainer = viewChild<ElementRef<HTMLDivElement>>('dropdownListContainer');
  private dropdownList = viewChild<ElementRef<HTMLDivElement>>('dropdownList');
  private searchField = viewChild<ElementRef<HTMLInputElement>>('searchField');

  // Overlay Configuration
  scrollStrategy = this.overlay.scrollStrategies.block();
  MultiSelectDropdownAppearance = MultiSelectDropdownAppearance;

  // Event Handlers
  protected onToggleDropdown(): void {
    if (this.isDisabled()) return;

    this.isDropdownOpen.update((prev) => !prev);
    if (this.isDropdownOpen()) {
      this.filteredOptions.set(this.options());
      this.updateHighlightedIndex();
      this.adjustDropdownPosition();
      this.updateDropdownWidth();
      this.cdr.detectChanges();
      this.setDropdownMaxHeight();
      this.scrollToHighlightedOption();

      if (this.enableSearch()) {
        const searchField = this.searchField()?.nativeElement;
        if (searchField) {
          searchField.focus();
        }
      }
    } else {
      if (this.field()) {
        this.fieldState()?.markAsTouched();
      }
    }
  }

  protected onItemSelect(item: T): void {
    if (this.field()) {
      this.fieldState()?.markAsTouched();
    }

    let updatedValue = (this.displayValue() as any[]) ?? [];
    const isSelected = this.isOptionSelected(item);

    if (isSelected) {
      if (this.valueProperty()) {
        const itemValue = this.getValue(item);
        updatedValue = updatedValue.filter(v => v !== itemValue);
      } else if (this.identifierProperty()) {
        const itemId = this.getIdentifier(item);
        updatedValue = updatedValue.filter(v => this.getIdentifier(this.getObjectFromValue(v)!) !== itemId);
      } else {
        updatedValue = updatedValue.filter(v => !deepEqual(v, item));
      }
    } else {
      if (this.valueProperty()) {
        updatedValue = [...updatedValue, this.getValue(item)];
      } else {
        updatedValue = [...updatedValue, item];
      }
    }

    this.updateValue(updatedValue);
  }

  protected onSearchInput(event: Event): void {
    const searchKeyword = (event.target as HTMLInputElement).value;
    if (this.enableSearch()) {
      if (this.enableClientSearch()) {
        this.updateFilteredOptions(searchKeyword);
      } else {
        this.search.emit(searchKeyword);
        this.filteredOptions.set(this.options());
      }
    } else {
      const firstMatch = this.findFirstMatch(searchKeyword);
      const index = this.filteredOptions().findIndex((item) => item === firstMatch);
      this.highlightedIndex.set(index);
    }
  }

  protected onClearSearch(): void {
    const searchField = this.searchField()?.nativeElement;
    if (searchField) {
      searchField.value = '';
      if (this.enableClientSearch()) {
        this.filteredOptions.set(this.options());
      } else {
        this.search.emit('');
      }
      this.highlightedIndex.set(0);
      this.scrollToHighlightedOption();
      searchField.focus();
    }
  }

  protected onSelectAll(): void {
    let updatedValue: any[];
    if (this.valueProperty()) {
      updatedValue = this.options().map(item => this.getValue(item));
    } else {
      updatedValue = [...this.options()];
    }
    this.updateValue(updatedValue);
  }

  protected onClearSelection(): void {
    const updatedValue: any[] = [];
    this.updateValue(updatedValue);
  }

  protected toggleSelectAll(event: Event): void {
    const checked = (event.target as HTMLInputElement).checked;
    if (checked) {
      this.onSelectAll();
    } else {
      this.onClearSelection();
    }
  }

  protected isAllSelected(): boolean {
    const controlValue = (this.displayValue() as any[]) ?? [];
    return this.options().length > 0 && this.options().every(item => this.isOptionSelected(item));
  }

  protected onAddAction(): void {
    this.addAction.emit();
  }

  protected onRemoveChip(item: T, event: Event): void {
    event.stopPropagation();
    this.onItemSelect(item);
  }

  @HostListener('window:resize')
  protected onWindowResize(): void {
    if (this.isDropdownOpen()) {
      this.adjustDropdownPosition();
    }
  }

  protected handleKeydown(event: KeyboardEvent): void {
    if (!this.isDropdownOpen()) return;

    switch (event.key) {
      case 'ArrowDown':
        if (this.highlightedIndex() < this.filteredOptions().length - 1) {
          this.highlightedIndex.update((prev) => prev + 1);
        }
        this.scrollToHighlightedOption();
        event.preventDefault();
        break;
      case 'ArrowUp':
        if (this.highlightedIndex() > 0) {
          this.highlightedIndex.update((prev) => prev - 1);
        }
        this.scrollToHighlightedOption();
        event.preventDefault();
        break;
      case 'Enter':
        if (this.filteredOptions()[this.highlightedIndex()]) {
          this.onItemSelect(this.filteredOptions()[this.highlightedIndex()]);
        }
        event.preventDefault();
        break;
      case 'Escape':
        this.isDropdownOpen.set(false);
        event.preventDefault();
        break;
    }

    if (!this.enableSearch() && event.key.length === 1 && /^[a-zA-Z]$/.test(event.key)) {
      const matchingIndex = this.filteredOptions().findIndex((item) => {
        const resolvedText = this.searchKey()
          ? resolveTemplateWithObject(item as any, `$${this.searchKey()}`)
          : this.getDisplayText(item);
        return resolvedText?.toLowerCase().startsWith(event.key.toLowerCase());
      });

      if (matchingIndex !== -1) {
        this.highlightedIndex.set(matchingIndex);
        this.scrollToHighlightedOption();
      }
    }
  }

  protected onClickOutside(): void {
    this.isDropdownOpen.set(false);
    if (this.field()) {
      this.fieldState()?.markAsTouched();
    }
  }

  // Utility Methods
  protected isOptionSelected(item: T): boolean {
    const controlValue = (this.displayValue() as any[]) ?? [];
    if (this.valueProperty()) {
      const itemValue = this.getValue(item);
      return controlValue.some(v => v === itemValue);
    } else if (this.identifierProperty()) {
      const itemId = this.getIdentifier(item);
      return controlValue.some(v => this.getIdentifier(this.getObjectFromValue(v)!) === itemId);
    }
    return controlValue.some(v => deepEqual(v, item));
  }

  protected getCsvDisplay(): string | null {
    const selected = this.selectedOptions();
    const csv = selected
      .map((item) => {
        const displayString = this.getDisplayText(item);
        return typeof displayString === 'string' ? displayString : '';
      })
      .filter((str) => str)
      .join(', ');

    return csv || null;
  }

  protected getDisplayText(item: T | null): string | null {
    if (!item) return null;

    if (this.displayProperty()) {
      return this.displayProperty()!.split('.').reduce((acc: any, part: string) => acc && acc[part], item) ?? null;
    }

    if (this.displayTemplate()) {
      return resolveTemplateWithObject(item as any, this.displayTemplate()!) ?? null;
    }

    return String(item);
  }

  private getValue(item: T): unknown {
    if (!this.valueProperty()) return item;
    return this.valueProperty().split('.').reduce((acc: any, part: string) => acc && acc[part], item);
  }

  private getObjectFromValue(v: unknown): T | undefined {
    if (!this.valueProperty()) return v as T;
    return this.options().find(item => this.getValue(item) === v);
  }

  private getIdentifier(item: T): unknown {
    if (!this.identifierProperty()) return item;
    if (typeof item !== 'object' || item === null) return item;
    return this.identifierProperty().split('.').reduce((acc: any, part: string) => acc && acc[part], item);
  }

  private updateValue(updatedValue: any[]): void {
    if (this.field()) {
      this.fieldState()?.value.set(updatedValue);
    } else {
      this.internalValue.set(updatedValue);
    }
    this.valueChange.emit(updatedValue);
    this.cdr.detectChanges();
  }

  private updateFilteredOptions(searchKeyword?: string): void {
    if (!searchKeyword || searchKeyword.trim() === '') {
      this.filteredOptions.set(this.options());
      this.highlightedIndex.set(0);
      return;
    }

    const filtered = this.options().filter((item) => {
      const displayString = this.getDisplayText(item);
      return typeof displayString === 'string' && displayString.toLowerCase().includes(searchKeyword.toLowerCase());
    });

    this.filteredOptions.set(filtered);
    this.updateHighlightedIndex();
  }

  private findFirstMatch(searchKeyword?: string): T | null {
    if (!searchKeyword || searchKeyword.trim() === '') return null;
    return (
      this.filteredOptions().find((item) => {
        const displayString = this.getDisplayText(item);
        return typeof displayString === 'string' && displayString.toLowerCase().includes(searchKeyword.toLowerCase());
      }) || null
    );
  }

  private updateHighlightedIndex(): void {
    this.highlightedIndex.set(0);
  }

  private updateDropdownWidth(): void {
    const buttonWidth = this.dropdownButton().nativeElement.offsetWidth;
    this.dropdownWidth.set(buttonWidth);
  }

  private setDropdownMaxHeight(): void {
    const buttonRect = this.dropdownButton().nativeElement.getBoundingClientRect();
    const spaceBelow = window.innerHeight - buttonRect.bottom;
    const spaceAbove = buttonRect.top;
    const maxHeight = this.isDropUp() ? spaceAbove - 36 : spaceBelow - 36;

    const dropdownListContainer = this.dropdownListContainer()?.nativeElement;
    if (dropdownListContainer) {
      this.renderer.setStyle(dropdownListContainer, 'max-height', `${maxHeight}px`);
    }
  }

  private adjustDropdownPosition(): void {
    const buttonRect = this.dropdownButton().nativeElement.getBoundingClientRect();
    const spaceBelow = window.innerHeight - buttonRect.bottom;
    const spaceAbove = buttonRect.top;
    this.isDropUp.set(spaceAbove > spaceBelow && spaceBelow < 200);
  }

  private scrollToHighlightedOption(): void {
    const dropdownList = this.dropdownList()?.nativeElement;
    if (dropdownList && dropdownList.children[this.highlightedIndex()]) {
      const highlightedItem = dropdownList.children[this.highlightedIndex()] as HTMLElement;
      highlightedItem.scrollIntoView({ block: 'nearest' });
    }
  }
}
