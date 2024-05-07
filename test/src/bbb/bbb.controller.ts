import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, ValidationPipe, HttpException, HttpStatus, UseInterceptors, UploadedFile, UploadedFiles } from '@nestjs/common';
import fs from 'fs'
import { BbbService } from './bbb.service';
import { PersonService } from '../person/person.service'
import { CreateBbbDto } from './dto/create-bbb.dto';
import { UpdateBbbDto } from './dto/update-bbb.dto';
import { MyValidationPipe } from './MyValidationPipe'
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express'
import { storage } from './storage'
import { FileSizeValidationPipe } from './file-size-validation-pipe'

@Controller('bbb')
export class BbbController {


  @Post('/aaa')
  @UseInterceptors(FileInterceptor('aaa', {
    dest: 'uploads',
    storage
  }))
  uploadFile(@UploadedFile(FileSizeValidationPipe) file: Express.Multer.File, @Body() body) {
    console.log('body', body);
    console.log('file', file);
  }

  @Post('upload')
  @UseInterceptors(FilesInterceptor('files', 20, {
    dest: 'uploads'
  }))
  uploadFiles(@UploadedFiles() files: Array<Express.Multer.File>, @Body() body: { name: string }) {
    console.log('body', body);
    console.log('files', files);

    const fileName = body.name.match(/(.+)\-\d+$/)[1];
    const chunkDir = 'uploads/chunks_' + fileName;

    if (!fs.existsSync(chunkDir)) {
      fs.mkdirSync(chunkDir);
    }
    fs.cpSync(files[0].path, chunkDir + '/' + body.name);
    fs.rmSync(files[0].path);
  }



  @Inject('bbbb')
  private bbbb

  constructor(private readonly bbbService: BbbService, private readonly personService: PersonService) { }

  @Post('/post')
  create(@Body(new ValidationPipe()) createBbbDto: CreateBbbDto) {
    console.log('createBbbDto: ', createBbbDto);
    return 'hello world!'
  }

  @Get('/error')
  aaa() {
    throw new HttpException('xxx', HttpStatus.NOT_FOUND)
  }

  @Get('/all')
  findAll() {
    return this.bbbService.findAll();
  }



  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bbbService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBbbDto: UpdateBbbDto) {
    return this.bbbService.update(+id, updateBbbDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bbbService.remove(+id);
  }


  // onModuleInit() {
  //   console.log('onModuleInit: ');
  // }
  // onApplicationBootstrap () {
  //   console.log('onApplicationBootstrap : ');
  // }

  // onModuleDestroy () {
  //   console.log('onModuleDestroy : ');
  // }
  // beforeApplicationShutdown  (signal ) {
  //   console.log('signal: ', signal);
  //   console.log('beforeApplicationShutdown  : ');
  // }
  // onApplicationShutdown  () {
  //   const cccService = this.moduleRef.get<BbbService>(BbbService);
  //   console.log('--------------------------', cccService.findAll());

  //   console.log('CccModule onApplicationShutdown');
  // } 

}
