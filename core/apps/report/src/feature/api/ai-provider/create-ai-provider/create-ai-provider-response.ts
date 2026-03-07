import { ApiProperty } from '@nestjs/swagger';

export class AiProviderData {
  @ApiProperty() id: string;
  @ApiProperty() name: string;
  @ApiProperty() model: string;
  @ApiProperty() isEnabled: boolean;
  @ApiProperty() createdAt: Date;
}

export class CreateAiProviderResponse {
  @ApiProperty() successMessage: string;
  @ApiProperty({ type: AiProviderData }) data: AiProviderData;
}
