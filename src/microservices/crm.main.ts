import 'reflect-metadata';
import 'dotenv/config';
import { bootstrapNatsMicroservice } from './bootstrap';
import { CrmMicroserviceModule } from './crm/crm.module';

void bootstrapNatsMicroservice(CrmMicroserviceModule);
