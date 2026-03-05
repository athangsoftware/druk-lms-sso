import { Component, OnInit, OnDestroy, input, output, signal, computed, linkedSignal, effect } from '@angular/core';
import { Spinner } from '../../../feedback/spinner/spinner';
import { AppSvgIcon } from '../../../misc/app-svg-icon/app-svg-icon';
import { NgClass, NgStyle } from '@angular/common';
import { getFirstSignalFormError } from '../../../../core/signal-form-errors';

@Component({
    selector: 'ui-image-upload-field',
    standalone: true,
    imports: [Spinner, AppSvgIcon, NgClass, NgStyle],
    templateUrl: './image-upload-field.html',
})
export class ImageUploadField implements OnInit, OnDestroy {
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
    showErrorSpace = input<boolean>(true);
    rounded = input<boolean>(false); // For circle/avatar style if needed

    // Outputs
    fileSelect = output<File>();
    fileRemoved = output<void>();
    valueChange = output<File | string | null>();

    // Signals
    fileInputId = signal<string>('');
    onHover = signal(false);
    previewSrc = signal<string | null>(null);

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

    containerClasses = computed(() => {
        const base = 'relative flex items-center justify-center border-2 border-dashed border-neutral-300 hover:border-primary-500 overflow-hidden transition-colors cursor-pointer bg-neutral-50';
        const sizeClasses = {
            'sm': 'w-24 h-24',
            'md': 'w-32 h-32',
            'lg': 'w-48 h-48',
        };
        const roundedClass = this.rounded() ? 'rounded-full' : 'rounded-lg';
        const disabledClass = this.isDisabled() ? 'opacity-50 cursor-not-allowed hover:border-neutral-300' : '';
        const fullWidthClass = this.fullWidth() ? 'w-full aspect-video h-auto' : sizeClasses[this.size()];

        return `${base} ${roundedClass} ${disabledClass} ${fullWidthClass}`;
    });

    constructor() {
        // Effect to update preview when value changes
        effect(() => {
            const val = this.displayValue();
            if (!val) {
                this.previewSrc.set(null);
                return;
            }

            if (val instanceof File) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    this.previewSrc.set(e.target?.result as string);
                };
                reader.readAsDataURL(val);
            } else if (typeof val === 'string') {
                this.previewSrc.set(val);
            }
        });
    }

    ngOnInit(): void {
        this.fileInputId.set(this.generateUniqueId());
    }

    ngOnDestroy(): void {
        // Cleanup if needed
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

        // Reset the file input
        const input = document.getElementById(this.fileInputId()) as HTMLInputElement;
        if (input) {
            input.value = '';
        }
    }

    onContainerClick(): void {
        if (this.isDisabled() || this.uploading()) return;
        const input = document.getElementById(this.fileInputId()) as HTMLInputElement;
        input?.click();
    }

    onContainerKeydown(event: KeyboardEvent): void {
        if (this.isDisabled() || this.uploading()) return;
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            const input = document.getElementById(this.fileInputId()) as HTMLInputElement;
            input?.click();
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

    private generateUniqueId(): string {
        const randomNumber = Math.floor(1000 + Math.random() * 9000);
        return `image-input-${randomNumber}`;
    }
}
