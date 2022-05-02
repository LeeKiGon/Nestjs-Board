import { IsEmail, IsNumber, IsString } from 'class-validator';
import { BaseEntity } from 'src/base-entity';

export class CreateAuthDto extends BaseEntity {
    @IsString()
    name : string;

    @IsEmail()
    email : string;

    @IsString()
	password : string;
}
