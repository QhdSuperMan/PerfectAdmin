import { Module, OnApplicationShutdown } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { BbbService } from './bbb.service';
import { BbbController } from './bbb.controller';
import { PersonModule } from '../person/person.module'

@Module({
  imports: [PersonModule],
  controllers: [BbbController],
  providers: [BbbService,
    {
      provide: 'aaaa',
      useValue: {
        name: 1,
      }
    },
    {
      provide: 'bbbb',

      async useFactory(person: { name: string }, appService: BbbService) {
        console.log('加载');
        await new Promise((resolve) => {
          setTimeout(() => {
            resolve(111)
          })
        })

        return {
          name: '异步server'
        }
      },
      inject: ['aaaa', BbbService]
    }
  ],
})
export class BbbModule implements OnApplicationShutdown {
  // private moduleRef: ModuleRef
  constructor (private moduleRef: ModuleRef) {}

  onApplicationShutdown() {
    console.log('this.moduleRef: ', this.moduleRef);

    console.log('CccModule onApplicationShutdown');
  }
}
