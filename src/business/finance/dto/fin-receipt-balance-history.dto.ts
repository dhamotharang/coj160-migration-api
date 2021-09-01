import { ApiProperty } from "@nestjs/swagger";

export class OracleFinReceiptBalanceHistorieDTO {
  @ApiProperty() paidAmount: number;
  @ApiProperty() paymentDetailId: number;
  @ApiProperty() receiptDetailId: number;
}