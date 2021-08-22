import { Controller, Request, Post, UseGuards, Body } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { PostgresUserAuthDTO } from './common/person/dto/user.dto';

@ApiTags("Authentication & Access")
@Controller()
export class AppController {

  @UseGuards(LocalAuthGuard)
  @ApiOperation({ summary: "เข้าสู่ระบบ" })
  @Post('auth/login')
  async login(@Request() req, @Body() body: PostgresUserAuthDTO) {
    return req.user;
  }
}
