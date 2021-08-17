import { ApiProperty } from "@nestjs/swagger";

export class MigrationLogDTO {
  @ApiProperty() name: string;
  @ApiProperty({ enum: ["PROD", "UAT"] }) serverType: string;
  @ApiProperty({ enum: ["SUCCESS", "ERROR"] }) status: string;
  @ApiProperty() datetime: Date;
  @ApiProperty({ enum: ["ORACLE", "MYSQL", "POSTGRES"] }) sourceDBType: string;
  @ApiProperty() sourceTableName: string;
  @ApiProperty() sourceId: number;
  @ApiProperty() sourceData: string;
  @ApiProperty({ enum: ["ORACLE", "MYSQL", "POSTGRES"] }) destinationDBType: string;
  @ApiProperty() destinationTableName: string;
  @ApiProperty() destinationId: number;
  @ApiProperty() destinationData: string;
}