import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom, timeout } from 'rxjs';

@Injectable()
export class NatsRequestService {
  async send<TResult, TPayload>(
    client: ClientProxy,
    pattern: string,
    payload: TPayload,
  ): Promise<TResult> {
    try {
      return await firstValueFrom(
        client.send<TResult, TPayload>(pattern, payload).pipe(timeout(10000)),
      );
    } catch (error) {
      const statusCode =
        typeof error === 'object' &&
        error !== null &&
        'statusCode' in error &&
        typeof error.statusCode === 'number'
          ? error.statusCode
          : HttpStatus.INTERNAL_SERVER_ERROR;

      const message =
        typeof error === 'object' &&
        error !== null &&
        'message' in error &&
        typeof error.message === 'string'
          ? error.message
          : 'NATS request failed';

      throw new HttpException(message, statusCode);
    }
  }
}
