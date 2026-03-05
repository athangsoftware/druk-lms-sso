import { Component, computed, input, output, signal, viewChild, HostListener, inject, PLATFORM_ID, OnInit } from "@angular/core";
import { isPlatformBrowser } from '@angular/common';
import { SideMenuItem, NavBreakpoint, BREAKPOINT_MAP, NavTheme } from "./nav-model";
import { CommonModule } from "@angular/common";
import { SideNavMenu } from "./side-nav-menu/side-nav-menu";
import { TopNav } from "./top-nav/top-nav";
import { TopMenuItem } from "./top-nav/top-nav-model";

@Component({
  selector: "ui-nav",
  standalone: true,
  imports: [CommonModule, SideNavMenu, TopNav],
  templateUrl: "./nav.html",
  host: { 'class': 'block overflow-x-hidden max-w-full w-full' }
})
export class Nav implements OnInit {
  private platformId = inject(PLATFORM_ID);

  // Signals
  isExpanded = signal(true);
  isMobile = signal(false);

  // Input signals
  settingsMenu = input<SideMenuItem | null>(null);
  menus = input<SideMenuItem[]>([]);
  logoutMenu = input<TopMenuItem | null>(null);
  breakpoint = input<NavBreakpoint>('lg');
  theme = input<NavTheme>({
    bgClass: 'bg-primary-50', // Solid light background
    textClass: 'text-primary-800',
    activeBgClass: 'bg-primary-100',
    activeTextClass: 'text-primary-950 font-bold',
    borderClass: 'border-primary-200',
    headingClass: 'text-primary-800 font-bold tracking-widest'
  });

  // Output signals
  menuClick = output<SideMenuItem>();

  logoutClick = output<void>();

  toggleSideNav = output<void>();

  // ViewChild for settings menu
  settingsMenuComponent = viewChild<SideNavMenu>("settingsMenuRef");

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
      const wasMobile = this.isMobile();
      this.isMobile.set(newMobile);
      if (newMobile !== wasMobile) {
        this.isExpanded.set(!newMobile);
      }
    }
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (this.isMobile() && this.isExpanded()) {
      const sidebar = (event.target as HTMLElement).closest('nav');
      if (!sidebar) {
        this.toggleSidebar();
      }
    }
  }

  private updateInitialState() {
    if (isPlatformBrowser(this.platformId)) {
      const query = BREAKPOINT_MAP[this.breakpoint()];
      this.isMobile.set(window.matchMedia(query).matches);
      this.isExpanded.set(!this.isMobile());
    } else {
      this.isMobile.set(false);
      this.isExpanded.set(true);
    }
  }

  // Computed signals for dynamic classes
  sidebarClasses = computed(() => {
    const themeParams = this.theme();
    const bg = themeParams.bgClass || 'bg-slate-900';
    const border = themeParams.borderClass || 'border-slate-800';

    if (this.isMobile()) {
      // Mobile: compact sidebar slides in from left as overlay
      const translateClass = this.isExpanded() ? 'translate-x-0' : '-translate-x-full';
      return `fixed top-16 left-0 bottom-0 w-24 z-50 ${bg} shadow-xl transition-transform duration-300 ease-in-out ${translateClass}`;
    } else {
      // Desktop: compact sidebar with icons on top, labels below
      const widthClass = 'w-24';
      return `fixed top-16 left-0 bottom-0 z-10 ${widthClass} ${bg} transition-all duration-300 ease-in-out`;
    }
  });

  mainContentClasses = computed(() => {
    if (this.isMobile()) {
      // Mobile: content always uses full width
      return 'ml-0';
    } else {
      // Desktop: offset by compact sidebar width
      return 'ml-24';
    }
  });

  toggleButtonLabel = computed(() =>
    this.isExpanded() ? 'Collapse Sidebar' : 'Expand Sidebar'
  );

  toggleIconClass = computed(() =>
    this.isExpanded() ? 'rotate-0' : 'rotate-180'
  );

  toggleSidebar() {
    this.isExpanded.update(expanded => !expanded);
    this.toggleSideNav.emit();
  }

  onMenuClick(menu: SideMenuItem) {
    this.menuClick.emit(menu);
    if (this.isMobile()) {
      this.isExpanded.set(false);
    }
  }

  onSidebarClick(event: Event) {
    event.stopPropagation();
  }

  focusSettingsMenu() {
    const settingsMenu = this.settingsMenuComponent();
    if (settingsMenu) {
      settingsMenu.onMenuClick(settingsMenu.menuItem());
    }
  }

  onLogoutClick() {
    this.logoutClick.emit();
  }
}