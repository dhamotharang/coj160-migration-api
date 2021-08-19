import { Controller, Get, Query, Req, Res } from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { ResponseDataController } from 'src/shared/response/response-data.controller';
import { OfficerService } from './officer.service';

@ApiTags("Person: Officer")
@Controller('officer')
export class OfficerController {
  constructor(
    private readonly mainService: OfficerService,
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
}
