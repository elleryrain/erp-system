export const ROLE_VALUES = ['admin', 'manager', 'warehouse_keeper'] as const;

export type AppRole = (typeof ROLE_VALUES)[number];

export const ROLE_ALIASES: Record<string, AppRole> = {
  admin: 'admin',
  manager: 'manager',
  warehouse_keeper: 'warehouse_keeper',
  warehousekeeper: 'warehouse_keeper',
  warehouse: 'warehouse_keeper',
  keeper: 'warehouse_keeper',
  кладовщик: 'warehouse_keeper',
};

export const ROLE_LABELS: Record<AppRole, string> = {
  admin: 'Администратор',
  manager: 'Менеджер',
  warehouse_keeper: 'Кладовщик',
};
