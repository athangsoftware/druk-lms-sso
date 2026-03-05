import { Component, OnInit, input, output, signal, computed, linkedSignal } from '@angular/core';
import { Spinner } from '../../../feedback/spinner/spinner';
import { AppSvgIcon } from '../../../misc/app-svg-icon/app-svg-icon';
import { NgClass } from '@angular/common';
import { getFirstSignalFormError } from '../../../../core/signal-form-errors';

@Component({
  selector: 'ui-upload-field',
  standalone: true,
  imports: [Spinner, AppSvgIcon, NgClass],
  templateUrl: './upload-field.html',
})
export class UploadField implements OnInit {
  // Signal Forms (optional)
  field = input<any>();

  // Standalone mode (optional)
  value = input<File | string | null>(null);
  disabled = input<boolean>(false);

  // Inputs
  fullWidth = input(false);
  label = input<string | null>(null);
  size = input<'sm' | 'md' | 'lg'>('md');
  uploading = input(false);
  enableUploadLater = input(false);
  markedUploadLater = input(false);
  showErrorSpace = input<boolean>(true);

  // Outputs
  fileSelect = output<File>();
  fileRemoved = output<void>();
  uploadLaterClicked = output<void>();
  valueChange = output<File | string | null>();

  // Signals
  fileInputId = signal<string>('');
  onHover = signal(false);

  // Linked signal for standalone value
  internalValue = linkedSignal(() => this.value());

  // Computed signals for field state
  fieldState = computed(() => this.field() ? this.field()() : null);
  formValue = computed(() => this.fieldState()?.value() ?? null);
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

  hasRequiredValidator = computed(() => {
    const errs = this.errors();
    return errs.some((err: any) => err.kind === 'required');
  });

  hasErrors = computed(() => this.isTouched() && this.errors().length > 0);

  errorMessage = computed(() => {
    return getFirstSignalFormError(this.errors(), this.label());
  });

  sizeClasses = computed(() => {
    switch (this.size()) {
      case 'sm':
        return 'px-3 py-2';
      case 'lg':
        return 'px-5 py-5';
      default:
        return 'px-4 py-4';
    }
  });

  iconSize = computed(() => {
    switch (this.size()) {
      case 'sm':
        return 20;
      case 'lg':
        return 28;
      default:
        return 24;
    }
  });

  ngOnInit(): void {
    this.fileInputId.set(this.generateUniqueId());
  }

  onFileChange(event: Event): void {
    if (this.isDisabled()) return;

    const input = event.target as HTMLInputElement;
    const files = input.files;
    if (files && files.length > 0) {
      const firstFile = files[0];

      if (this.field()) {
        // Signal Forms mode
        this.fieldState()?.value.set(firstFile);
        this.fieldState()?.markAsTouched();
      } else {
        // Standalone mode
        this.internalValue.set(firstFile);
      }

      this.fileSelect.emit(firstFile);
      this.valueChange.emit(firstFile);
    }
  }

  onRemoveFileClicked(event: MouseEvent): void {
    event.stopPropagation();
    if (this.isDisabled()) return;

    if (this.field()) {
      // Signal Forms mode
      this.fieldState()?.value.set(null);
      this.fieldState()?.markAsTouched();
    } else {
      // Standalone mode
      this.internalValue.set(null);
    }

    this.fileRemoved.emit();
    this.valueChange.emit(null);

    // Reset the file input to allow re-selecting the same file
    const input = document.getElementById(this.fileInputId()) as HTMLInputElement;
    if (input) {
      input.value = '';
    }
  }

  onViewFileClicked(event: MouseEvent): void {
    event.stopPropagation();
    const value = this.displayValue();
    if (!value) return;

    if (value instanceof File) {
      const url = URL.createObjectURL(value);
      window.open(url, '_blank');
      setTimeout(() => URL.revokeObjectURL(url), 100);
    } else if (typeof value === 'string') {
      window.open(value, '_blank');
    }
  }

  onContainerClick(): void {
    if (this.isDisabled() || this.uploading() || this.markedUploadLater() || this.displayValue()) return;
    const input = document.getElementById(this.fileInputId()) as HTMLInputElement;
    input?.click();
  }

  onContainerKeydown(event: KeyboardEvent): void {
    if (this.isDisabled() || this.uploading() || this.markedUploadLater() || this.displayValue()) return;
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      const input = document.getElementById(this.fileInputId()) as HTMLInputElement;
      input?.click();
    }
  }

  getFileName(): string {
    const value = this.displayValue();
    if (!value) return '';
    if (value instanceof File) return value.name;
    if (typeof value === 'string') return this.getFileNameFromUrl(value);
    return '';
  }

  private getFileNameFromUrl(url: string): string {
    try {
      const parsedUrl = new URL(url);
      return decodeURIComponent(parsedUrl.pathname.split('/').pop() || '');
    } catch {
      return decodeURIComponent(url.split('/').pop() || '');
    }
  }

  onMouseEnter(): void {
    if (!this.isDisabled()) {
      this.onHover.set(true);
    }
  }

  onMouseLeave(): void {
    this.onHover.set(false);
  }

  onUploadLaterClick(event: MouseEvent): void {
    event.stopPropagation();
    if (!this.isDisabled()) {
      this.uploadLaterClicked.emit();
    }
  }

  private generateUniqueId(): string {
    const randomNumber = Math.floor(1000 + Math.random() * 9000);
    return `file-input-${randomNumber}`;
  }
}