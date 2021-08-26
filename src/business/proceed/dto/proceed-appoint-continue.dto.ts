import { ApiProperty } from "@nestjs/swagger";

export class OracleProceedAppointContinueDTO {
  @ApiProperty() appointTableId: number;
  @ApiProperty() appointId: number;
  @ApiProperty() choice: number;
  @ApiProperty() choiceTime: string;
  @ApiProperty() reasonAppointId: number;
  @ApiProperty() roomId: number;
  @ApiProperty() translate: number;
  @ApiProperty() startDate: Date;
}