import { Body, Controller, Get, Logger, Param, Post, Query, Req, Res, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery, ApiParam, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGaurd } from 'src/shared/guard/auth.guard';
import { ResponseDataController } from 'src/shared/response/response-data.controller';
import { OracleLitigantDTO } from '../dto/litigant.dto';
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
  @ApiOperation({ summary: "เรียกดูข้อมูลทั้งหมด" })
  @ApiQuery({ name: "dbtype", enum: ["oracle", "mysql"] })
  async findData(@Res() res, @Req() req, @Query() query) {
    let dbtype = "ORACLE";
    if (typeof query.dbtype !== "undefined") {
      dbtype = query.dbtype.toUpperCase();
    }

    const resposneData = await this.mainService[`find${dbtype}Data`](query, null);
    return this.resdata.responseFindSuccess(req, res, resposneData.items, resposneData.total);
  }

  @Get(':start/:limit/pages')
  @ApiParam({ name: "limit" })
  @ApiParam({ name: "start" })
  @ApiQuery({ name: "dbtype", enum: ["oracle", "mysql"] })
  @ApiOperation({ summary: "เรียกดูข้อมูลแบบ Page" })
  async findPageData(@Res() res, @Req() req, @Query() query, @Param() param) {
    let dbtype = "ORACLE";
    if (typeof query.dbtype !== "undefined") {
      dbtype = query.dbtype.toUpperCase();
    }

    const { start, limit } = param;

    const resposneData = await this.mainService[`find${dbtype}Data`](query, { start, limit });
    return this.resdata.responseFindSuccess(req, res, resposneData.items, resposneData.total, "", { param, query });
  }

  @Get(':litigantId')
  @ApiParam({ name: "litigantId" })
  @ApiOperation({ summary: "เรียกดูข้อมูลแบบ Page" })
  async findById(@Res() res, @Req() req, @Query() query, @Param('litigantId') litigantId) {
    const resposneData = await this.mainService.findORACLEOneData(null, litigantId);
    return this.resdata.responseFindSuccess(req, res, resposneData.items, resposneData.total, "", { param: { litigantId } });
  }




  // POST Method
  @Post()
  @ApiOperation({ summary: "เพิ่มข้อมูล" })
  @ApiBearerAuth()
  @UseGuards(new AuthGaurd())
  async createData(@Res() res, @Req() req, @Body() body: OracleLitigantDTO) {
    const resposneData = await this.mainService.createData(999, body);
    return this.resdata.responseCreateSuccess(req, res, resposneData, 100);
  }

  @Post('migration')
  @ApiOperation({ summary: "นำเข้าข้อมูล" })
  @ApiBearerAuth()
  @UseGuards(new AuthGaurd())
  async createMigration(@Res() res, @Req() req, @Body() body) {
    const resposneData = await this.mainService.createMigrationData(999, body);
    return this.resdata.responseCreateSuccess(req, res, resposneData, 100, resposneData.sourceTotal);
  }
}
