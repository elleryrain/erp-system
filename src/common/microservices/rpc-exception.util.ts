import { HttpException, HttpStatus } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

export function toRpcException(error: unknown): RpcException {
  if (error instanceof HttpException) {
    return new RpcException({
      statusCode: error.getStatus(),
      message: error.message,
      error: error.name,
    });
  }

  if (error instanceof Error) {
    return new RpcException({
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      message: error.message,
      error: error.name,
    });
  }

  return new RpcException({
    statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
    message: 'Unknown microservice error',
    error: 'UnknownError',
  });
}
