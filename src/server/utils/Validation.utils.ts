import { validate } from 'class-validator';

export const validateApiPayload = async <TPayload extends object>(payload: TPayload) => {
  const validationErrors = await validate(payload);
  if (validationErrors.length) {
    throw validationErrors;
  }
};
