import { Component, computed, DestroyRef, HostListener, inject, input, OnInit, output, PLATFORM_ID, signal } from "@angular/core";
import { isPlatformBrowser } from '@angular/common';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { filter } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { TopMenuItem } from "./top-nav-model";
import { BREAKPOINT_MAP, NavBreakpoint, NavMode, NavTheme, SideMenuItem } from "../nav-model";

@Component({
  selector: "ui-top-nav",
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: "./top-nav.html",
  host: { 'class': 'block w-full max-w-full overflow-x-hidden' }
})
export class TopNav implements OnInit {
  private platformId = inject(PLATFORM_ID);
  private router = inject(Router);
  private destroyRef = inject(DestroyRef);

  // Signals
  isMobileInternal = signal(false);
  isMobileMenuOpen = signal(false);

  // Input signals
  logoutMenu = input<TopMenuItem | null>(null);
  isMobile = input<boolean>(false);
  isExpanded = input<boolean>(false);
  showLogo = input<boolean>(true);
  breakpoint = input<NavBreakpoint>('lg');
  theme = input<NavTheme>({});
  menus = input<SideMenuItem[]>([]);
  navMode = input<NavMode>('vertical');

  // Output signals
  logoutClick = output<TopMenuItem>();
  toggleSideNav = output<void>();
  menuClick = output<SideMenuItem>();

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      const query = BREAKPOINT_MAP[this.breakpoint()];
      this.isMobileInternal.set(window.matchMedia(query).matches);
    }
    // Close mobile dropdown on navigation
    this.router.events
      .pipe(filter(e => e instanceof NavigationEnd), takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.isMobileMenuOpen.set(false));
  }

  ngOnInit() {
    this.updateInitialState();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    if (isPlatformBrowser(this.platformId)) {
      const query = BREAKPOINT_MAP[this.breakpoint()];
      this.isMobileInternal.set(window.matchMedia(query).matches);
    }
  }

  private updateInitialState() {
    if (isPlatformBrowser(this.platformId)) {
      const query = BREAKPOINT_MAP[this.breakpoint()];
      this.isMobileInternal.set(window.matchMedia(query).matches);
    } else {
      this.isMobileInternal.set(false);
    }
  }

  // Computed signals for dynamic classes
  navClasses = computed(() => {
    const bg = 'bg-primary-500';
    return `w-full ${bg} text-white shadow-md shadow-primary-900 transition-all duration-300 ease-in-out px-4 h-16 relative z-50`;
  });

  onToggleSideNav() {
    this.toggleSideNav.emit();
  }

  onLogoutClick(menu: TopMenuItem) {
    this.logoutClick.emit(menu);
  }

  toggleMobileMenu(event: Event) {
    event.stopPropagation();
    this.isMobileMenuOpen.update(v => !v);
  }

  onHorizontalMenuClick(menu: SideMenuItem, event: Event) {
    event.stopPropagation();
    this.isMobileMenuOpen.set(false);
    this.menuClick.emit(menu);
  }

  closeMobileMenu() {
    this.isMobileMenuOpen.set(false);
  }

  isActiveRoute(link: string | undefined): boolean {
    if (!link) return false;
    return this.router.isActive(link, {
      paths: 'subset',
      queryParams: 'ignored',
      fragment: 'ignored',
      matrixParams: 'ignored',
    });
  }
}