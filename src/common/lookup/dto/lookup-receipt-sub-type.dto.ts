import { ApiProperty } from "@nestjs/swagger";

export class OracleLookupReceiptSubTypeDTO {
  @ApiProperty() courtId: number;
  @ApiProperty() defaultValue: number;
  @ApiProperty() fineType: number;
  @ApiProperty() noEditFlag: number;
  @ApiProperty() otherFlag: number;
  @ApiProperty() printFlag: number;
  @ApiProperty() receiptSubTypeName: string;
  @ApiProperty() receiptTypeId: number;
}