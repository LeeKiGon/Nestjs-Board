import { BaseEntity } from '../../base-entity';
import { Column, Entity } from 'typeorm';

@Entity('users')
export class User extends BaseEntity { // 1
  @Column({ type: 'varchar', length: 20, nullable: false })
  name: string;

  @Column({ type: 'varchar', length: 40, nullable: false, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 30, nullable: false })
  password: string;
}