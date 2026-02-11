import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { BatchesModule } from './batches/batches.module';
import { ClientsModule } from './clients/clients.module';
import { DatabaseModule } from './database/database.module';
import { ProductsModule } from './products/products.module';
import { PurchasesModule } from './purchases/purchases.module';
import { SalesModule } from './sales/sales.module';
import { StockModule } from './stock/stock.module';
import { SuppliersModule } from './suppliers/suppliers.module';
import { UsersModule } from './users/users.module';
import { WarehousesModule } from './warehouses/warehouses.module';

@Module({
  imports: [
    DatabaseModule,
    AuthModule,
    UsersModule,
    ClientsModule,
    SuppliersModule,
    ProductsModule,
    BatchesModule,
    WarehousesModule,
    SalesModule,
    PurchasesModule,
    StockModule,
  ],
})
export class AppModule {}
