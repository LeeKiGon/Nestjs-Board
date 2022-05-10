import { EntityRepository, Repository } from 'typeorm';
import { User } from '../auth/entities/user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
    
    // async create(user: CreateAuthDto): Promise<User>{
    //     return await this.create(user)
    // }
}
