import { ApiProperty } from "@nestjs/swagger";

export class OracleLookupNoticeTypeDTO {
  @ApiProperty() courtId: number;
  @ApiProperty() noticeNameShort: string;
  @ApiProperty() noticePrint: string;
  @ApiProperty() noticeTypeName: string;
}