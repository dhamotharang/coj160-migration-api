import { Body, Controller, Get, Logger, Param, Post, Query, Req, Res, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiQuery, ApiParam } from '@nestjs/swagger';
import { OracleLookupRequestSubjectDTO } from 'src/common/lookup/dto/lookup-request-subject.dto';
import { AuthGaurd } from 'src/shared/guard/auth.guard';
import { ResponseDataController } from 'src/shared/response/response-data.controller';
import { LookupRequestSubjectService } from './lookup-request-subject.service';

@ApiTags("Lookup: Request subject")
@Controller('lookup/requestSubject')
export class LookupRequestSubjectController {
  constructor(
    private readonly mainService: LookupRequestSubjectService,
    private readonly resdata: ResponseDataController
  ) { }

  // Get Method
  @Get()
  @ApiOperation({ summary: "เรียกดูข้อมูลทั้งหมด" })
  @ApiBearerAuth()
  @UseGuards(new AuthGaurd())
  @ApiQuery({ name: "dbtype", enum: ["oracle", "mysql"] })
  async findData(@Res() res, @Req() req, @Query() query) {
    let dbtype = "ORACLE";
    if (typeof query.dbtype !== "undefined") {
      dbtype = query.dbtype.toUpperCase();
    }

    const resdata = await this.mainService[`find${dbtype}Data`](query, null);
    return this.resdata.responseFindSuccess(req, res, resdata.items, resdata.total);
  }

  @Get(':start/:limit/pages')
  @ApiOperation({ summary: "เรียกดูข้อมูลแบบ Pages" })
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
  async createData(@Res() res, @Req() req, @Body() body: OracleLookupRequestSubjectDTO) {
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
