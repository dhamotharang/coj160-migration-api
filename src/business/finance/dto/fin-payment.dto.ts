import { ApiProperty } from "@nestjs/swagger";

export class OracleFinPaymentDTO {
  @ApiProperty() courtId: number;
  @ApiProperty() refCodeNo: number;
  @ApiProperty() totalAmount: number;
  @ApiProperty() paymentDate: Date;
}