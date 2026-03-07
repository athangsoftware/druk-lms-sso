import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';
import type {
  CreateDbConnectionRequest,
  CreateDbConnectionResponse,
  UpdateDbConnectionRequest,
  UpdateDbConnectionResponse,
  DeleteDbConnectionResponse,
  GetDbConnectionResponse,
  GetDbConnectionListResponse,
  TestDbConnectionResponse,
  GetConnectionSchemaResponse,
  CreateAiProviderRequest,
  CreateAiProviderResponse,
  UpdateAiProviderRequest,
  UpdateAiProviderResponse,
  GetAiProviderListResponse,
  GenerateChartRequest,
  GenerateChartResponse,
  AiModifyChartRequest,
  AiModifyChartResponse,
  UpdateChartRequest,
  UpdateChartResponse,
  DeleteChartResponse,
  GetChartResponse,
  GetChartListResponse,
  ExecuteChartQueryResponse,
  ExecuteChartQueryRequest,
  GetChartListParams,
  CreateDashboardRequest,
  CreateDashboardResponse,
  UpdateDashboardRequest,
  UpdateDashboardResponse,
  DeleteDashboardResponse,
  GetDashboardResponse,
  GetDashboardListResponse,
  AddChartToDashboardRequest,
  AddChartToDashboardResponse,
  RemoveChartFromDashboardResponse,
  UpdateChartLayoutRequest,
  UpdateChartLayoutResponse,
  CreateDashboardFilterRequest,
  CreateDashboardFilterResponse,
  GenerateDashboardFilterRequest,
  GenerateDashboardFilterResponse,
  UpdateDashboardFilterRequest,
  UpdateDashboardFilterResponse,
  DeleteDashboardFilterResponse,
  ListDashboardFiltersResponse,
  GetFilterOptionsResponse,
  ListParams,
} from './model';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  // ─── DB Connection ────────────────────────────────────────────────

  getDbConnectionList(params?: ListParams): Observable<GetDbConnectionListResponse> {
    return this.http.get<GetDbConnectionListResponse>(`${this.apiUrl}/db-connections`, {
      params: params as Record<string, string>,
    });
  }

  getDbConnection(id: string): Observable<GetDbConnectionResponse> {
    return this.http.get<GetDbConnectionResponse>(`${this.apiUrl}/db-connections/${id}`);
  }

  createDbConnection(request: CreateDbConnectionRequest): Observable<CreateDbConnectionResponse> {
    return this.http.post<CreateDbConnectionResponse>(`${this.apiUrl}/db-connections`, request);
  }

  updateDbConnection(id: string, request: UpdateDbConnectionRequest): Observable<UpdateDbConnectionResponse> {
    return this.http.put<UpdateDbConnectionResponse>(`${this.apiUrl}/db-connections/${id}`, request);
  }

  deleteDbConnection(id: string): Observable<DeleteDbConnectionResponse> {
    return this.http.delete<DeleteDbConnectionResponse>(`${this.apiUrl}/db-connections/${id}`);
  }

  testDbConnection(id: string): Observable<TestDbConnectionResponse> {
    return this.http.post<TestDbConnectionResponse>(`${this.apiUrl}/db-connections/${id}/test`, {});
  }

  getConnectionSchema(id: string): Observable<GetConnectionSchemaResponse> {
    return this.http.get<GetConnectionSchemaResponse>(`${this.apiUrl}/db-connections/${id}/schema`);
  }

  // ─── AI Provider ─────────────────────────────────────────────────

  getAiProviderList(params?: ListParams): Observable<GetAiProviderListResponse> {
    return this.http.get<GetAiProviderListResponse>(`${this.apiUrl}/ai-providers`, {
      params: params as Record<string, string>,
    });
  }

  createAiProvider(request: CreateAiProviderRequest): Observable<CreateAiProviderResponse> {
    return this.http.post<CreateAiProviderResponse>(`${this.apiUrl}/ai-providers`, request);
  }

  updateAiProvider(id: string, request: UpdateAiProviderRequest): Observable<UpdateAiProviderResponse> {
    return this.http.put<UpdateAiProviderResponse>(`${this.apiUrl}/ai-providers/${id}`, request);
  }

  // ─── Chart ───────────────────────────────────────────────────────

  getChartList(params?: GetChartListParams): Observable<GetChartListResponse> {
    return this.http.get<GetChartListResponse>(`${this.apiUrl}/charts`, {
      params: params as Record<string, string>,
    });
  }

  getChart(id: string): Observable<GetChartResponse> {
    return this.http.get<GetChartResponse>(`${this.apiUrl}/charts/${id}`);
  }

  generateChart(request: GenerateChartRequest): Observable<GenerateChartResponse> {
    return this.http.post<GenerateChartResponse>(`${this.apiUrl}/charts/generate`, request);
  }

  aiModifyChart(id: string, request: AiModifyChartRequest): Observable<AiModifyChartResponse> {
    return this.http.post<AiModifyChartResponse>(`${this.apiUrl}/charts/${id}/ai-modify`, request);
  }

  updateChart(id: string, request: UpdateChartRequest): Observable<UpdateChartResponse> {
    return this.http.put<UpdateChartResponse>(`${this.apiUrl}/charts/${id}`, request);
  }

  deleteChart(id: string): Observable<DeleteChartResponse> {
    return this.http.delete<DeleteChartResponse>(`${this.apiUrl}/charts/${id}`);
  }

  executeChartQuery(id: string, request?: ExecuteChartQueryRequest): Observable<ExecuteChartQueryResponse> {
    return this.http.post<ExecuteChartQueryResponse>(`${this.apiUrl}/charts/${id}/execute`, request ?? {});
  }

  // ─── Dashboard ───────────────────────────────────────────────────

  getDashboardList(params?: ListParams): Observable<GetDashboardListResponse> {
    return this.http.get<GetDashboardListResponse>(`${this.apiUrl}/dashboards`, {
      params: params as Record<string, string>,
    });
  }

  getDashboard(id: string): Observable<GetDashboardResponse> {
    return this.http.get<GetDashboardResponse>(`${this.apiUrl}/dashboards/${id}`);
  }

  createDashboard(request: CreateDashboardRequest): Observable<CreateDashboardResponse> {
    return this.http.post<CreateDashboardResponse>(`${this.apiUrl}/dashboards`, request);
  }

  updateDashboard(id: string, request: UpdateDashboardRequest): Observable<UpdateDashboardResponse> {
    return this.http.put<UpdateDashboardResponse>(`${this.apiUrl}/dashboards/${id}`, request);
  }

  deleteDashboard(id: string): Observable<DeleteDashboardResponse> {
    return this.http.delete<DeleteDashboardResponse>(`${this.apiUrl}/dashboards/${id}`);
  }

  addChartToDashboard(
    dashboardId: string,
    request: AddChartToDashboardRequest,
  ): Observable<AddChartToDashboardResponse> {
    return this.http.post<AddChartToDashboardResponse>(
      `${this.apiUrl}/dashboards/${dashboardId}/charts`,
      request,
    );
  }

  removeChartFromDashboard(
    dashboardId: string,
    chartId: string,
  ): Observable<RemoveChartFromDashboardResponse> {
    return this.http.delete<RemoveChartFromDashboardResponse>(
      `${this.apiUrl}/dashboards/${dashboardId}/charts/${chartId}`,
    );
  }

  updateChartLayout(
    dashboardId: string,
    chartId: string,
    request: UpdateChartLayoutRequest,
  ): Observable<UpdateChartLayoutResponse> {
    return this.http.put<UpdateChartLayoutResponse>(
      `${this.apiUrl}/dashboards/${dashboardId}/charts/${chartId}/layout`,
      request,
    );
  }

  // ─── Dashboard Filters ─────────────────────────────────────────────

  listDashboardFilters(dashboardId: string): Observable<ListDashboardFiltersResponse> {
    return this.http.get<ListDashboardFiltersResponse>(
      `${this.apiUrl}/dashboards/${dashboardId}/filters`,
    );
  }

  createDashboardFilter(
    dashboardId: string,
    request: CreateDashboardFilterRequest,
  ): Observable<CreateDashboardFilterResponse> {
    return this.http.post<CreateDashboardFilterResponse>(
      `${this.apiUrl}/dashboards/${dashboardId}/filters`,
      request,
    );
  }

  updateDashboardFilter(
    dashboardId: string,
    filterId: string,
    request: UpdateDashboardFilterRequest,
  ): Observable<UpdateDashboardFilterResponse> {
    return this.http.put<UpdateDashboardFilterResponse>(
      `${this.apiUrl}/dashboards/${dashboardId}/filters/${filterId}`,
      request,
    );
  }

  deleteDashboardFilter(
    dashboardId: string,
    filterId: string,
  ): Observable<DeleteDashboardFilterResponse> {
    return this.http.delete<DeleteDashboardFilterResponse>(
      `${this.apiUrl}/dashboards/${dashboardId}/filters/${filterId}`,
    );
  }

  getFilterOptions(
    dashboardId: string,
    filterId: string,
  ): Observable<GetFilterOptionsResponse> {
    return this.http.get<GetFilterOptionsResponse>(
      `${this.apiUrl}/dashboards/${dashboardId}/filters/${filterId}/options`,
    );
  }

  generateDashboardFilter(
    dashboardId: string,
    request: GenerateDashboardFilterRequest,
  ): Observable<GenerateDashboardFilterResponse> {
    return this.http.post<GenerateDashboardFilterResponse>(
      `${this.apiUrl}/dashboards/${dashboardId}/filters/generate`,
      request,
    );
  }
}
