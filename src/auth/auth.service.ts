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
        @InjectRepository(User)
        private readonly userRepository: UserRepository) {}


    async signUp(body: CreateAuthDto): Promise<User> {
            // const existsuser = await this.userRepository.getuserByemail(body)
            // if (existsuser) throw new HttpException('이미 가입된 이메일 입니다', 401)
            // await this.userRepository.usercreate(body);
            console.log('123');
            return this.userRepository.usercreate( body );
            // return this.userRepository.save(user)
        }

    // async signUp(body: CreateAuthDto): Promise<User> {
    //     const { email, name, password } = body;

    //     const finduser = await this.userRepository.findOne({ email })
        
    //     if(finduser) throw new HttpException('이미 가입된 이메일 입니다', 401)

    //     const hashedPassword = await bcrypt.hash(password, 10);

    //     const user = new User();
    //     user.email = email;
    //     user.name = name;
    //     user.password = hashedPassword;
        
    //     await this.userRepository.save(user);

    //     return user;
    // }

    // async login(data: LoginRequestDto) {
    //     const { email, password } = data;

    //     const user = await this.userRepository.findUserByEmail(email);

    //     if (!user) {
    //         throw new UnauthorizedException('이메일과 비밀번호를 확인해주세요!');
    //     }
    // }
}
