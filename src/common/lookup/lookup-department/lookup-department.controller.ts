import { Controller, Get, Param, Query, Req, Res } from '@nestjs/common';
import { ApiTags, ApiQuery, ApiParam, ApiOperation } from '@nestjs/swagger';
import { ResponseDataController } from 'src/shared/response/response-data.controller';
import { LookupDepartmentService } from './lookup-department.service';

@ApiTags("Lookup: Department")
@Controller('lookup/department')
export class LookupDepartmentController {
  constructor(
    private readonly mainService: LookupDepartmentService,
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


  @Get(':departmentId')
  @ApiParam({ name: "start" })
  @ApiParam({ name: "limit" })
  @ApiOperation({ summary: "เรียกดูข้อมูล แบบ ID" })
  async findOneData(@Res() res, @Req() req, @Query() query, @Param("departmentId") departmentId) {
    const resdata = await this.mainService.findORACLEOneData(null, departmentId);
    return this.resdata.responseFindOneSuccess(req, res, resdata.items, resdata.total);
  }
}
