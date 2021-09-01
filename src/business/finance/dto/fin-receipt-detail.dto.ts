import { ApiProperty } from "@nestjs/swagger";

export class OracleFinReceiptDetailDTO {
  @ApiProperty() receiptId: number;
  @ApiProperty() paidType: number;
  @ApiProperty() paidDescription: string;
  @ApiProperty() cashAmount: number;
  @ApiProperty() chequeAmount: number;
  @ApiProperty() transferAmount: number;
  @ApiProperty() creditAmount: number;
  @ApiProperty() totalAmount: number;
  @ApiProperty() transferBankId: number;
  @ApiProperty() transferDate: Date;
  @ApiProperty() isReceiptUsed: number;
}