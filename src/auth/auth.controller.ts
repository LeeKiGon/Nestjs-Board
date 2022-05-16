import { JwtAuthGuard } from './jwt/jwt.guard';
import { LoginRequestDto } from './dto/login.request.dto';
import { successInterceptor } from './../common/interceptors/success.interceptor';
import { HttpExceptionFilter } from '../common/exceptions/http-exception.filter';
import { AuthService } from './auth.service';
import { Controller, Delete, Get, Patch, Post, UseFilters, HttpException, Param, ParseIntPipe, UseInterceptors, Body, Req, UseGuards } from '@nestjs/common';
import { PositiveIntPipe } from 'src/common/pipes/positivelnt.pipe';
import { CreateAuthDto } from './dto/create-auth.dto';
import { User } from './entities/user.entity';
import { Request } from 'express';
import { ApiOperation } from '@nestjs/swagger';


@Controller('auth')
@UseInterceptors(successInterceptor)
@UseFilters(HttpExceptionFilter)
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @ApiOperation({ summary: '회원정보 조회'})
    @UseGuards(JwtAuthGuard)
    @Get() //회원 정보 조회
    getuser(@Req() req: Request) {
        console.log(req.user)
        return req.user;
    }

    @ApiOperation({ summary: '특정 회원정보 조회'})
    @Get(':id') //회원 정보 조회
    getOneuser(@Param('id', ParseIntPipe, PositiveIntPipe) param: number) {
        return 'Oneuser';
    }

    @ApiOperation({ summary: '회원가입'})
    @Post()
    async signUp(@Body() body: CreateAuthDto): Promise<User> {
        return await this.authService.signUp(body);
    }

    @ApiOperation({ summary: '로그인'})
    @UseGuards(JwtAuthGuard)
    @Post('login')
    async login(@Body() data: LoginRequestDto) {
        return await this.authService.login(data);
    }

    @ApiOperation({ summary: '회원 정보 수정'})
    @Patch(':id')
    patchuser() {
        return 'patchuser';
    }

    @ApiOperation({ summary: '회원 삭제'})
    @Delete(':id')
    deleteuser() {
        return 'deleteuser';
    }
}

