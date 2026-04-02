import { BadRequestException, ForbiddenException } from '@nestjs/common';
import { AppRole, ROLE_ALIASES, ROLE_LABELS, ROLE_VALUES } from '../constants/roles';

export function normalizeRole(role: string): AppRole {
  const normalized = ROLE_ALIASES[role.trim().toLowerCase()];

  if (!normalized) {
    throw new BadRequestException(
      `Unsupported role "${role}". Allowed roles: ${ROLE_VALUES.join(', ')}, кладовщик`,
    );
  }

  return normalized;
}

export function assertRole(role: string): AppRole {
  return normalizeRole(role);
}

export function ensureAllowedRole(role: string, allowedRoles: readonly AppRole[]) {
  const normalizedRole = normalizeRole(role);

  if (!allowedRoles.includes(normalizedRole)) {
    throw new ForbiddenException('Insufficient permissions');
  }

  return normalizedRole;
}

export function getRoleLabel(role: AppRole) {
  return ROLE_LABELS[role];
}
