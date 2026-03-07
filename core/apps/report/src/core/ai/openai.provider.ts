import { AiProviderBase, AiChartResult } from './ai-provider.interface';
import { SchemaMetadata } from '../drivers/database-driver.interface';

interface OpenAiMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

const CHART_TYPES = ['bar', 'line', 'pie', 'doughnut', 'scatter', 'area', 'table'];

const SYSTEM_PROMPT = `You are an expert data analyst assistant. Your task is to generate SQL queries and Chart.js chart configurations based on user requests and database schemas.

Always respond with valid JSON matching this exact structure:
{
  "sql": "SELECT ...",
  "chartTitle": "Human-readable chart title",
  "chartType": "bar|line|pie|doughnut|scatter|area|table",
  "chartConfig": { /* Chart.js dataset and options configuration */ }
}

Rules:
- SQL must be a SELECT query only. No INSERT, UPDATE, DELETE, DROP, or other destructive operations.
- chartType must be one of: ${CHART_TYPES.join(', ')}
- chartConfig must be a valid Chart.js options object with "datasets" array included.
- For time-series data, use "line" or "bar" chart types.
- For proportional data, use "pie" or "doughnut".
- Keep SQL efficient and readable.`;

function buildSchemaDescription(schema: SchemaMetadata): string {
  const lines: string[] = [`Database: ${schema.databaseName}`, 'Tables:'];
  for (const table of schema.tables) {
    lines.push(`  ${table.tableName} (${table.columns.map((c) => `${c.columnName}: ${c.dataType}`).join(', ')})`);
  }
  return lines.join('\n');
}

export class OpenAiProvider extends AiProviderBase {
  constructor(
    private readonly apiKey: string,
    private readonly model: string = 'gpt-4o',
  ) {
    super();
  }

  private async callApi(messages: OpenAiMessage[]): Promise<AiChartResult> {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify({
        model: this.model,
        messages,
        response_format: { type: 'json_object' },
        temperature: 0.2,
        max_tokens: 2048,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`OpenAI API error ${response.status}: ${error}`);
    }

    const data = (await response.json()) as {
      choices: { message: { content: string } }[];
    };

    const content = data.choices[0]?.message?.content;
    if (!content) {
      throw new Error('OpenAI returned an empty response.');
    }

    const parsed = JSON.parse(content) as AiChartResult;

    if (!parsed.sql || !parsed.chartType || !parsed.chartConfig) {
      throw new Error('AI response is missing required fields (sql, chartType, chartConfig).');
    }

    return parsed;
  }

  async generateChart(
    prompt: string,
    schema: SchemaMetadata,
  ): Promise<AiChartResult> {
    const schemaDescription = buildSchemaDescription(schema);

    return this.callApi([
      { role: 'system', content: SYSTEM_PROMPT },
      {
        role: 'user',
        content: `Database Schema:\n${schemaDescription}\n\nUser Request: ${prompt}`,
      },
    ]);
  }

  async modifyChart(
    prompt: string,
    existingConfig: Record<string, unknown>,
    schema: SchemaMetadata,
  ): Promise<AiChartResult> {
    const schemaDescription = buildSchemaDescription(schema);

    return this.callApi([
      { role: 'system', content: SYSTEM_PROMPT },
      {
        role: 'user',
        content: `Database Schema:\n${schemaDescription}\n\nExisting Chart Configuration:\n${JSON.stringify(existingConfig, null, 2)}\n\nModification Request: ${prompt}`,
      },
    ]);
  }
}
