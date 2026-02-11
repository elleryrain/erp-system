import { relations } from 'drizzle-orm';
import {
  date,
  foreignKey,
  integer,
  numeric,
  pgTable,
  serial,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core';

export const roles = pgTable('roles', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 100 }).notNull().unique(),
});

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  roleId: integer('role_id')
    .notNull()
    .references(() => roles.id, { onDelete: 'restrict', onUpdate: 'cascade' }),
  email: varchar('email', { length: 255 }).notNull().unique(),
  passwordHash: varchar('password_hash', { length: 255 }).notNull(),
  fullName: varchar('full_name', { length: 255 }).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const clients = pgTable('clients', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  phone: varchar('phone', { length: 50 }),
  email: varchar('email', { length: 255 }),
});

export const suppliers = pgTable('suppliers', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  phone: varchar('phone', { length: 50 }),
  email: varchar('email', { length: 255 }),
});

export const units = pgTable('units', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 100 }).notNull(),
  shortName: varchar('short_name', { length: 30 }).notNull(),
});

export const productCategories = pgTable(
  'product_categories',
  {
    id: serial('id').primaryKey(),
    name: varchar('name', { length: 255 }).notNull(),
    parentId: integer('parent_id'),
  },
  (table) => [
    foreignKey({
      columns: [table.parentId],
      foreignColumns: [table.id],
      name: 'product_categories_parent_id_fkey',
    })
      .onDelete('set null')
      .onUpdate('cascade'),
  ],
);

export const products = pgTable('products', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  categoryId: integer('category_id')
    .notNull()
    .references(() => productCategories.id, {
      onDelete: 'restrict',
      onUpdate: 'cascade',
    }),
  unitId: integer('unit_id')
    .notNull()
    .references(() => units.id, { onDelete: 'restrict', onUpdate: 'cascade' }),
  price: numeric('price', { precision: 14, scale: 2 }).notNull(),
});

export const warehouses = pgTable('warehouses', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  address: varchar('address', { length: 500 }),
});

export const purchaseOrders = pgTable('purchase_orders', {
  id: serial('id').primaryKey(),
  supplierId: integer('supplier_id')
    .notNull()
    .references(() => suppliers.id, { onDelete: 'restrict', onUpdate: 'cascade' }),
  orderDate: date('order_date', { mode: 'date' }).notNull(),
  status: varchar('status', { length: 50 }).notNull(),
});

export const purchaseOrderItems = pgTable('purchase_order_items', {
  id: serial('id').primaryKey(),
  purchaseOrderId: integer('purchase_order_id')
    .notNull()
    .references(() => purchaseOrders.id, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }),
  productId: integer('product_id')
    .notNull()
    .references(() => products.id, { onDelete: 'restrict', onUpdate: 'cascade' }),
  quantity: numeric('quantity', { precision: 14, scale: 3 }).notNull(),
  price: numeric('price', { precision: 14, scale: 2 }).notNull(),
});

export const batches = pgTable('batches', {
  id: serial('id').primaryKey(),
  productId: integer('product_id')
    .notNull()
    .references(() => products.id, { onDelete: 'restrict', onUpdate: 'cascade' }),
  purchaseOrderId: integer('purchase_order_id').references(() => purchaseOrders.id, {
    onDelete: 'set null',
    onUpdate: 'cascade',
  }),
  receivedAt: date('received_at', { mode: 'date' }).notNull(),
  expiresAt: date('expires_at', { mode: 'date' }),
  quantity: numeric('quantity', { precision: 14, scale: 3 }).notNull(),
});

export const salesOrders = pgTable('sales_orders', {
  id: serial('id').primaryKey(),
  clientId: integer('client_id')
    .notNull()
    .references(() => clients.id, { onDelete: 'restrict', onUpdate: 'cascade' }),
  orderDate: date('order_date', { mode: 'date' }).notNull(),
  status: varchar('status', { length: 50 }).notNull(),
});

export const salesOrderItems = pgTable('sales_order_items', {
  id: serial('id').primaryKey(),
  salesOrderId: integer('sales_order_id')
    .notNull()
    .references(() => salesOrders.id, { onDelete: 'cascade', onUpdate: 'cascade' }),
  productId: integer('product_id')
    .notNull()
    .references(() => products.id, { onDelete: 'restrict', onUpdate: 'cascade' }),
  quantity: numeric('quantity', { precision: 14, scale: 3 }).notNull(),
  price: numeric('price', { precision: 14, scale: 2 }).notNull(),
});

