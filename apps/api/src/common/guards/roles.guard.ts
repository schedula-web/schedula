import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRole } from '../../core/constants/enums';
import { ROLES_KEY } from '../decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {
  }

  canActivate(context: ExecutionContext): boolean {
    // 1. Logic: What roles are REQUIRED for this route? (e.g., ['ADMIN'])
    const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    // 2. Logic: If no @Roles label is found, anyone can pass (after JWT)
    if (!requiredRoles) {
      return true;
    }
    // 3. Logic: Get the 'user' object that JwtStrategy just created
    const { user } = context.switchToHttp().getRequest();

    if (!user || !user.role) {
      return false;
    }
    // 4. Logic: Compare the user's role to the required roles
    return requiredRoles.some((role) => user.role === role);
  }
}
