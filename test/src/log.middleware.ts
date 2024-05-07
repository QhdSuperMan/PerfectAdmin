import { Inject, Injectable, NestMiddleware } from '@nestjs/common';
import { AppService } from './app.service'

@Injectable()
export class LogMiddleware implements NestMiddleware {

  @Inject(AppService)
  private readonly appService: AppService


  use(req: any, res: any, next: () => void) {
    // console.log('before')
    // console.log('appService: ', this.appService);
    next();
    // console.log('next')
  }
}
