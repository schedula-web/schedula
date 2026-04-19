import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRole } from '../../core/constants/enums';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { AppLogger } from '../../core/logger/logger.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private logger: AppLogger
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    
    if (!requiredRoles) {
      return true;
    }
    
    const req = context.switchToHttp().getRequest();
    const { user } = req;

    if (!user || !user.role) {
      this.logger.warn(`Forbidden: User missing or role missing for ${req.method} ${req.url}`, 'RolesGuard');
      return false;
    }
    
    const isAllowed = requiredRoles.some((role) => user.role === role);
    if (!isAllowed) {
      this.logger.warn(`Forbidden: User with role '${user.role}' attempted to access ${req.method} ${req.url} (requires: ${requiredRoles.join(',')})`, 'RolesGuard');
    }
    
    return isAllowed;
  }
}
