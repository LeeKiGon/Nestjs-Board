import { successInterceptor } from './../common/interceptors/success.interceptor';
import { HttpExceptionFilter } from '../common/exceptions/http-exception.filter';
import { AuthService } from './auth.service';
import { Controller, Delete, Get, Patch, Post, UseFilters, HttpException, Param, ParseIntPipe, UseInterceptors, Body } from '@nestjs/common';
import { PositiveIntPipe } from 'src/common/pipes/positivelnt.pipe';
import { CreateAuthDto } from './dto/create-auth.dto';
import { User } from './entities/user.entity';


@Controller('auth')
@UseInterceptors(successInterceptor)
@UseFilters(HttpExceptionFilter)
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Get() //회원 정보 조회
    getuser() {
        console.log('hello wolrd')
        // throw new HttpException('api broken', 401);
        return 'finduser';
    }

    @Get(':id') //회원 정보 조회
    getOneuser(@Param('id', ParseIntPipe, PositiveIntPipe) param: number) {
        return 'Oneuser';
    }

    @Post() //회원 가입
    async signUP(@Body() body: CreateAuthDto): Promise<User> {
        return await this.authService.signUp(body);
    }

    @Post() //로그인
    async login(@Body() body: CreateAuthDto): Promise<User> {
        return await this.authService.login(body);
    }

    @Patch(':id') //회원 정보 수정
    patchuser() {
        return 'patchuser';
    }

    @Delete(':id') //회원 삭제
    deleteuser() {
        return 'deleteuser';
    }
}

