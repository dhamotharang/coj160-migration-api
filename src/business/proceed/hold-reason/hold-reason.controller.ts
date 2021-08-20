import { Body, Controller, Get, Logger, Param, Post, Query, Req, Res } from '@nestjs/common';
import { ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { ResponseDataController } from 'src/shared/response/response-data.controller';
import { OracleProceedHoldReasonDTO } from '../dto/proceed-hold-reason.dto';
import { HoldReasonService } from './hold-reason.service';

@ApiTags("Proceed: Hold reason")
@Controller('holdReason')
export class HoldReasonController {
  constructor(
    private readonly mainService: HoldReasonService,
    private readonly resdata: ResponseDataController
  ) { }

  // Get Method
  @Get()
  @ApiQuery({ name: "dbtype" })
  async findData(@Res() res, @Req() req, @Query() query) {
    let dbtype = "ORACLE";
    if (typeof query.dbtype !== "undefined") {
      dbtype = query.dbtype.toUpperCase();
    }

    const resdata = await this.mainService[`find${dbtype}Data`](query, null);
    return this.resdata.responseFindSuccess(req, res, resdata.items, resdata.total, "", { query });
  }

  @Get(':start/:limit/pages')
  @ApiParam({ name: "limit" })
  @ApiParam({ name: "start" })
  @ApiQuery({ name: "dbtype" })
  @ApiQuery({ name: "dbtype" })
  async findPageData(@Res() res, @Req() req, @Query() query, @Param() param) {
    let dbtype = "ORACLE";
    if (typeof query.dbtype !== "undefined") {
      dbtype = query.dbtype.toUpperCase();
    }

    const { start, limit } = param;

    const resdata = await this.mainService[`find${dbtype}Data`](query, { start, limit });
    return this.resdata.responseFindSuccess(req, res, resdata.items, resdata.total, "", { param, query });
  }




  // POST Method
  @Post()
  async createData(@Res() res, @Req() req, @Body() body: OracleProceedHoldReasonDTO) {
    Logger.log(body, "body");
    const resdata = await this.mainService.createData(999, body);
    return this.resdata.responseCreateSuccess(req, res, resdata, 100);
  }

  @Post('migration')
  async createMigration(@Res() res, @Req() req, @Body() body) {
    const resdata = await this.mainService.createMigrationData(999, body);
    return this.resdata.responseCreateSuccess(req, res, resdata, 100);
  }
}
