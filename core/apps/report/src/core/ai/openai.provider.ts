import { AiProviderBase, AiChartResult, AiFilterResult } from './ai-provider.interface';
import { SchemaMetadata, TableInfo } from '../drivers/database-driver.interface';

interface OpenAiMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

const CHART_TYPES = ['bar', 'line', 'pie', 'doughnut', 'scatter', 'area', 'table'];
const APPROX_CHARS_PER_TOKEN = 4;
const TPM_LIMIT = 30_000;
const TPM_SAFETY_BUFFER = 3_000;
const MAX_OUTPUT_TOKENS = 512;
const MAX_PROMPT_CHARS = 2_000;
const MAX_SCHEMA_CHARS = 12_000;
const MAX_SCHEMA_TABLES = 16;
const MAX_SCHEMA_COLUMNS_PER_TABLE = 40;
const MAX_EXISTING_CONFIG_CHARS = 6_000;

const STOP_WORDS = new Set([
  'a',
  'an',
  'and',
  'are',
  'as',
  'at',
  'be',
  'by',
  'for',
  'from',
  'in',
  'into',
  'is',
  'it',
  'of',
  'on',
  'or',
  'that',
  'the',
  'to',
  'with',
  'show',
  'list',
  'get',
  'find',
]);

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
- Use only table and column names that exist in the provided schema.
- Do not invent names. If uncertain, choose the closest exact schema match.
- chartType must be one of: ${CHART_TYPES.join(', ')}
- chartConfig must be a valid Chart.js options object with "datasets" array included.
- Use the provided foreign key relationships for joins whenever possible.
- Prefer explicit JOIN clauses over subqueries when relationships are clear.
- Select only required columns and use stable aliases for computed columns.
- For grouped charts, include a clear dimension column and an aggregated metric column.
- For time-series data, use "line" or "bar" chart types.
- For proportional data, use "pie" or "doughnut".
- Keep SQL efficient and readable.`;

const FILTER_SYSTEM_PROMPT = `You are an expert data analyst assistant. Your task is to design dashboard-level filters based on user requests and database schemas.

IMPORTANT RULES:
- You MUST only reference columns that exist in the provided database schema.
- targetColumn MUST be in the format "table_name.column_name" using exact names from the schema.
- sourceQuery MUST only reference tables and columns that exist in the schema.
- NEVER invent or guess column names. If unsure, pick the closest matching column from the schema.
- filterType must be one of: MULTI_SELECT, SINGLE_SELECT, DATE_RANGE, TEXT, NUMBER.
- sourceQuery (when provided) should be a SELECT query returning a single column of possible values.
- Do not include INSERT, UPDATE, DELETE, DROP, or other destructive operations.
- Provide a clear human-readable name.

