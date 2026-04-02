import { CanActivate, ExecutionContext, ForbiddenException, Inject, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ensureAllowedRole } from '../auth/role.utils';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { AppRole } from '../constants/roles';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(@Inject(Reflector) private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext) {
    const roles =
      this.reflector.getAllAndOverride<AppRole[]>(ROLES_KEY, [
        context.getHandler(),
        context.getClass(),
      ]) ?? [];

    if (roles.length === 0) {
      return true;
    }

    const request = context.switchToHttp().getRequest<{ user?: { role?: string } }>();
    const role = request.user?.role;

    if (!role) {
      throw new ForbiddenException('Role is missing in token');
    }

    ensureAllowedRole(role, roles);
    return true;
  }
}
