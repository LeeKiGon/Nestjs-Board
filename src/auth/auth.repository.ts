import { CreateAuthDto } from './dto/create-auth.dto';
import { EntityRepository, Repository } from 'typeorm';
import { User } from '../auth/entities/user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {

    async getuserByemail(body: CreateAuthDto): Promise<User> {
        const { email } = body;
        const getuserByemail = await this.findOne({email: email})
        return getuserByemail
    }

    async usercreate(body: CreateAuthDto): Promise<User> {        
        return await this.save(body);
    }
    
    async findUserByEmail(body: CreateAuthDto): Promise<User | null> {
        const user = await this.getuserByemail(body);
        return user;
    }
}
