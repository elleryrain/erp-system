export const identityPatterns = {
  validateUser: 'identity.auth.validate_user',
  findUsers: 'identity.users.find_all',
  createUser: 'identity.users.create',
} as const;

export const catalogPatterns = {
  findCategories: 'catalog.categories.find_all',
  createCategory: 'catalog.categories.create',
  findProducts: 'catalog.products.find_all',
  createProduct: 'catalog.products.create',
} as const;

export const crmPatterns = {
  findClients: 'crm.clients.find_all',
  createClient: 'crm.clients.create',
  findSuppliers: 'crm.suppliers.find_all',
  createSupplier: 'crm.suppliers.create',
} as const;

export const inventoryPatterns = {
  findBatches: 'inventory.batches.find_all',
  findWarehouses: 'inventory.warehouses.find_all',
  findStockMovements: 'inventory.stock.find_all',
} as const;

export const ordersPatterns = {
  findPurchases: 'orders.purchases.find_all',
  createPurchase: 'orders.purchases.create',
  findSales: 'orders.sales.find_all',
  createSale: 'orders.sales.create',
} as const;
