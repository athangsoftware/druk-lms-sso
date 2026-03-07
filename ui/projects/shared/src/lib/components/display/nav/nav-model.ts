export interface SideMenuItem {
  id: string;
  iconPath?: string;
  link?: string;
  externalLink?: string;
  label?: string;
  isEnabled: boolean;
  isSeparator?: boolean;
  groupHeading?: string;
}

export type NavBreakpoint = 'sm' | 'md' | 'lg' | 'xl' | '2xl';

export const BREAKPOINT_MAP: Record<NavBreakpoint, string> = {
  'sm': '(max-width: 640px)',
  'md': '(max-width: 768px)',
  'lg': '(max-width: 1024px)',
  'xl': '(max-width: 1280px)',
  '2xl': '(max-width: 1536px)',
};

export interface NavTheme {
  bgClass?: string;
  textClass?: string;
  activeBgClass?: string;
  activeTextClass?: string;
  borderClass?: string;
  headingClass?: string;
}

/** Controls the nav layout mode.
 *  - `'vertical'`   – compact icon sidebar (default)
 *  - `'horizontal'` – menu items rendered inline in the top bar
 */
export type NavMode = 'horizontal' | 'vertical';