import 'reflect-metadata';
import 'dotenv/config';
import { bootstrapNatsMicroservice } from './bootstrap';
import { OrdersMicroserviceModule } from './orders/orders.module';

void bootstrapNatsMicroservice(OrdersMicroserviceModule);
