import 'reflect-metadata';
import 'dotenv/config';
import { bootstrapNatsMicroservice } from './bootstrap';
import { InventoryMicroserviceModule } from './inventory/inventory.module';

void bootstrapNatsMicroservice(InventoryMicroserviceModule);
