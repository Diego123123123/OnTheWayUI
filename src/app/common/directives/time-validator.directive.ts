import { Directive, Input } from '@angular/core';
import { ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { Subscription } from 'node_modules/rxjs';

export function timeValidator(startTime: any, endTime: any): ValidatorFn {
  return (c: AbstractControl): ValidationErrors | null => {
    if (c.value === null || c.value.length === 0) {
      return null; // Don't validate empty value
    }
    if (startTime > endTime) {
      console.log(startTime);
      return null;
    }
    if (endTime < startTime) {
      console.log(endTime);
      return null;
    }
    console.log(startTime, endTime);
    return { 'compare': true };
  }
}

@Directive({
  selector: '[time-validator]'
})
export class DateValidatorDirective {

  @Input('time-validator') controlNameToCompare: string;

  constructor() { }

}
