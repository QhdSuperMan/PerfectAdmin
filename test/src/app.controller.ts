import { Controller, Get, UseGuards, UseInterceptors, Query, UseFilters, ParseIntPipe,ParseArrayPipe, HttpStatus } from '@nestjs/common';
import { AppService } from './app.service';
import { TimeInterceptor } from './time.interceptor'
import { ValidatePipe } from './validate.pipe'
import { TestFilter } from './test.filter'
import { errClass } from './errClass'
import { LoginGuard } from './login.guard';
import { Roles } from './roles.decorator'
import { paramsDecorator } from './aaa.decorator'
import { SetMetadata } from '@nestjs/common';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get('/hello')
  @UseInterceptors(TimeInterceptor)
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/validate')
  aaaa(@Query('a', new ParseArrayPipe({
    errorHttpStatusCode: HttpStatus.NOT_FOUND
  })) a) {
    console.log('a: ', a);
    return 'hello world'
  }

  @Get('/query')
  @Roles(['1'])
  @Reflect.metadata("名字", "光光")
  @UseFilters(TestFilter)
  @UseGuards(LoginGuard)
  @SetMetadata('aaa', '111')
  getAll(@paramsDecorator('a') a) {

    return 1111
    // throw new errClass('a', 'b')
  }
}
