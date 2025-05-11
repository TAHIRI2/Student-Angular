import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'weirdCase',
  standalone: true
})
export class WeirdCasePipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return '';
    
    return value
      .split('')
      .map((char, index) => index % 2 === 0 ? char.toUpperCase() : char.toLowerCase())
      .join('');
  }
}
