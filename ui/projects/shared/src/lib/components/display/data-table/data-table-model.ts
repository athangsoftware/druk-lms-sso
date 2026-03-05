import { Type } from "@angular/core";
import { PaginationEvent } from "../pagination/pagination";
import { TableSortEvent } from "./sortable-table";

// Types & Interfaces
export type ColumnNode = ColumnDef | ColumnGroup;

export interface ColumnGroup {
  title: string;
  children: ColumnNode[];
  alignment?: 'left' | 'center' | 'right';
}

export interface HeaderCell {
  title: string;
  colspan: number;
  rowspan: number;
  node: ColumnNode;
  sortKey?: string;
  alignment?: 'left' | 'center' | 'right';
}

export interface ColumnDef {
  title: string;
  key?: string;
  displayTemplate?: string;
  sortKey?: string;
  alignment?: 'left' | 'center' | 'right';
  type: 'text' | 'date' | 'badge' | 'custom' | 'actions' | 'checkbox';
  visible?: boolean | null;
  component?: Type<any>;
  textConfig?: TextConfig;
  dateConfig?: DateConfig;
  badgeConfig?: BadgeConfig;
  customConfig?: CustomRendererConfig;
  actionsConfig?: ActionConfig;
  formatter?: (value: any) => any;
  objectFormatter?: (item: any) => any;
  propertyStyle?: (value: any) => any;
  filterConfig?: FilterConfig;
  width?: number;
  /**
   * Mobile-only display configuration.
   * - slot: choose where this column appears on mobile cards
   *   - 'primary': main title line (left)
   *   - 'summary': secondary line under title
   *   - 'detail': appears in the expandable details grid
   *   - 'hidden': excluded from mobile entirely (still visible on desktop)
   * - order: optional ordering hint for details grid when multiple columns are present
   */
  mobile?: {
    slot?: 'primary' | 'summary' | 'detail' | 'hidden';
    order?: number;
  };
}

export interface TextConfig {
  textColorClass?: string;
}

export interface DateConfig {
  dateFormat?: string;
  showIcon?: boolean;
}

export interface BadgeConfig {
  properties: BadgeConfigProperty[];
}

export interface BadgeConfigProperty {
  data: string;
  displayText: string;
  backgroundColorClass?: string;
  borderColorClass?: string;
  textColorClass?: string;
  indicatorColorClass?: string;
}

export interface CustomRendererConfig {
  data?: any;
}

export interface ActionConfig {
  iconActions?: IconAction[];
  threeDotMenuActions?: ContextMenuActionConfig[] | ((item: any) => ContextMenuActionConfig[]) | null;
  textMenuActions?: ContextMenuActionConfig[] | null;
  components?: Type<any>[];
}

export interface IconAction {
  iconPath: string;
  actionKey: string;
  label?: string;
}

export interface ContextMenuActionConfig {
  iconPath?: string;
  actionKey: string;
  label: string;
}

export interface TableActionEvent {
  actionKey: string;
  item: any;
  data?: any;
}

export interface TableStateEvent {
  searchText?: string;
  paginationEvent?: PaginationEvent;
  tableSortEvent?: TableSortEvent;
  columnFilters?: { [key: string]: { value?: any; min?: any; max?: any; operation: string } };
}

export interface FilterEvent {
  key: string;
  value?: any;
  min?: any;
  max?: any;
  operation: string;
}

export interface FilterConfig {
  type: 'text' | 'number' | 'date' | 'select' | 'multi-select';
  placeholder?: string;
  options?: { value: any; label: string }[];
  dateFormat?: 'mm/dd/yyyy' | 'dd/MM/yyyy';
  operation?: 'contains' | 'exact' | 'greaterThan' | 'greaterThanOrEqual' | 'lesserThan' | 'lesserThanOrEqual' | 'equals' | 'notEqual' | 'between';
  enableMinMax?: boolean;
}

export interface TableAction {
  label: string;
  actionKey: string;
  type?: 'primary' | 'secondary' | 'danger' | 'outline' | 'ghost';
  icon?: string;
  visible?: (selectedItems: any[]) => boolean;
  disabled?: (selectedItems: any[]) => boolean;
  /** Position of action: 'default' shows always on right, 'conditional' shows with divider (default: 'default') */
  position?: 'default' | 'conditional';
}