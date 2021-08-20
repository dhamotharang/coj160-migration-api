import { Body, Controller, Get, Logger, Param, Post, Query, Req, Res } from '@nestjs/common';
import { ApiQuery, ApiParam, ApiTags, ApiOperation, ApiProduces, ApiConsumes } from '@nestjs/swagger';
import { ResponseDataController } from 'src/shared/response/response-data.controller';
import { OracleLookupAppointListDTO } from '../dto/lookup-appoint-list.dto';
import { AppointListService } from './appoint-list.service';

@ApiTags("Lookup: Appoint list")
@Controller('lookupAppointList')
export class AppointListController {
  constructor(
    private readonly mainService: AppointListService,
    private readonly resdata: ResponseDataController,
  ) { }

  // Get Method
  @Get()
  @ApiQuery({ name: "dbtype" })
  @ApiOperation({ summary: "เรียกดูข้อมูลทั้งหมด" })
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
  @ApiQuery({ name: "text", required: false })
  @ApiQuery({ name: "orderNo", required: false })
  @ApiQuery({ name: "activeFlag", required: false })
  @ApiQuery({ name: "appointListCode", required: false })
  @ApiQuery({ name: "courtId", required: false })
  @ApiOperation({ summary: "เรียกดูข้อมูลแบบ Page" })
  async findPageData(@Res() res, @Req() req, @Query() query, @Param() param) {
    let dbtype = "ORACLE";
    if (typeof query.dbtype !== "undefined") {
      dbtype = query.dbtype.toUpperCase();
    }

    const { start, limit } = param;

    const resdata = await this.mainService[`find${dbtype}Data`](query, { start, limit });
    return this.resdata.responseFindSuccess(req, res, resdata.items, resdata.total, "", { param, query });
  }

  @Get(':appointListId')
  @ApiQuery({ name: "dbtype" })
  @ApiParam({ name: "appointListId" })
  @ApiOperation({ summary: "ค้นหาด้วย id" })
  async findOneData(@Res() res, @Req() req, @Query() query, @Param() param) {
    let dbtype = "ORACLE";
    if (typeof query.dbtype !== "undefined") {
      dbtype = query.dbtype.toUpperCase();
    }

    const resdata = await this.mainService[`find${dbtype}OneData`](null, param.appointListId);
    return this.resdata.responseFindSuccess(req, res, resdata.items, resdata.total, "", { query });
  }




  // POST Method
  @Post()
  @ApiOperation({ summary: "เพิ่มข้อมูล" })
  async createData(@Res() res, @Req() req, @Body() body: OracleLookupAppointListDTO) {
    const resdata = await this.mainService.createData(999, body);
    return this.resdata.responseCreateSuccess(req, res, resdata, 100);
  }

  @Post('migration')
  @ApiOperation({ summary: "นำเข้ข้อมูล" })
  async createMigration(@Res() res, @Req() req, @Body() body) {
    const resdata = await this.mainService.createMigrationData(999, body);
    return this.resdata.responseCreateSuccess(req, res, resdata, 100);
  }
}
