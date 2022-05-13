import { LoginRequestDto } from './dto/login.request.dto';
import { UserRepository } from './auth.repository';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeOrm'
import { HttpException } from '@nestjs/common/exceptions/http.exception';

@Injectable()
export class AuthService {
    constructor(
        // @InjectRepository(User)
        private readonly userRepository: UserRepository) {}


    async signUp(body: CreateAuthDto): Promise<User> {
        const getuserByemail = await this.userRepository.getuserByemail(body);

        if (getuserByemail) throw new HttpException('이미 가입된 이메일 입니다', 401);

        const user = new User();
            user.email = body.email;
            user.name = body.name;
            user.password = body.password;
            
        return this.userRepository.usercreate(user);
    }

    // async login(data: LoginRequestDto) {
    //     const { email, password } = data;

    //     const user = await this.userRepository.findUserByEmail(email);

    //     if (!user) {
    //         throw new UnauthorizedException('이메일과 비밀번호를 확인해주세요!');
    //     }
    // }
}
