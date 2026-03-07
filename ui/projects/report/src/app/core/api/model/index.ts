// ─── Enums ────────────────────────────────────────────────────────

export type DbType = 'MYSQL';

export type ChartType = 'BAR' | 'LINE' | 'PIE' | 'DOUGHNUT' | 'SCATTER' | 'AREA' | 'TABLE';

// ─── Common ───────────────────────────────────────────────────────

export interface PaginatedResponse<T> {
  data: T[];
  totalCount: number;
  pageNumber: number;
  pageSize: number;
}

export interface ListParams {
  pageNumber?: number;
  pageSize?: number;
  search?: string;
  sortingDirection?: string;
  orderByPropertyName?: string;
}

// ─── DB Connection ─────────────────────────────────────────────────

export interface DbConnectionItem {
  id: string;
  name: string;
  host: string;
  port: number;
  databaseName: string;
  username: string;
  dbType: DbType;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export type GetDbConnectionListResponse = PaginatedResponse<DbConnectionItem>;

export interface GetDbConnectionResponse {
  data: DbConnectionItem;
}

export interface CreateDbConnectionRequest {
  name: string;
  host: string;
  port: number;
  databaseName: string;
  username: string;
  password: string;
  dbType: DbType;
}

export interface CreateDbConnectionResponse {
  successMessage: string;
  data: { id: string };
}

export interface UpdateDbConnectionRequest {
  name?: string;
  host?: string;
  port?: number;
  databaseName?: string;
  username?: string;
  password?: string;
}

export interface UpdateDbConnectionResponse {
  successMessage: string;
}

export interface DeleteDbConnectionResponse {
  successMessage: string;
}

export interface TestDbConnectionResponse {
  successMessage: string;
  data: { isConnected: boolean };
}

// ─── AI Provider ──────────────────────────────────────────────────

export interface AiProviderItem {
  id: string;
  name: string;
  model: string;
  isEnabled: boolean;
  createdAt: string;
  updatedAt: string;
}

export type GetAiProviderListResponse = PaginatedResponse<AiProviderItem>;

export interface CreateAiProviderRequest {
  name: string;
  apiKey: string;
  model: string;
}

export interface CreateAiProviderResponse {
  successMessage: string;
  data: { id: string };
}

export interface UpdateAiProviderRequest {
  name?: string;
  apiKey?: string;
  model?: string;
  isEnabled?: boolean;
}

export interface UpdateAiProviderResponse {
  successMessage: string;
}

// ─── Chart ────────────────────────────────────────────────────────

export interface ChartItem {
  id: string;
  name: string;
  description?: string;
  chartType: ChartType;
  sqlQuery: string;
  chartConfig: Record<string, unknown>;
  isActive: boolean;
  connectionId: string;
  connectionName?: string;
  createdAt: string;
  updatedAt: string;
}

export type GetChartListResponse = PaginatedResponse<ChartItem>;

export interface GetChartResponse {
  data: ChartItem;
}

export interface GenerateChartRequest {
  connectionId: string;
  prompt: string;
  description?: string;
}

export interface GenerateChartResponse {
  successMessage: string;
  data: ChartItem;
}

export interface AiModifyChartRequest {
  prompt: string;
}

export interface AiModifyChartResponse {
  successMessage: string;
  data: ChartItem;
}

export interface UpdateChartRequest {
  name?: string;
  sqlQuery?: string;
  chartConfig?: Record<string, unknown>;
  chartType?: ChartType;
}

export interface UpdateChartResponse {
  successMessage: string;
}

export interface DeleteChartResponse {
  successMessage: string;
}

export interface ExecuteChartQueryResponse {
  successMessage: string;
  columns: string[];
  rows: Record<string, unknown>[];
  rowCount: number;
}

export interface GetChartListParams extends ListParams {
  connectionId?: string;
}

// ─── Dashboard ────────────────────────────────────────────────────

export interface DashboardChartItem {
  dashboardChartId: string;
  chartId: string;
  chartName: string;
  chartType: ChartType;
  chartConfig: Record<string, unknown>;
  sqlQuery: string;
  connectionId: string;
  connectionName: string;
  positionX: number;
  positionY: number;
  width: number;
  height: number;
  order: number;
}

export interface DashboardItem {
  id: string;
  name: string;
  description?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface DashboardDetail extends DashboardItem {
  charts: DashboardChartItem[];
}

export type GetDashboardListResponse = PaginatedResponse<DashboardItem>;

export interface GetDashboardResponse {
  data: DashboardDetail;
}

export interface CreateDashboardRequest {
  name: string;
  description?: string;
}

export interface CreateDashboardResponse {
  successMessage: string;
  data: { id: string };
}

export interface UpdateDashboardRequest {
  name?: string;
  description?: string;
}

export interface UpdateDashboardResponse {
  successMessage: string;
}

export interface DeleteDashboardResponse {
  successMessage: string;
}

export interface AddChartToDashboardRequest {
  chartId: string;
}

export interface AddChartToDashboardResponse {
  successMessage: string;
}

export interface RemoveChartFromDashboardResponse {
  successMessage: string;
}

export interface UpdateChartLayoutRequest {
  gridX?: number;
  gridY?: number;
  gridW?: number;
  gridH?: number;
  order?: number;
}

export interface UpdateChartLayoutResponse {
  successMessage: string;
}

// ─── Dashboard Filter ─────────────────────────────────────────────

export type FilterType = 'MULTI_SELECT' | 'SINGLE_SELECT' | 'DATE_RANGE' | 'TEXT' | 'NUMBER';

export interface DashboardFilterItem {
  id: string;
  dashboardId: string;
  name: string;
  filterType: FilterType;
  connectionId: string | null;
  targetColumn: string;
  sourceQuery: string | null;
  defaultValue: string | null;
  order: number;
  createdAt: string;
  updatedAt: string | null;
}

export interface GetDashboardFiltersResponse {
  successMessage: string;
  data: DashboardFilterItem[];
}

export interface CreateDashboardFilterRequest {
  name: string;
  filterType: FilterType;
  connectionId?: string;
  targetColumn: string;
  sourceQuery?: string;
  defaultValue?: string;
  order?: number;
}

export interface CreateDashboardFilterResponse {
  successMessage: string;
  data: DashboardFilterItem;
}

export interface UpdateDashboardFilterRequest {
  name?: string;
  filterType?: FilterType;
  connectionId?: string | null;
  targetColumn?: string;
  sourceQuery?: string | null;
  defaultValue?: string | null;
  order?: number;
}

export interface UpdateDashboardFilterResponse {
  successMessage: string;
}

export interface DeleteDashboardFilterResponse {
  successMessage: string;
}

export interface GetFilterOptionsResponse {
  successMessage: string;
  options: string[];
}

export interface FilterValueItem {
  filterId: string;
  value: unknown;
}

