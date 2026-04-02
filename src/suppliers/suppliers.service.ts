import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { NatsRequestService } from '../common/nats/nats-request';
import { crmPatterns } from '../common/nats/nats-topics';
import { CRM_SERVICE } from '../common/nats/nats-tokens';
import { SupplierCreateDto } from './dto/create-supplier.dto';

@Injectable()
export class SuppliersService {
  constructor(
    @Inject(CRM_SERVICE)
    private readonly crmClient: ClientProxy,
    @Inject(NatsRequestService)
    private readonly natsRequestService: NatsRequestService,
  ) {}

  findAll() {
    return this.natsRequestService.send(this.crmClient, crmPatterns.findSuppliers, {});
  }

  create(dto: SupplierCreateDto) {
    return this.natsRequestService.send(this.crmClient, crmPatterns.createSupplier, dto);
  }
}
