import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt } from "passport-jwt";
import { Strategy } from "passport-local";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            // 헤더 Authentication 에서 Bearer 토큰으로부터 jwt를 추출하겠다는 의미
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), 
            secretOrkey: process.env.JWTSECRET_KEY, // jwt 생성시 비밀키로 사용할 텍스트 (노출 X)
            ignoreExpiration: false, // jwt 만료를 무시할 것인지 (기본값: false)
        });
    }
    
    // async validate(payload) {}
}