import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  // Logic: This 'validate' function runs if the token is mathematically correct
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET') || 'secret',
    });
  }

  async validate(payload: any) {
    // 1. Logic: Whatever you return here becomes 'request.user'
    // We extract the role from the token so the RolesGuard can see it later.
    return {
      userId: payload.sub,
      email: payload.email,
      role: payload.role,   // This is crucial for the RolesGuard!, jump to rolesguard
      schoolId: payload.schoolId
    };
  }
}
