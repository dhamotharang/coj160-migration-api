import { Body, Controller, Get, Logger, Post, Query, Req, Res, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGaurd } from 'src/shared/guard/auth.guard';
import { ResponseDataController } from 'src/shared/response/response-data.controller';
import { LookupRequestTypeDTO } from '../dto/lookup-request-type.dto';
import { LookupRequestTypeService } from './lookup-request-type.service';

@ApiTags("Lookup: Request type")
@Controller('lookup/requestType')
export class LookupRequestTypeController {
  constructor(
    private readonly mainService: LookupRequestTypeService,
    private readonly resdata: ResponseDataController
  ) { }

  // Get Method
  @Get()
  @ApiOperation({ summary: "เรียกดูข้อมูลทั้งหมด" })
  @ApiQuery({ name: "dbtype", enum: ["oracle", "mysql"] })
  async findData(@Res() res, @Req() req, @Query() query) {
    let dbtype = "ORACLE";
    if (typeof query.dbtype !== "undefined") {
      dbtype = query.dbtype.toUpperCase();
    }

    const resdata = await this.mainService[`find${dbtype}Data`](query, null);
    return this.resdata.responseFindSuccess(req, res, resdata.items, resdata.total);
  }


  // POST Method
  @Post()
  @ApiOperation({ summary: "เพิ่มข้อมูล" })
  @ApiBearerAuth()
  @UseGuards(new AuthGaurd())
  async createData(@Res() res, @Req() req, @Body() body: LookupRequestTypeDTO) {
    Logger.log(body, "body");
    const resdata = await this.mainService.createData(999, body);
    return this.resdata.responseCreateSuccess(req, res, resdata, 100);
  }

  @Post('migration')
  @ApiOperation({ summary: "นำเข้าข้อมูล" })
  @ApiBearerAuth()
  @UseGuards(new AuthGaurd())
  async createMigration(@Res() res, @Req() req, @Body() body) {
    const resdata = await this.mainService.createMigrationData(999, body);
    return this.resdata.responseCreateSuccess(req, res, resdata, 100);
  }
}
