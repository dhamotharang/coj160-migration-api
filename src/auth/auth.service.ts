import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/common/person/user/user.service';
import bcrypt = require('bcryptjs');

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService
  ) { }

  async validateUser(username: string, pass: string): Promise<any> {
    const users = await this.usersService.verify(username);
    if (!users || (!await users.comparePassword(pass))) {
      throw new HttpException("Invalid username/password.", HttpStatus.BAD_REQUEST);
    } else {
      return users.toResponseObject(false, true);
    }

    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async comparePassword(password: string, hash: string) {
    return await bcrypt.compare(`${password}`.trim(), hash);
  }
}
