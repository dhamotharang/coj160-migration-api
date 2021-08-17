import { Controller, Get, Param, Query, Req, Res } from '@nestjs/common';
import { ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { ResponseDataController } from 'src/shared/response/response-data.controller';
import { MigrationLogService } from './migration-log.service';

@ApiTags("Migration Logs")
@Controller('migrationLog')
export class MigrationLogController {
  constructor(
    private readonly mainService: MigrationLogService,
    private readonly resdata: ResponseDataController
  ) { }

  // GET Method
  @Get()
  async findData(@Res() res, @Req() req, @Query() query) {
    let dbtype = "ORACLE";
    if (typeof query.dbtype !== "undefined") {
      dbtype = query.dbtype.toUpperCase();
    }

    const resdata = await this.mainService.findPOSTGRESData(query);
    return this.resdata.responseFindSuccess(req, res, resdata.items, resdata.total);
  }

  @ApiQuery({ name: "text", required: false })
  @ApiParam({ name: "start" })
  @ApiParam({ name: "limit" })
  @Get(':start/:limit/pages')
  async findPageData(@Res() res, @Req() req, @Query() query, @Param() param) {
    const { start, limit } = param;
    const resdata = await this.mainService.findPOSTGRESData(query, { start, limit });
    return this.resdata.responseFindSuccess(req, res, resdata.items, resdata.total);
  }
}
