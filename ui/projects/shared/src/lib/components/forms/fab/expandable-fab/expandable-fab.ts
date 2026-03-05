import { Component, computed, input, signal, Signal, HostListener, effect } from '@angular/core';
import { NgClass } from '@angular/common';
import { AppSvgIcon } from '../../../misc/app-svg-icon/app-svg-icon';
import { FabMenuItem } from '../fab-menu-item.model';

@Component({
    selector: 'ui-expandable-fab',
    standalone: true,
    imports: [NgClass, AppSvgIcon],
    templateUrl: './expandable-fab.html',
})
export class ExpandableFab {
    // Inputs
    menuItems = input.required<FabMenuItem[]>();
    mainIconSrc = input.required<string>();
    expandedIconSrc = input<string>('assets/icons/close.svg');
    size = input<'sm' | 'md' | 'lg'>('md');
    color = input<string>('bg-primary-500');
    position = input<'bottom-right' | 'bottom-left' | 'top-right' | 'top-left'>('bottom-right');
    ariaLabel = input<string>('Expandable floating action button');
    iconSize = input<number>(24);
    menuItemIconSize = input<number>(20);

    // Internal signals
    isExpanded = signal<boolean>(false);

    // Computed signals
    protected mainButtonClass: Signal<string> = computed(() => {
        const base = 'fixed flex items-center justify-center rounded-full shadow-lg transition-all duration-200 hover:shadow-xl active:scale-95 z-[60]';

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

        return [base, sizeClass, positionClass, colorClass, 'cursor-pointer'].filter(Boolean).join(' ');
    });

    protected backdropClass: Signal<string> = computed(() => {
        const base = 'fixed inset-0 bg-black transition-opacity duration-200 z-[55]';
        const visibilityClass = this.isExpanded() ? 'opacity-30' : 'opacity-0 pointer-events-none';
        return [base, visibilityClass].join(' ');
    });

    protected menuContainerClass: Signal<string> = computed(() => {
        const base = 'fixed flex flex-col gap-3 z-[58] transition-all duration-200';

        const positionClass = {
            'bottom-right': 'bottom-24 right-6',
            'bottom-left': 'bottom-24 left-6',
            'top-right': 'top-24 right-6',
            'top-left': 'top-24 left-6'
        }[this.position()];

        const visibilityClass = this.isExpanded()
            ? 'opacity-100 scale-100'
            : 'opacity-0 scale-75 pointer-events-none';

        return [base, positionClass, visibilityClass].filter(Boolean).join(' ');
    });

    protected currentIconSrc: Signal<string> = computed(() => {
        return this.isExpanded() ? this.expandedIconSrc() : this.mainIconSrc();
    });

    toggle(): void {
        this.isExpanded.set(!this.isExpanded());
    }

    expand(): void {
        this.isExpanded.set(true);
    }

    collapse(): void {
        this.isExpanded.set(false);
    }

    onMenuItemClick(item: FabMenuItem, event: MouseEvent): void {
        if (item.disabled) {
            event.preventDefault();
            return;
        }

        item.action();
        this.collapse();
    }

    onBackdropClick(): void {
        this.collapse();
    }

    getMenuItemClass(item: FabMenuItem): string {
        const base = 'flex items-center gap-3 px-4 py-3 rounded-full shadow-md transition-all duration-200 hover:shadow-lg active:scale-95 bg-white';
        const disabledClass = item.disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer';
        return [base, disabledClass].filter(Boolean).join(' ');
    }

    @HostListener('document:keydown.escape')
    onEscapeKey(): void {
        if (this.isExpanded()) {
            this.collapse();
        }
    }
}
