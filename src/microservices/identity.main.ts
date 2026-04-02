import 'reflect-metadata';
import 'dotenv/config';
import { bootstrapNatsMicroservice } from './bootstrap';
import { IdentityMicroserviceModule } from './identity/identity.module';

void bootstrapNatsMicroservice(IdentityMicroserviceModule);
