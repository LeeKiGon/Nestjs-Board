import { HttpExceptionFilter } from '../common/exceptions/http-exception.filter';
import { AuthService } from './auth.service';
import { Controller, Delete, Get, Patch, Post, UseFilters, HttpException, Param, ParseIntPipe } from '@nestjs/common';
import { PositiveIntPipe } from 'src/common/pipes/positivelnt.pipe';


@Controller('auth')
@UseFilters(HttpExceptionFilter)
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Get() //회원 정보 조회
    getuser() {
        throw new HttpException('api broken', 401);
        return 'Oneuser';
    }

    @Get(':id') //회원 정보 조회
    getOneuser(@Param('id', ParseIntPipe, PositiveIntPipe) param: number) {
        console.log(param)
        console.log(typeof(param))
        return 'Oneuser';
    }

    @Post() //회원 가입
    sing() {
        return 'sing';
    }

    @Post() //로그인
    login() {
        return 'login';
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

