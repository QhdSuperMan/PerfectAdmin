
import { Module, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BbbModule } from './bbb/bbb.module';
import { PersonModule } from './person/person.module';
import { LogMiddleware } from './log.middleware';
import { APP_GUARD } from '@nestjs/core'


@Module({
  imports: [BbbModule, PersonModule],
  controllers: [AppController],
  providers: [AppService,
    //   {
    //   provide: APP_GUARD,
    //   useClass: LoginGuard
    // }
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LogMiddleware).forRoutes('*');
  }
}
