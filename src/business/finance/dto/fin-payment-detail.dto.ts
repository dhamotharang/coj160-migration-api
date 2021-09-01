import { ApiProperty } from "@nestjs/swagger";

export class OracleFinPaymentDetailDTO {
  @ApiProperty() receiptSubType: number;
  @ApiProperty() receiptType: number;
  @ApiProperty() paymentId: number;
}