export const stockMovements = pgTable('stock_movements', {
  id: serial('id').primaryKey(),
  warehouseId: integer('warehouse_id')
    .notNull()
    .references(() => warehouses.id, { onDelete: 'restrict', onUpdate: 'cascade' }),
  productId: integer('product_id')
    .notNull()
    .references(() => products.id, { onDelete: 'restrict', onUpdate: 'cascade' }),
  batchId: integer('batch_id')
    .notNull()
    .references(() => batches.id, { onDelete: 'restrict', onUpdate: 'cascade' }),
  quantityDelta: numeric('quantity_delta', { precision: 14, scale: 3 }).notNull(),
  createdAt: date('created_at', { mode: 'date' }).notNull(),
});

export const rolesRelations = relations(roles, ({ many }) => ({
  users: many(users),
}));

export const usersRelations = relations(users, ({ one }) => ({
  role: one(roles, {
    fields: [users.roleId],
    references: [roles.id],
  }),
}));

export const clientsRelations = relations(clients, ({ many }) => ({
  salesOrders: many(salesOrders),
}));

export const suppliersRelations = relations(suppliers, ({ many }) => ({
  purchaseOrders: many(purchaseOrders),
}));

export const unitsRelations = relations(units, ({ many }) => ({
  products: many(products),
}));

export const productCategoriesRelations = relations(productCategories, ({ one, many }) => ({
  parent: one(productCategories, {
    fields: [productCategories.parentId],
    references: [productCategories.id],
  }),
  children: many(productCategories),
  products: many(products),
}));

export const productsRelations = relations(products, ({ one, many }) => ({
  category: one(productCategories, {
    fields: [products.categoryId],
    references: [productCategories.id],
  }),
  unit: one(units, {
    fields: [products.unitId],
    references: [units.id],
  }),
  purchaseOrderItems: many(purchaseOrderItems),
  salesOrderItems: many(salesOrderItems),
  batches: many(batches),
  stockMovements: many(stockMovements),
}));

export const warehousesRelations = relations(warehouses, ({ many }) => ({
  stockMovements: many(stockMovements),
}));

export const purchaseOrdersRelations = relations(purchaseOrders, ({ one, many }) => ({
  supplier: one(suppliers, {
    fields: [purchaseOrders.supplierId],
    references: [suppliers.id],
  }),
  items: many(purchaseOrderItems),
  batches: many(batches),
}));

export const purchaseOrderItemsRelations = relations(purchaseOrderItems, ({ one }) => ({
  purchaseOrder: one(purchaseOrders, {
    fields: [purchaseOrderItems.purchaseOrderId],
    references: [purchaseOrders.id],
  }),
  product: one(products, {
    fields: [purchaseOrderItems.productId],
    references: [products.id],
  }),
}));

export const batchesRelations = relations(batches, ({ one, many }) => ({
  product: one(products, {
    fields: [batches.productId],
    references: [products.id],
  }),
  purchaseOrder: one(purchaseOrders, {
    fields: [batches.purchaseOrderId],
    references: [purchaseOrders.id],
  }),
  stockMovements: many(stockMovements),
}));

export const salesOrdersRelations = relations(salesOrders, ({ one, many }) => ({
  client: one(clients, {
    fields: [salesOrders.clientId],
    references: [clients.id],
  }),
  items: many(salesOrderItems),
}));

export const salesOrderItemsRelations = relations(salesOrderItems, ({ one }) => ({
  salesOrder: one(salesOrders, {
    fields: [salesOrderItems.salesOrderId],
    references: [salesOrders.id],
  }),
  product: one(products, {
    fields: [salesOrderItems.productId],
    references: [products.id],
  }),
}));

export const stockMovementsRelations = relations(stockMovements, ({ one }) => ({
  warehouse: one(warehouses, {
    fields: [stockMovements.warehouseId],
    references: [warehouses.id],
  }),
  product: one(products, {
    fields: [stockMovements.productId],
    references: [products.id],
  }),
  batch: one(batches, {
    fields: [stockMovements.batchId],
    references: [batches.id],
  }),
}));
