import { ApiProperty } from '@nestjs/swagger';
import { AiProviderData } from '../create-ai-provider/create-ai-provider-response';

export class UpdateAiProviderResponse {
  @ApiProperty() successMessage: string;
  @ApiProperty({ type: AiProviderData }) data: AiProviderData;
}
