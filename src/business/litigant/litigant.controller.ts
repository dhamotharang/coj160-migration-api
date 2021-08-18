import { Body, Controller, Get, Logger, Post, Query, Req, Res } from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { OracleLookupRequestSubjectDTO } from 'src/common/request/dto/oracle/lookup-request-subject.dto';
import { ResponseDataController } from 'src/shared/response/response-data.controller';
import { OracleLitigantDTO } from './dto/litigant.dto';
import { LitigantService } from './litigant.service';

@ApiTags("Litigant")
@Controller('litigant')
export class LitigantController {
  constructor(
    private readonly mainService: LitigantService,
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
    return this.resdata.responseFindSuccess(req, res, resdata.items, resdata.total);
  }


  // POST Method
  @Post()
  async createData(@Res() res, @Req() req, @Body() body: OracleLitigantDTO) {
    Logger.log(body, "body");
    const resdata = await this.mainService.createData(999, body);
    return this.resdata.responseCreateSuccess(req, res, resdata, 100);
  }

  /* @Post('migration')
  @Post()
  async createMigration(@Res() res, @Req() req, @Body() body) {
    const resdata = await this.mainService.createMigrationData(999, body);
    return this.resdata.responseCreateSuccess(req, res, resdata, 100);
  } */
}
