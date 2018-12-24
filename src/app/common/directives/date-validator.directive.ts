import { Directive, Input } from '@angular/core';
import { ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { Subscription } from 'node_modules/rxjs';

export function dateValidator(min: Date, max: Date): ValidatorFn {
  return (c: AbstractControl): ValidationErrors | null => {
    if (c.value === null || c.value.length === 0) {
      return null; // Don't validate empty value
    }
    const dateToCompare = new Date(c.value);
    return dateToCompare && min <= dateToCompare && dateToCompare <= max ? null: { 'compare': true };
  }
}

@Directive({
  selector: '[date-validator]'
})
export class DateValidatorDirective {

  @Input('date-validator') controlNameToCompare: string;

  constructor() { }

}
