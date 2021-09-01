import { ApiProperty } from "@nestjs/swagger";

export class OracleLookupReceiptTypeDTO {
  @ApiProperty() courtId: number;
  @ApiProperty() receiptTypeName: string;
}
