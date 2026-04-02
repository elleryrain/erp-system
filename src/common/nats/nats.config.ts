import { ClientProviderOptions, Transport } from '@nestjs/microservices';

export const NATS_SERVERS = (process.env.NATS_SERVERS ?? 'nats://127.0.0.1:4222')
  .split(',')
  .map((server) => server.trim())
  .filter(Boolean);

export function createNatsClientOptions(name: string): ClientProviderOptions {
  return {
    name,
    transport: Transport.NATS,
    options: {
      servers: NATS_SERVERS,
    },
  };
}

export function createNatsMicroserviceOptions() {
  return {
    transport: Transport.NATS,
    options: {
      servers: NATS_SERVERS,
    },
  } as const;
}
