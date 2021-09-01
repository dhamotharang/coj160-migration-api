import { ApiProperty } from "@nestjs/swagger";

export class OracleFinReceiptCreditDTO {
  @ApiProperty() receiptId: number;
  @ApiProperty() creditNo: string;
  @ApiProperty() cardHolderName: string;
  @ApiProperty() expiredDate: Date;
  @ApiProperty() bankCode: number;
  @ApiProperty() amount: number;
  @ApiProperty() courtId: number;
  @ApiProperty() receiptDetailId: number;
}