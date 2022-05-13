import { LoginRequestDto } from './dto/login.request.dto';
import { UserRepository } from './auth.repository';
import { Injectable, UnauthorizedException, Body } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeOrm'
import { HttpException } from '@nestjs/common/exceptions/http.exception';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        // @InjectRepository(User)
        private readonly userRepository: UserRepository, private jwtService: JwtService) {}


    async signUp(body: CreateAuthDto): Promise<User> {
        const { email, name, password } = body;

        const getuserByemail = await this.userRepository.findUserByEmail(email);

        if (getuserByemail) throw new HttpException('이미 가입된 이메일 입니다', 401);

        const user = new User();
            user.email = email;
            user.name = name;
            user.password = password;
            
        return this.userRepository.usercreate(user);
    }

    async login(data: LoginRequestDto) {
        const { email, password } = data;

        const user = await this.userRepository.findUserByEmail(email);
        if (!user) throw new UnauthorizedException('이메일과 비밀번호를 확인해주세요!1');
        
        const isPasswordValidated : boolean = await bcrypt.compare(
            password,
            user.password,
        );

        if (!isPasswordValidated) throw new UnauthorizedException('이메일과 비밀번호를 확인해주세요!2');

        const payload = { eamil: email, sub: user.id };

        return { token: this.jwtService.sign(payload)};
    }
}
