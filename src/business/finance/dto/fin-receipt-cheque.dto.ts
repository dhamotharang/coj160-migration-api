import { ApiProperty } from "@nestjs/swagger";

export class OracleFinReceiptChequeDTO {
  @ApiProperty() receiptId: number;
  @ApiProperty() bankCode: number;
  @ApiProperty() paidDate: Date;
  @ApiProperty() amount: number;
  @ApiProperty() courtId: number;
  @ApiProperty() receiptDetailId: number;
  @ApiProperty() bankName: string;
}