import { ArgumentsHost, BadRequestException, Catch, ExceptionFilter } from '@nestjs/common';
import { Response } from 'express';
import { errClass } from './errClass'

@Catch(errClass)
export class TestFilter implements ExceptionFilter {
  catch(exception: errClass, host: ArgumentsHost) {
    
  }
}
