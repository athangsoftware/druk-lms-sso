import { SchemaMetadata } from '../drivers/database-driver.interface';

export interface AiChartResult {
  sql: string;
  chartTitle: string;
  chartType: string;
  chartConfig: Record<string, unknown>;
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
}
