import { LoginRequestDto } from './dto/login.request.dto';
import { CreateAuthDto } from './dto/create-auth.dto';
import { EntityRepository, Repository } from 'typeorm';
import { User } from '../auth/entities/user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {

    async findUserByEmail(email: string): Promise<User | null> {
        const user = await this.
        findOne({ 
            where: {email: email}
        })
        return user;
    };

    async usercreate(body: CreateAuthDto): Promise<User> {
        return await this.save(body);
    };
    
    async findUserByIdWithowtPassword(id: string): Promise<User> {
        const user = await this.
        findOne({
            where: {id: id},
            select: ['email', 'name']
        })
        return user;
    };
    
}
