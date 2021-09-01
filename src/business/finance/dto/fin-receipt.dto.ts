import { ApiProperty } from "@nestjs/swagger";

export class OracleFinReceiptDTO {
  @ApiProperty() courtId: number;
  @ApiProperty() caseId: number;
  @ApiProperty() receiptBookNo: number;
  @ApiProperty() receiptNo: number;
  @ApiProperty() receivedDate: Date;
  @ApiProperty() govBudgetYear: string;
  @ApiProperty() litigantType: number;
  @ApiProperty() payerName: string;
  @ApiProperty() totalAmount: number;
  @ApiProperty() isCancelReceipt: number;
  @ApiProperty() receivedBy: number;
  @ApiProperty() directorBy: number;
  @ApiProperty() receivedCashAmount: number;
  @ApiProperty() changeAmount: number;
  @ApiProperty() bankCode: string;
  @ApiProperty() isFlagAccount: number;
  @ApiProperty() receiptAccountNumber: string;
  @ApiProperty() noInDateNow: number;
  @ApiProperty() isElectronicFiling: number;
}