import 'reflect-metadata';
import 'dotenv/config';
import { bootstrapNatsMicroservice } from './bootstrap';
import { CatalogMicroserviceModule } from './catalog/catalog.module';

void bootstrapNatsMicroservice(CatalogMicroserviceModule);
