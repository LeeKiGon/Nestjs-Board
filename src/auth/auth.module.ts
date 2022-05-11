import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtStrategy } from './jwt/jwt.strategy';
import { AuthService } from './auth.service';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { User } from './entities/user.entity';

@Module({
    imports: [
        PassportModule.register({ defaultStrategy: 'jwt', session: false }),

        JwtModule.register({
            secret: process.env.JWTSECRET_KEY,
            signOptions: { expiresIn: '1y'},
        }),
        TypeOrmModule.forFeature([User])
    ],
    providers: [AuthService, JwtStrategy],
    controllers: [AuthController]
})
export class AuthModule {}
