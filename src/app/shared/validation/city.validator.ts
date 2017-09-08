import { AbstractControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Flight } from '../../entities/flight';

export class CityValidator {

  static validate(c: AbstractControl): any {

    if (c.value === 'Graz' || c.value === 'Hamburg') {
      return {};
    }

    return {
      city: {
        reason: 42,
        tryAgain: 2018
      }
    };
}

  static validateWithParams(allowedCities: string[]) {

    return (c: AbstractControl): any => {

      if (allowedCities.indexOf(c.value) > -1) {
        return {};
      }
      return {
        city2: {
          allowed: allowedCities,
          actual: c.value
        }
      }
    }

  }

  static validateForm(c: AbstractControl): any {
    let group = c as FormGroup;

    let from = group.controls['from'];
    let to = group.controls['to'];

    if (from.value == to.value) {
      return {
        roundTrip: true
      }
    }
    return {};
  }


  static validateAsync(http: HttpClient) {
    return (c: AbstractControl): Observable<any> => {

      let value = c.value;
      let params = new HttpParams().set('from', value);

      return http
              .get<Flight[]>('http://www.angular.at/api/flight', { params })
              .delay(5000)
              .map(flights => flights.length > 0)
              .map(ok => ok ? {} : {cityAsync: { reason: 48, actual: c.value}});
              //.catch(err => Observable.of({cityAsync: {httpError: true}}));
    }
  }
}
