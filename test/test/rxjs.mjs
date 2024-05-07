import { of, filter, map } from 'rxjs';


var num = of(1, 2, 3)
console.log('num: ', num);

num.pipe(map((x) => {
  console.log('x: ', x);
  return x * x
})).subscribe((v) => console.log(`value: ${v}`));
// .pipe(filter((x) => x % 2 !== 0))
// 
