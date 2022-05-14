import { LoginRequestDto } from './dto/login.request.dto';
import { CreateAuthDto } from './dto/create-auth.dto';
import { EntityRepository, Repository } from 'typeorm';
import { User } from '../auth/entities/user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
    findById: any;

    async findUserByEmail(email: string): Promise<User | null> {
        const user = await this.findOne({ email });
        return user;
    }

    async usercreate(body: CreateAuthDto): Promise<User> {        
        return await this.save(body);
    }
    
    async findUserByIdWithowtPassword(id: string): Promise<User | null> {
        const user = await this.findById(id).select('-password');
        return user;
    }
    
}
