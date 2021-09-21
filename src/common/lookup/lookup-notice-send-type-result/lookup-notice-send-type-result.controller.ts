import { Body, Controller, Get, Param, Post, Query, Req, Res, UseGuards } from '@nestjs/common';
import { ApiTags, ApiQuery, ApiOperation, ApiParam, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGaurd } from 'src/shared/guard/auth.guard';
import { ResponseDataController } from 'src/shared/response/response-data.controller';
import { OracleLookupNoticeSendTypeResultDTO } from '../dto/lookup-notice-send-type-result.dto';
import { LookupNoticeSendTypeResultService } from './lookup-notice-send-type-result.service';

@ApiTags("Lookup: Notice send type result")
@Controller('lookup/noticeSendTypeResult')
export class LookupNoticeSendTypeResultController {
  constructor(
    private mainService: LookupNoticeSendTypeResultService,
    private resdata: ResponseDataController,
  ) { }

  // Get Method
  @Get()
  @ApiQuery({ name: "dbtype", enum: ["oracle", "mysql"] })
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
  @ApiQuery({ name: "dbtype", enum: ["oracle", "mysql"] })
  @ApiQuery({ name: "text", required: false })
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

  @Get(':id')
  @ApiOperation({ summary: "เรียกดูข้อมูลด้วย Id" })
  @ApiBearerAuth()
  @UseGuards(new AuthGaurd())
  @ApiQuery({ name: "dbtype", enum: ["oracle", "mysql"] })
  @ApiParam({ name: "id" })
  async findOneData(@Res() res, @Req() req, @Query() query, @Param() param) {
    let dbtype = "ORACLE";
    if (typeof query.dbtype !== "undefined") {
      dbtype = query.dbtype.toUpperCase();
    }

    const resdata = await this.mainService[`find${dbtype}OneData`](null, param.id);
    return this.resdata.responseFindSuccess(req, res, resdata.items, resdata.total, "", { query });
  }


  // POST Method
  @Post()
  @ApiBearerAuth()
  @UseGuards(new AuthGaurd())
  @ApiOperation({ summary: "เพิ่มข้อมูล" })
  async createData(@Res() res, @Req() req, @Body() body: OracleLookupNoticeSendTypeResultDTO) {
    const resdata = await this.mainService.createData(999, body);
    return this.resdata.responseCreateSuccess(req, res, resdata, 100);
  }
}
