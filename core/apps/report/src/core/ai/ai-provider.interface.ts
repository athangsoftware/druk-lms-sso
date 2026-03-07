import { SchemaMetadata } from '../drivers/database-driver.interface';

export interface AiChartResult {
  sql: string;
  chartTitle: string;
  chartType: string;
  chartConfig: Record<string, unknown>;
}

export interface AiFilterResult {
  name: string;
  filterType: string;
  targetColumn: string;
  sourceQuery?: string;
  defaultValue?: string;
  sql?: string;
}

export abstract class AiProviderBase {
  abstract generateChart(
    prompt: string,
    schema: SchemaMetadata,
  ): Promise<AiChartResult>;

  abstract modifyChart(
    prompt: string,
    existingConfig: Record<string, unknown>,
    schema: SchemaMetadata,
  ): Promise<AiChartResult>;

  abstract generateFilter(
    prompt: string,
    schema: SchemaMetadata,
  ): Promise<AiFilterResult>;
}
