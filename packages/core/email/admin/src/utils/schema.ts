import { translatedErrors } from '@strapi/admin/strapi-admin';
import * as yup from 'yup';

export const schema = yup.object().shape({
  email: yup.string().email(translatedErrors.email.id).required(translatedErrors.required.id),
});

// Validates the test-recipient address on its own, so the check cannot fail
// just because the surrounding object uses a different key than the schema.
export const testAddressSchema = yup
  .string()
  .trim()
  .email(translatedErrors.email.id)
  .required(translatedErrors.required.id);
