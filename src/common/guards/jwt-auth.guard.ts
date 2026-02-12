import { ExecutionContext, Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { IS_PUBLIC_KEY } from "../decorators/public.decorator";

@Injectable()
export class JwtAuthGuard extends AuthGuard("jwt") {
  canActivate(context: ExecutionContext) {
    const isPublicHandler = Reflect.getMetadata(
      IS_PUBLIC_KEY,
      context.getHandler()
    );
    const isPublicClass = Reflect.getMetadata(
      IS_PUBLIC_KEY,
      context.getClass()
    );

    if (isPublicHandler || isPublicClass) {
      return true;
    }

    return super.canActivate(context);
  }
}
