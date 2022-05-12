import { CreateAuthDto } from './dto/create-auth.dto';
import { EntityRepository, Repository } from 'typeorm';
import { User } from '../auth/entities/user.entity';
import { HttpException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

// @Injectable()
@EntityRepository(User)
export class UserRepository extends Repository<User> {

    async getuserByemail(body: CreateAuthDto): Promise<User> {
        const { email } = body;
        console.log(email)
        const getuserByemail = await this.findOne(email)
        return getuserByemail
    }

    async usercreate(body: CreateAuthDto): Promise<User> {
            const { email, name, password } = body;
            const getuserByemail = this.findOne({email: email})
            console.log(email)
            console.log(getuserByemail)
    
            const user = new User();
            user.email = email;
            user.name = name;
            user.password = password;
            
            // await this.save(user);
            return user;
        }
    
    // async create(user: CreateAuthDto): Promise<User>{
    //     return await this.create(user)
    // }
}
