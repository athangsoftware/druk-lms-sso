import { Component, computed, inject, input, output, PLATFORM_ID, signal, DestroyRef } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { SideMenuItem, NavTheme } from '../nav-model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { isPlatformBrowser } from '@angular/common';
import { AppSvgIcon } from '../../../misc/app-svg-icon/app-svg-icon';
import { filter } from 'rxjs';
import { TooltipDirective } from '../../../overlay/tooltip/tooltip.directive';
import { TooltipPosition, TooltipTheme } from '../../../overlay/tooltip/tooltip.enums';

@Component({
  selector: 'ui-side-nav-menu',
  standalone: true,
  imports: [AppSvgIcon, TooltipDirective, RouterLink, RouterLinkActive],
  templateUrl: './side-nav-menu.html',
})
export class SideNavMenu {
  private router = inject(Router);
  private platformId = inject(PLATFORM_ID);
  private destroyRef = inject(DestroyRef);

  // Input signals
  menuItem = input.required<SideMenuItem>();
  isExpanded = input(true);
  isMobile = input(false);
  theme = input<NavTheme>({});

  // Output signals
  menuClick = output<SideMenuItem>();

  // Internal signal to force reactivity
  private routeChangeSignal = signal(0);

  TooltipPosition = TooltipPosition;
  TooltipTheme = TooltipTheme;

  constructor() {
    // Listen to navigation events and update the signal
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(() => {
        // Update the signal to trigger computed recalculation
        this.routeChangeSignal.update(count => count + 1);
      });
  }

  // Computed signals for styling
  isActive = computed(() => {
    // Access the route change signal to make this reactive
    this.routeChangeSignal();
    return this.isActiveRoute(this.menuItem().link);
  });

  menuItemClasses = computed(() => {
    const isRail = !this.isExpanded() && this.isMobile();
    const themeParams = this.theme();
    const textBase = themeParams.textClass || 'text-primary-800';
    const textActive = themeParams.activeTextClass || 'text-primary-950 font-bold';

    if (this.isActive()) {
      const activeRail = 'bg-transparent shadow-none scale-100';
      const activeFull = textActive;
      return `${isRail ? activeRail : activeFull}`;
    }
    const inactiveRail = '';
    const inactiveFull = `${textBase} group-hover:brightness-125`;
    return `${isRail ? inactiveRail : inactiveFull}`;
  });

  iconClasses = computed(() => {
    const themeParams = this.theme();
    const textActive = themeParams.activeTextClass || 'text-primary-950';
    const textBase = themeParams.textClass || 'text-primary-800';

    if (this.isActive()) {
      return textActive;
    }
    return `${textBase} transition-colors`;
  });

  iconBackgroundClasses = computed(() => {
    const themeParams = this.theme();
    const activeBg = themeParams.activeBgClass || 'bg-primary-200';

    if (this.isActive()) {
      return `${activeBg} rounded-2xl p-2 w-14 h-9 flex items-center justify-center transition-all duration-200`;
    }
    return 'w-14 h-9 p-2 flex items-center justify-center rounded-2xl group-hover:bg-slate-200 transition-all duration-200';
  });

  labelClasses = computed(() => {
    const themeParams = this.theme();
    const textBase = themeParams.textClass || 'text-primary-800';
    const textActive = themeParams.activeTextClass || 'text-primary-950';

    const weight = this.isActive() ? 'font-bold' : 'font-medium';
    const color = this.isActive() ? textActive : `${textBase} group-hover:text-primary-900`;
    return `text-[11px] text-center leading-[1.3] w-full break-words hyphens-auto mt-1.5 transition-colors ${weight} ${color}`;
  });

  headingClasses = computed(() => {
    const themeParams = this.theme();
    return themeParams.headingClass || 'text-primary-800';
  });

  // Adjust container and icon sizing when collapsed on mobile for narrower rail
  itemContainerClasses = computed(() => {
    const base = `group flex flex-col items-center justify-center cursor-pointer relative w-full overflow-hidden my-1 py-1`;
    const spacing = 'px-1';
    return `${base} ${spacing}`;
  });

  iconWrapperClasses = computed(() => {
    return 'flex-shrink-0';
  });

  onMenuClick(menu: SideMenuItem) {
    if (menu.externalLink) {
      if (isPlatformBrowser(this.platformId)) {
        window.open(menu.externalLink, '_blank');
      }
    }
    this.menuClick.emit(menu);
  }

  isActiveRoute(link: string | undefined): boolean {
    if (!link) return false;
    return this.router.isActive(link, {
      paths: 'subset', // Use 'subset' to match child routes
      queryParams: 'ignored',
      fragment: 'ignored',
      matrixParams: 'ignored',
    });
  }
}