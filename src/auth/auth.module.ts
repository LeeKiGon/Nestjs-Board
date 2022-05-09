import { UserRepository } from './auth.repository';
import { JwtStrategy } from './jwt/jwt.strategy';
import { AuthService } from './auth.service';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';

@Module({
    imports: [
        PassportModule.register({ defaultStrategy: 'jwt', session: false }),

        JwtModule.register({
            secret: 'secret',
            signOptions: { expiresIn: '1y'},
        }),
    ],
    providers: [AuthService, JwtStrategy, UserRepository],
    controllers: [AuthController]
})
export class AuthModule {}
