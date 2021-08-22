import { Controller, Get, Param, Query, Req, Res, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { AuthGaurd } from 'src/shared/guard/auth.guard';
import { ResponseDataController } from 'src/shared/response/response-data.controller';
import { DepartmentService } from './department.service';

@ApiTags("Organization: Department")
@Controller('department')
export class DepartmentController {
  constructor(
    private readonly mainService: DepartmentService,
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

  @Get(':start/:limit/pages')
  @ApiParam({ name: "start" })
  @ApiParam({ name: "limit" })
  @ApiOperation({ summary: "เรียกดูข้อมูลทั้งหมด แบบ Page" })
  @ApiQuery({ name: "dbtype", enum: ["oracle", "mysql"] })
  async findPageData(@Res() res, @Req() req, @Query() query, @Param() param) {
    let dbtype = "ORACLE";
    if (typeof query.dbtype !== "undefined") {
      dbtype = query.dbtype.toUpperCase();
    }
    const { start, limit } = param;
    const resdata = await this.mainService[`find${dbtype}Data`](query, { start, limit });
    return this.resdata.responseFindSuccess(req, res, resdata.items, resdata.total);
  }
}
