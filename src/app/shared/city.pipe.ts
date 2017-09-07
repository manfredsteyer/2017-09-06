import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'city',
  pure: true
})
export class CityPipe implements PipeTransform {

  transform(value: string, fmt: string = 'short'): string {

    let long, short;

    switch(value) {
      case 'Graz':
        long = 'Graz Thalerhof';
        short = 'GRZ';
        break;
      case 'Hamburg':
        long = 'Airport Hamburg Fulsbüttel Helmut Schmidt';
        short = 'HAM';
        break;
      default:
        long = short = 'ROM';
    }

    if (fmt == 'short') return short;
    return long;

  }

}
