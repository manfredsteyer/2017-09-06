import { AbstractControl } from '@angular/forms';

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

}
