import { UserRepository } from './auth.repository';
import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';

@Injectable()
export class AuthService {
    constructor(private readonly UserRepository: UserRepository) {}

    async signUp(body: CreateAuthDto): Promise<User> {
        const { email, name, password } = body;

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User();
        user.email = email;
        user.name = name;
        user.password = hashedPassword;
        
        await this.UserRepository.save(user);
        console.log(user);

        return user;
    }
}
