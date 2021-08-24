import { ApiProperty } from "@nestjs/swagger";

export class OracleLookupAppointTableDTO {
  @ApiProperty() appointTableCode: string;
  @ApiProperty() appointTableName: string;
  @ApiProperty() courtId: number;
  @ApiProperty() remark: string;
  @ApiProperty() fri: number;
  @ApiProperty() mon: number;
  @ApiProperty() sat: number;
  @ApiProperty() sun: number;
  @ApiProperty() thu: number;
  @ApiProperty() tue: number;
  @ApiProperty() wed: number;
}