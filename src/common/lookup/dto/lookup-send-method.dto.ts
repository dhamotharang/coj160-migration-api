import { ApiProperty } from "@nestjs/swagger";

export class OracleLookupSendMethodDTO {
  @ApiProperty() courtId: number;
  @ApiProperty() sendMethodName: string;
}