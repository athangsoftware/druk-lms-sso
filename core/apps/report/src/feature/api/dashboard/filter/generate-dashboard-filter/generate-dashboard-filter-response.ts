import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class AiFilterSuggestion {
  @ApiProperty() name: string;
  @ApiProperty() filterType: string;
  @ApiProperty() targetColumn: string;
  @ApiPropertyOptional() sourceQuery?: string;
  @ApiPropertyOptional() defaultValue?: string;
}

export class GenerateDashboardFilterResponse {
  @ApiProperty() successMessage: string;
  @ApiProperty({ type: AiFilterSuggestion }) data: AiFilterSuggestion;
  @ApiPropertyOptional({ type: [String] }) warnings?: string[];
  @ApiPropertyOptional({ type: [String] }) suggestions?: string[];
}
