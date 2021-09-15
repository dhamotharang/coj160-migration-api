import { ApiProperty } from "@nestjs/swagger";

export class OracleLookupBankDTO {
  @ApiProperty() bankName: string;
  @ApiProperty() courtId: number;
}