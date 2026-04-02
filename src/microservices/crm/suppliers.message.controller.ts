import { Controller, Inject } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { toRpcException } from '../../common/microservices/rpc-exception.util';
import { crmPatterns } from '../../common/nats/nats-topics';
import { SupplierCreateDto } from '../../suppliers/dto/create-supplier.dto';
import { SuppliersRepository } from './suppliers.repository';

@Controller()
export class SuppliersMessageController {
  constructor(
    @Inject(SuppliersRepository)
    private readonly suppliersRepository: SuppliersRepository,
  ) {}

  @MessagePattern(crmPatterns.findSuppliers)
  async findAll() {
    try {
      return await this.suppliersRepository.findAll();
    } catch (error) {
      throw toRpcException(error);
    }
  }

  @MessagePattern(crmPatterns.createSupplier)
  async create(@Payload() payload: SupplierCreateDto) {
    try {
      return await this.suppliersRepository.create(payload);
    } catch (error) {
      throw toRpcException(error);
    }
  }
}
