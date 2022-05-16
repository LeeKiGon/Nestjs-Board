import { BaseEntity } from '../../base-entity';
import { BeforeInsert, BeforeUpdate, Column, Entity } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { InternalServerErrorException } from '@nestjs/common';

@Entity('users')
export class User extends BaseEntity {
  
  @Column({ type: 'varchar', length: 20, nullable: false })
  name: string;

  @Column({ type: 'varchar', length: 40, nullable: false, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  password: string;

  @BeforeInsert()
  @BeforeUpdate()
    async hashPassword(): Promise<void> {
      if (this.password) {
        try {
          this.password = await bcrypt.hash(this.password, 10);
      } catch (error) {
        console.error(error);

        throw new InternalServerErrorException();
      }
    }
  }
}