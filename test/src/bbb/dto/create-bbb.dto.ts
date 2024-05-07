import { IsInt }  from 'class-validator'
export class CreateBbbDto {
  @IsInt({
    message: '报错了哦'
  })
  id: number;
  dom: string;
}
export class CreatePersonDto {
  name: string;
  age: number;
}
