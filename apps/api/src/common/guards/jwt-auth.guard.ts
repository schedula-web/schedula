import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    // 1. Logic: Use the "Reflector" to see if the @Public label exists
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(), // Checks the specific function
      context.getClass(),   // Checks the whole controller
    ]);

    // 2. Logic: If it's public, return true (let them in!)
    if (isPublic) {
      return true;
    }
    // 3. Logic: If NOT public, call 'super.canActivate' 
    // This triggers the Passport Strategy (the next file)
    // When you call 'super.canActivate(context)', NestJS jumps
    // over to your Passport Strategy because of the 'jwt' string.
    return super.canActivate(context);
  }
}