Always respond with valid JSON matching this exact structure:
{
  "name": "Filter name",
  "filterType": "MULTI_SELECT|SINGLE_SELECT|DATE_RANGE|TEXT|NUMBER",
  "targetColumn": "table_name.column_name",
  "sourceQuery": "SELECT DISTINCT table.column FROM table ORDER BY table.column",
  "defaultValue": "..."
}`;

function extractPromptKeywords(prompt: string): string[] {
  const tokens = prompt
    .toLowerCase()
    .split(/[^a-z0-9_]+/)
    .map((token) => token.trim())
    .filter((token) => token.length >= 3 && !STOP_WORDS.has(token));

  return Array.from(new Set(tokens));
}

function tableRelevanceScore(table: TableInfo, promptKeywords: string[]): number {
  const tableNameLower = table.tableName.toLowerCase();
  let score = 0;

  for (const keyword of promptKeywords) {
    if (tableNameLower === keyword) {
      score += 20;
    } else if (tableNameLower.includes(keyword)) {
      score += 10;
    }

    for (const column of table.columns) {
      const columnNameLower = column.columnName.toLowerCase();
      if (columnNameLower === keyword) {
        score += 8;
      } else if (columnNameLower.includes(keyword)) {
        score += 4;
      }
    }
  }

  return score;
}

function selectRelevantTables(schema: SchemaMetadata, prompt: string): TableInfo[] {
  const promptKeywords = extractPromptKeywords(prompt);
  if (promptKeywords.length === 0) {
    return schema.tables.slice(0, MAX_SCHEMA_TABLES);
  }

  const ranked = schema.tables
    .map((table) => ({ table, score: tableRelevanceScore(table, promptKeywords) }))
    .sort((a, b) => {
      if (b.score !== a.score) {
        return b.score - a.score;
      }
      return a.table.tableName.localeCompare(b.table.tableName);
    });

  const selected = ranked
    .filter((entry) => entry.score > 0)
    .slice(0, MAX_SCHEMA_TABLES)
    .map((entry) => entry.table);

  if (selected.length > 0) {
    return selected;
  }

  return schema.tables.slice(0, MAX_SCHEMA_TABLES);
}

function buildSchemaDescription(schema: SchemaMetadata, prompt: string): string {
  const selectedTables = selectRelevantTables(schema, prompt);
  const selectedTableNames = new Set(selectedTables.map((table) => table.tableName));

  const lines: string[] = [
    `Database: ${schema.databaseName}`,
    '',
    'Available tables and columns (use ONLY these exact names):',
  ];

  for (const table of selectedTables) {
    lines.push(`  Table "${table.tableName}":`);
    if (table.primaryKeys?.length) {
      lines.push(`    - primary keys: ${table.primaryKeys.join(', ')}`);
    }

    for (const col of table.columns.slice(0, MAX_SCHEMA_COLUMNS_PER_TABLE)) {
      lines.push(
        `    - ${table.tableName}.${col.columnName} (${col.dataType}${col.isNullable ? ', nullable' : ''})`,
      );
    }
  }

  const relationLines: string[] = [];
  for (const table of selectedTables) {
    for (const fk of table.foreignKeys ?? []) {
      if (selectedTableNames.has(fk.referencedTableName)) {
        relationLines.push(
          `  - ${table.tableName}.${fk.columnName} -> ${fk.referencedTableName}.${fk.referencedColumnName}`,
        );
      }
    }
  }

  if (relationLines.length) {
    lines.push('', 'Foreign key relationships (prefer these joins):', ...relationLines);
  } else {
    lines.push('', 'Foreign key relationships: none found among selected tables.');
  }

  lines.push('', `Schema focus: selected ${selectedTables.length} of ${schema.tables.length} tables based on prompt relevance.`);

  const joined = lines.join('\n');
  if (joined.length <= MAX_SCHEMA_CHARS) {
    return joined;
  }

  return `${joined.slice(0, MAX_SCHEMA_CHARS)}\n... (schema truncated to stay within model token budget)`;
}

function truncateText(value: string, maxChars: number): string {
  if (value.length <= maxChars) {
    return value;
  }

  return `${value.slice(0, maxChars)}... (truncated)`;
}

function estimateRequestedTokens(messages: OpenAiMessage[], maxTokens: number): number {
  const totalChars = messages.reduce((sum, message) => sum + message.content.length, 0);
  // Includes rough message framing overhead and requested output tokens.
  return Math.ceil(totalChars / APPROX_CHARS_PER_TOKEN) + 200 + maxTokens;
}

function buildUserMessage(
  promptLabel: string,
  prompt: string,
  schema: SchemaMetadata,
  extraSections: string[] = [],
): string {
  const safePrompt = truncateText(prompt, MAX_PROMPT_CHARS);
  const schemaDescription = buildSchemaDescription(schema, safePrompt);

  return [
    `Database Schema:\n${schemaDescription}`,
    ...extraSections,
    `${promptLabel}: ${safePrompt}`,
  ].join('\n\n');
}

export class OpenAiProvider extends AiProviderBase {
  constructor(
    private readonly apiKey: string,
    private readonly model: string = 'gpt-4o',
  ) {
    super();
  }

  private async callApi(messages: OpenAiMessage[]): Promise<AiChartResult> {
    const content = await this.callRaw(messages);
    const parsed = JSON.parse(content) as AiChartResult;

    if (!parsed.sql || !parsed.chartType || !parsed.chartConfig) {
      throw new Error('AI response is missing required fields (sql, chartType, chartConfig).');
    }

    return parsed;
  }

  private async callRaw(messages: OpenAiMessage[]): Promise<string> {
    const estimatedRequestedTokens = estimateRequestedTokens(messages, MAX_OUTPUT_TOKENS);
    if (estimatedRequestedTokens > TPM_LIMIT - TPM_SAFETY_BUFFER) {
      throw new Error(
        `AI request is too large (${estimatedRequestedTokens} estimated tokens). Please narrow the prompt or schema and try again.`,
      );
    }

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
        max_tokens: MAX_OUTPUT_TOKENS,
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

    return content;
  }

  async generateChart(
    prompt: string,
    schema: SchemaMetadata,
  ): Promise<AiChartResult> {
    return this.callApi([
      { role: 'system', content: SYSTEM_PROMPT },
      {
        role: 'user',
        content: buildUserMessage('User Request', prompt, schema),
      },
    ]);
  }

  async modifyChart(
    prompt: string,
    existingConfig: Record<string, unknown>,
    schema: SchemaMetadata,
  ): Promise<AiChartResult> {
    const existingConfigText = truncateText(
      JSON.stringify(existingConfig),
      MAX_EXISTING_CONFIG_CHARS,
    );

    return this.callApi([
      { role: 'system', content: SYSTEM_PROMPT },
      {
        role: 'user',
        content: buildUserMessage('Modification Request', prompt, schema, [
          `Existing Chart Configuration (minified):\n${existingConfigText}`,
        ]),
      },
    ]);
  }

  async generateFilter(
    prompt: string,
    schema: SchemaMetadata,
  ): Promise<AiFilterResult> {
    const content = await this.callRaw([
      { role: 'system', content: FILTER_SYSTEM_PROMPT },
      {
        role: 'user',
        content: buildUserMessage('Filter Request', prompt, schema),
      },
    ]);

    const parsed = JSON.parse(content) as AiFilterResult;
    if (!parsed.name || !parsed.filterType || !parsed.targetColumn) {
      throw new Error('AI response is missing required filter fields (name, filterType, targetColumn).');
    }

    return parsed;
  }
}
