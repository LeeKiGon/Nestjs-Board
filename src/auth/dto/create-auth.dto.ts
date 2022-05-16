import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { BaseEntity } from 'src/base-entity';

export class CreateAuthDto extends BaseEntity {
    @ApiProperty({
        example: 'username',
        description: 'name',
        required: true,
    })
    @IsString()
    @IsNotEmpty()
    name : string;

    @ApiProperty({
        example: 'user@email.com',
        description: 'email',
        required: true,
    })
    @IsEmail()
    @IsNotEmpty()
    email : string;

    @ApiProperty({
        example: '123456',
        description: 'password',
        required: true,
    })
    @IsString()
    @IsNotEmpty()
	password : string;
}
