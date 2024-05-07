import { SetMetadata } from '@nestjs/common';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const Aaa = (...args: string[]) => SetMetadata('aaa', args);

export const paramsDecorator = createParamDecorator(
  (key: string, ctx: ExecutionContext) => {
    const request: Request = ctx.switchToHttp().getRequest();
    console.log('request: ', request);
    return (request as any).query[key];
  },
);

