import { ApiProperty } from '@nestjs/swagger';
import { AiProviderData } from '../create-ai-provider/create-ai-provider-response';

export class GetAiProviderListResponse {
  @ApiProperty() successMessage: string;
  @ApiProperty({ type: [AiProviderData] }) data: AiProviderData[];
  @ApiProperty() pageNumber: number;
  @ApiProperty() pageSize: number;
  @ApiProperty() totalCount: number;
}
