import { Body, Controller, Get, Logger, Param, Post, Query, Req, Res, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiParam, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGaurd } from 'src/shared/guard/auth.guard';
import { ResponseDataController } from 'src/shared/response/response-data.controller';
import { OracleNoticeDTO } from '../dto/notice.dto';
import { NoticeService } from './notice.service';

@ApiTags("Notice")
@Controller('notice')
export class NoticeController {
  constructor(
    private mainService: NoticeService,
    private resdata: ResponseDataController
  ) { }

  // Get Method
  @Get()
  @ApiOperation({ summary: "เรียกดูข้อมูลทั้งหมด" })
  @ApiQuery({ name: "timeEnd", required: false })
  @ApiQuery({ name: "timeStart", required: false })
  @ApiQuery({ name: "dbtype", enum: ["mysql"] })
  async findData(@Res() res, @Req() req, @Query() query) {
    let dbtype = "ORACLE";
    if (typeof query.dbtype !== "undefined") {
      dbtype = query.dbtype.toUpperCase();
    }

    const resdata = await this.mainService[`find${dbtype}Data`](query, null);
    return this.resdata.responseFindSuccess(req, res, resdata.items, resdata.total, "", { query });
  }

  @Get(':start/:limit/pages')
  @ApiOperation({ summary: "เรียกดูข้อมูลแบบ Pages" })
  @ApiQuery({ name: "timeEnd", required: false })
  @ApiQuery({ name: "timeStart", required: false })
  @ApiParam({ name: "limit" })
  @ApiParam({ name: "start" })
  @ApiQuery({ name: "dbtype", enum: ["oracle", "mysql"] })
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
  @ApiOperation({ summary: "เพิ่มข้อมูล" })
  @ApiBearerAuth()
  @UseGuards(new AuthGaurd())
  async createData(@Res() res, @Req() req, @Body() body: OracleNoticeDTO) {
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
    return this.resdata.responseCreateSuccess(req, res, resdata, 100, resdata.sourceTotal);
  }

  @Post('migration/:start/:limit/pages')
  @ApiOperation({ summary: "นำเข้าข้อมูล" })
  @ApiParam({ name: "limit" })
  @ApiParam({ name: "start" })
  @ApiBearerAuth()
  @UseGuards(new AuthGaurd())
  async createMigrationPage(@Res() res, @Req() req, @Body() body, @Param() param) {
    const { start, limit } = param;
    const resdata = await this.mainService.createMigrationData(999, body, { start, limit });
    return this.resdata.responseCreateSuccess(req, res, resdata, 100, resdata.sourceTotal);
  }
}
