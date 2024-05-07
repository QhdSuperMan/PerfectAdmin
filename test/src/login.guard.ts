

import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
@Injectable()
export class LoginGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {

    const requiredRoles = this.reflector.get('roles', context.getHandler());
    const aaaa = this.reflector.get('aaa', context.getHandler());
    const name = this.reflector.get('名字', context.getHandler());

    return true
  }
}

