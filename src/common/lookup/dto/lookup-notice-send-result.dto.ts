import { ApiProperty } from "@nestjs/swagger";

export class OracleLookupNoticeSendResultDTO {
  @ApiProperty() courtId: number;
  @ApiProperty() noticeSendResultName: string;
}