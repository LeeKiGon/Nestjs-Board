import { UserRepository } from './auth.repository';
import { Injectable } from '@nestjs/common';
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
        const { email, name, password } = body;

        const finduser = await this.userRepository.findOne({ email })
        
        if(finduser) throw new HttpException('이미 가입된 이메일 입니다', 401)

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User();
        user.email = email;
        user.name = name;
        user.password = hashedPassword;
        
        await this.userRepository.save(user);
        console.log(user);

        return user;
    }
}
