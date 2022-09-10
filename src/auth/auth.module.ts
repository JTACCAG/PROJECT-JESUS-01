import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from '../modules/user/user.module';
import { UserService } from '../modules/user/user.service';
import { User } from '../modules/user/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtStrategy } from './jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';

@Module({
  imports: [
    UserModule, 
    PassportModule, 
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '24h' },
    }),
  ],
  providers: [AuthService, LocalStrategy, UserService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
