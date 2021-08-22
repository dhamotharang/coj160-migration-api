import { ApiProperty } from "@nestjs/swagger";

export class PostgresUserDTO {
  @ApiProperty() username: string;
  @ApiProperty() password: string;
  @ApiProperty() firstname: string;
  @ApiProperty() lastname: string;
  @ApiProperty() email: string;
  @ApiProperty({ required: false }) phoneNo: string;
  @ApiProperty({ required: false }) mobileNo: string;
}

export class PostgresUserAuthDTO {
  @ApiProperty() username: string;
  @ApiProperty() password: string;
}