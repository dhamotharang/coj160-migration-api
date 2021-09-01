import { ApiProperty } from "@nestjs/swagger";

export class OracleFinReceiptCancelDTO {
  @ApiProperty() receiptId: number;
  @ApiProperty() cancelBy: number;
  @ApiProperty() cancelReason: string;
  @ApiProperty() cancalDate: Date;
  @ApiProperty() notes: string;
  @ApiProperty() courtId: number;
}