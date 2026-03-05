import { Component, computed, input, output, signal, HostListener, inject, PLATFORM_ID, OnInit } from "@angular/core";
import { isPlatformBrowser } from '@angular/common';

import { TopMenuItem } from "./top-nav-model";
import { NavBreakpoint, BREAKPOINT_MAP, NavTheme } from "../nav-model";

@Component({
  selector: "ui-top-nav",
  standalone: true,
  imports: [],
  templateUrl: "./top-nav.html",
  host: { 'class': 'block w-full max-w-full overflow-x-hidden' }
})
export class TopNav implements OnInit {
  private platformId = inject(PLATFORM_ID);

  // Signals
  isMobileInternal = signal(false);

  // Input signals
  logoutMenu = input<TopMenuItem | null>(null);
  isMobile = input<boolean>(false);
  isExpanded = input<boolean>(false);
  showLogo = input<boolean>(true);
  breakpoint = input<NavBreakpoint>('lg');
  theme = input<NavTheme>({});

  // Output signals
  logoutClick = output<TopMenuItem>();
  toggleSideNav = output<void>();

  constructor() {
  }

  ngOnInit() {
    this.updateInitialState();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    if (isPlatformBrowser(this.platformId)) {
      const query = BREAKPOINT_MAP[this.breakpoint()];
      const newMobile = window.matchMedia(query).matches;
      this.isMobileInternal.set(newMobile);
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
    const themeParams = this.theme();
    const bg = 'bg-primary-500'; // Bold attractive primary color
    return `w-full ${bg} text-white shadow-md shadow-primary-900 transition-all duration-300 ease-in-out px-4 h-16 relative z-50`;
  });

  onToggleSideNav() {
    this.toggleSideNav.emit();
  }

  onLogoutClick(menu: TopMenuItem) {
    this.logoutClick.emit(menu);
  }
}