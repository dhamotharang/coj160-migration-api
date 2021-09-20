import { Body, Controller, Get, Param, Post, Query, Req, Res, UseGuards } from '@nestjs/common';
import { ApiTags, ApiQuery, ApiOperation, ApiParam, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGaurd } from 'src/shared/guard/auth.guard';
import { ResponseDataController } from 'src/shared/response/response-data.controller';
import { OracleFinReceiptDTO } from '../dto/fin-receipt.dto';
import { FinReceiptService } from './fin-receipt.service';

@ApiTags("Finance: Receipt")
@Controller('finance/receipt')
export class FinReceiptController {
  constructor(
    private mainService: FinReceiptService,
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

    const responseData = await this.mainService[`find${dbtype}Data`](query, null);
    return this.resdata.responseFindSuccess(req, res, responseData.items, responseData.total, "", { query });
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

    const responseData = await this.mainService[`find${dbtype}Data`](query, { start, limit });
    return this.resdata.responseFindSuccess(req, res, responseData.items, responseData.total, "", { param, query });
  }

  @Get(':noticeTypeId')
  @ApiOperation({ summary: "เรียกดูข้อมูลด้วย Id" })
  @ApiBearerAuth()
  @UseGuards(new AuthGaurd())
  @ApiQuery({ name: "dbtype", enum: ["oracle", "mysql"] })
  @ApiParam({ name: "noticeTypeId" })
  async findOneData(@Res() res, @Req() req, @Query() query, @Param() param) {
    let dbtype = "ORACLE";
    if (typeof query.dbtype !== "undefined") {
      dbtype = query.dbtype.toUpperCase();
    }

    const responseData = await this.mainService[`find${dbtype}OneData`](null, param.appointListId);
    return this.resdata.responseFindSuccess(req, res, responseData.items, responseData.total, "", { query });
  }


  // POST Method
  @Post()
  @ApiBearerAuth()
  @UseGuards(new AuthGaurd())
  @ApiOperation({ summary: "เพิ่มข้อมูล" })
  async createData(@Res() res, @Req() req, @Body() body: OracleFinReceiptDTO) {
    const responseData = await this.mainService.createData(999, body);
    return this.resdata.responseCreateSuccess(req, res, responseData, 100);
  }

  @Post('migration')
  @ApiOperation({ summary: "นำเข้าข้อมูล" })
  @ApiBearerAuth()
  @UseGuards(new AuthGaurd())
  async createMigration(@Res() res, @Req() req, @Body() body) {
    const responseData = await this.mainService.createMigrationData(999, body);
    return this.resdata.responseCreateSuccess(req, res, responseData, 100);
  }


  @Post('migration/:start/:limit/pages')
  @ApiOperation({ summary: "นำเข้าข้อมูล" })
  @ApiBearerAuth()
  @UseGuards(new AuthGaurd())
  async createMigrationByPages(@Res() res, @Req() req, @Body() body, @Param() param) {
    const { start, limit } = param;
    const responseData = await this.mainService.createMigrationData(999, body, { start, limit });
    return this.resdata.responseCreateSuccess(req, res, responseData, 100);
  }
}
