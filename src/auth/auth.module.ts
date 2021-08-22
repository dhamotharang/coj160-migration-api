import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { PersonModule } from 'src/common/person/person.module';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';

@Module({
  imports: [
    PersonModule,
    PassportModule,
    JwtModule.register({
      secret: `${process.env.SECRET}`,
      publicKey: './key/public.key',
      privateKey: './key/private.key',
      signOptions: { expiresIn: '1d' },
    }),

  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule { }
