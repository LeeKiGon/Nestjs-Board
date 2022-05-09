import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { BaseEntity } from 'src/base-entity';

export class CreateAuthDto extends BaseEntity {
    @IsString()
    @IsNotEmpty()
    name : string;

    @IsEmail()
    @IsNotEmpty()
    email : string;

    @IsString()
    @IsNotEmpty()
	password : string;
}
