import * as yup from 'yup';

// Define the validation schema
export const PatientSchema = yup.object({
  id: yup.string().required(),
  name: yup.string().required('Name is required'),
  avatar: yup.string().url('Must be a valid URL'),
  description: yup.string(),
  website: yup.string().url('Must be a valid URL').optional(),
  createdAt: yup.string().required(),
});

// More permissive URL regex that handles modern URLs with complex query parameters
const urlRegex =
  /^(https?:\/\/)([a-zA-Z0-9]([a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9]([a-zA-Z0-9-]*[a-zA-Z0-9])?(\/[-a-zA-Z0-9()@:%_+.~#?&=/]*)?$/;

export const patientSchema = yup.object({
  name: yup
    .string()
    .required('Name is required')
    .matches(
      /^[a-zA-Z0-9\s]+$/,
      'Name should only contain letters, numbers, and spaces',
    )
    .max(100, 'Name is too long (maximum 100 characters)'),

  website: yup
    .string()
    .transform((value) => (value === '' ? null : value))
    .nullable()
    .test(
      'valid-url',
      'Please enter a valid URL (e.g., https://example.com)',
      (value) => {
        // Skip validation if value is null or empty
        if (!value) return true;
        return urlRegex.test(value);
      },
    )
    .default(''),

  avatar: yup
    .string()
    .transform((value) => (value === '' ? null : value))
    .nullable()
    .test(
      'valid-url',
      'Please enter a valid URL (e.g., https://example.com/avatar.jpg)',
      (value) => {
        // Skip validation if value is null or empty
        if (!value) return true;
        return urlRegex.test(value);
      },
    )
    .default(''),

  description: yup.string().nullable().default(''),
});

export type PatientFormSchema = yup.InferType<typeof patientSchema>;
