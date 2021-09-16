import { Body, Controller, Get, Param, Post, Query, Req, Res, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiParam, ApiTags } from '@nestjs/swagger';
import { AuthGaurd } from 'src/shared/guard/auth.guard';
import { ResponseDataController } from 'src/shared/response/response-data.controller';
import { PostgreSQLMigrationSummaryDTO } from '../dto/migration-summry.dto';
import { SummaryService } from './summary.service';

@ApiTags("Migration summary")
@Controller('migrationSummary')
export class SummaryController {
  constructor(
    private mainService: SummaryService,
    private resdata: ResponseDataController
  ) { }

  // GET Method
  @Get()
  @ApiBearerAuth()
  @UseGuards(new AuthGaurd())
  @ApiOperation({ summary: "เรียกดูข้อมูลทั้งหมด" })
  async findData(@Res() res, @Req() req, @Query() query) {
    const resdata = await this.mainService.findData(query);
    return this.resdata.responseFindSuccess(req, res, resdata.items, resdata.total);
  }

  @ApiQuery({ name: "duplicateTotal", required: false })
  @ApiQuery({ name: "errorTotal", required: false })
  @ApiQuery({ name: "text", required: false })
  @ApiParam({ name: "start" })
  @ApiParam({ name: "limit" })
  @ApiOperation({ summary: "นำเข้าข้อมูล" })
  @ApiBearerAuth()
  @UseGuards(new AuthGaurd())
  @Get(':start/:limit/pages')
  async findPageData(@Res() res, @Req() req, @Query() query, @Param() param) {
    const { start, limit } = param;
    const resdata = await this.mainService.findData(query, { start, limit });
    return this.resdata.responseFindSuccess(req, res, resdata.items, resdata.total);
  }

  @Get(':id')
  @ApiBearerAuth()
  @UseGuards(new AuthGaurd())
  @ApiParam({ name: "id" })
  @ApiOperation({ summary: "เรียกดูข้อมูล Table ทั้งหมด" })
  async findById(@Res() res, @Req() req, @Param('id') id) {
    const resdata = await this.mainService.findOneData(id);
    return this.resdata.responseFindOneSuccess(req, res, resdata.items, resdata.total);
  }




  // POST Method
  @Post()
  @ApiOperation({ summary: "เพิ่มข้อมูล" })
  @ApiBearerAuth()
  @UseGuards(new AuthGaurd())
  async createData(@Res() res, @Req() req, @Body() body: PostgreSQLMigrationSummaryDTO) {
    const resdata = await this.mainService.createData(999, body);
    return this.resdata.responseCreateSuccess(req, res, resdata, 100);
  }
}
