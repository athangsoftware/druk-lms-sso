import { Component, computed, input, output, Signal } from '@angular/core';
import { NgClass } from '@angular/common';
import { Spinner } from '../../feedback/spinner/spinner';
import { AppSvgIcon } from '../../misc/app-svg-icon/app-svg-icon';

@Component({
    selector: 'ui-fab',
    standalone: true,
    imports: [NgClass, Spinner, AppSvgIcon],
    templateUrl: './fab.html',
})
export class Fab {
    // Inputs
    iconSrc = input.required<string>();
    size = input<'sm' | 'md' | 'lg'>('md');
    color = input<string>('bg-primary-500');
    disabled = input<boolean>(false);
    loading = input<boolean>(false);
    position = input<'bottom-right' | 'bottom-left' | 'top-right' | 'top-left'>('bottom-right');
    ariaLabel = input<string>('Floating action button');
    iconSize = input<number>(24);

    // Output
    click = output<void>();

    // Computed signals
    protected buttonClass: Signal<string> = computed(() => {
        const base = 'fixed flex items-center justify-center rounded-full shadow-lg transition-all duration-200 hover:shadow-xl active:scale-95 z-50';

        const sizeClass = {
            sm: 'w-12 h-12',
            md: 'w-14 h-14',
            lg: 'w-16 h-16'
        }[this.size()];

        const positionClass = {
            'bottom-right': 'bottom-6 right-6',
            'bottom-left': 'bottom-6 left-6',
            'top-right': 'top-6 right-6',
            'top-left': 'top-6 left-6'
        }[this.position()];

        const colorClass = this.color();
        const disabledClass = this.disabled() || this.loading() ? 'cursor-not-allowed opacity-50' : 'cursor-pointer';

        return [base, sizeClass, positionClass, colorClass, disabledClass].filter(Boolean).join(' ');
    });

    protected iconClass: Signal<string> = computed(() => {
        return this.loading() ? 'text-transparent' : 'text-white';
    });

    protected loaderColor: Signal<string> = computed(() => {
        return 'border-white';
    });

    onClick(event: MouseEvent): void {
        if (this.loading() || this.disabled()) {
            event.preventDefault();
            event.stopImmediatePropagation();
            return;
        }

        event.stopPropagation();
        this.click.emit();
    }
}
