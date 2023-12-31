import { ValidationError } from 'class-validator';

export class ApiQueryValidationException extends Error {
  constructor(errors?: ValidationError[]) {
    const message =
      errors && errors?.length
        ? errors?.map((error) => error.toString()).join('; ')
        : 'Invalid body';
    super(message);
    this.name = 'ApiQueryValidationException';
  }
}
