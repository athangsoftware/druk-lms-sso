import { Module } from '@nestjs/common';
import { AiService } from '../../core/ai/ai.service';

// DB Connection Controllers
import { CreateDbConnectionController } from './db-connection/create-db-connection/create-db-connection.controller';
import { UpdateDbConnectionController } from './db-connection/update-db-connection/update-db-connection.controller';
import { DeleteDbConnectionController } from './db-connection/delete-db-connection/delete-db-connection.controller';
import { GetDbConnectionController } from './db-connection/get-db-connection/get-db-connection.controller';
import { GetDbConnectionListController } from './db-connection/get-db-connection-list/get-db-connection-list.controller';
import { TestDbConnectionController } from './db-connection/test-db-connection/test-db-connection.controller';
import { GetDbConnectionSchemaController } from './db-connection/get-db-connection-schema/get-db-connection-schema.controller';

// AI Provider Controllers
import { CreateAiProviderController } from './ai-provider/create-ai-provider/create-ai-provider.controller';
import { UpdateAiProviderController } from './ai-provider/update-ai-provider/update-ai-provider.controller';
import { GetAiProviderListController } from './ai-provider/get-ai-provider-list/get-ai-provider-list.controller';

// Chart Controllers
import { GenerateChartController } from './chart/generate-chart/generate-chart.controller';
import { AiModifyChartController } from './chart/ai-modify-chart/ai-modify-chart.controller';
import { UpdateChartController } from './chart/update-chart/update-chart.controller';
import { DeleteChartController } from './chart/delete-chart/delete-chart.controller';
import { GetChartController } from './chart/get-chart/get-chart.controller';
import { GetChartListController } from './chart/get-chart-list/get-chart-list.controller';
import { ExecuteChartQueryController } from './chart/execute-chart-query/execute-chart-query.controller';

// Dashboard Controllers
import { CreateDashboardController } from './dashboard/create-dashboard/create-dashboard.controller';
import { UpdateDashboardController } from './dashboard/update-dashboard/update-dashboard.controller';
import { DeleteDashboardController } from './dashboard/delete-dashboard/delete-dashboard.controller';
import { GetDashboardController } from './dashboard/get-dashboard/get-dashboard.controller';
import { GetDashboardListController } from './dashboard/get-dashboard-list/get-dashboard-list.controller';
import { AddChartToDashboardController } from './dashboard/add-chart-to-dashboard/add-chart-to-dashboard.controller';
import { RemoveChartFromDashboardController } from './dashboard/remove-chart-from-dashboard/remove-chart-from-dashboard.controller';
import { UpdateChartLayoutController } from './dashboard/update-chart-layout/update-chart-layout.controller';

// Dashboard Filter Controllers
import { CreateDashboardFilterController } from './dashboard/filter/create-dashboard-filter/create-dashboard-filter.controller';
import { UpdateDashboardFilterController } from './dashboard/filter/update-dashboard-filter/update-dashboard-filter.controller';
import { DeleteDashboardFilterController } from './dashboard/filter/delete-dashboard-filter/delete-dashboard-filter.controller';
import { ListDashboardFiltersController } from './dashboard/filter/list-dashboard-filters/list-dashboard-filters.controller';
import { GetFilterOptionsController } from './dashboard/filter/get-filter-options/get-filter-options.controller';
import { GenerateDashboardFilterController } from './dashboard/filter/generate-dashboard-filter/generate-dashboard-filter.controller';

// Global Filter Controllers
import { CreateGlobalFilterController } from './global-filter/create-global-filter/create-global-filter.controller';
import { UpdateGlobalFilterController } from './global-filter/update-global-filter/update-global-filter.controller';
import { DeleteGlobalFilterController } from './global-filter/delete-global-filter/delete-global-filter.controller';
import { ListGlobalFiltersController } from './global-filter/list-global-filters/list-global-filters.controller';

// Dashboard Global Filter Override Controllers
import { UpsertGlobalFilterOverridesController } from './dashboard/global-filter-override/upsert-global-filter-overrides/upsert-global-filter-overrides.controller';
import { ListGlobalFilterOverridesController } from './dashboard/global-filter-override/list-global-filter-overrides/list-global-filter-overrides.controller';

const DB_CONNECTION_CONTROLLERS = [
  CreateDbConnectionController,
  UpdateDbConnectionController,
  DeleteDbConnectionController,
  GetDbConnectionController,
  GetDbConnectionListController,
  TestDbConnectionController,
  GetDbConnectionSchemaController,
];

const AI_PROVIDER_CONTROLLERS = [
  CreateAiProviderController,
  UpdateAiProviderController,
  GetAiProviderListController,
];

const CHART_CONTROLLERS = [
  GenerateChartController,
  AiModifyChartController,
  UpdateChartController,
  DeleteChartController,
  GetChartController,
  GetChartListController,
  ExecuteChartQueryController,
];

const DASHBOARD_CONTROLLERS = [
  CreateDashboardController,
  UpdateDashboardController,
  DeleteDashboardController,
  GetDashboardController,
  GetDashboardListController,
  AddChartToDashboardController,
  RemoveChartFromDashboardController,
  UpdateChartLayoutController,
];

const DASHBOARD_FILTER_CONTROLLERS = [
  CreateDashboardFilterController,
  UpdateDashboardFilterController,
  DeleteDashboardFilterController,
  ListDashboardFiltersController,
  GetFilterOptionsController,
  GenerateDashboardFilterController,
];

const GLOBAL_FILTER_CONTROLLERS = [
  CreateGlobalFilterController,
  UpdateGlobalFilterController,
  DeleteGlobalFilterController,
  ListGlobalFiltersController,
];

const DASHBOARD_GLOBAL_FILTER_OVERRIDE_CONTROLLERS = [
  UpsertGlobalFilterOverridesController,
  ListGlobalFilterOverridesController,
];

@Module({
  imports: [],
  controllers: [
    ...DB_CONNECTION_CONTROLLERS,
    ...AI_PROVIDER_CONTROLLERS,
    ...CHART_CONTROLLERS,
    ...DASHBOARD_CONTROLLERS,
    ...DASHBOARD_FILTER_CONTROLLERS,
    ...GLOBAL_FILTER_CONTROLLERS,
    ...DASHBOARD_GLOBAL_FILTER_OVERRIDE_CONTROLLERS,
  ],
  providers: [AiService],
})
export class ApiModule {}
