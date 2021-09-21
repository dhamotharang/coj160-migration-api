import { ApiProperty } from "@nestjs/swagger";

export class OracleLookupNoticeSendTypeResultDTO {
  @ApiProperty() costFlag: number;
  @ApiProperty() courtId: number;
  @ApiProperty() noticeSendTypeResultCode: string;
  @ApiProperty() noticeSendTypeResultName: string;
}