import { Type } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { createNatsMicroserviceOptions } from '../common/nats/nats.config';

export async function bootstrapNatsMicroservice(moduleClass: Type<unknown>) {
  const app = await NestFactory.createMicroservice(moduleClass, createNatsMicroserviceOptions());
  await app.listen();
}
